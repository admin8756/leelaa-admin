<template>
  <div class="p-4">
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">妖兽上报列表</h2>
      <button class="btn btn-primary" @click="handleCreate">新建上报</button>
    </div>

    <!-- 搜索区域 -->
    <div class="bg-base-200 rounded-box p-4 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <leelaa-input
          v-model="searchForm.name"
          label="妖兽名称"
          placeholder="请输入妖兽名称"
        />
        <div class="form-control">
          <label class="label">
            <span class="label-text">上报时间</span>
          </label>
          <div class="flex gap-2">
            <leelaa-datepicker
              v-model="searchForm.startDate"
              class="w-full"
              placeholder="开始日期"
            />
            <span class="self-center">至</span>
            <leelaa-datepicker
              v-model="searchForm.endDate"
              class="w-full"
              placeholder="结束日期"
            />
          </div>
        </div>
        <leelaa-select
          v-model="searchForm.status"
          label="状态"
          :options="statusOptions"
        />
      </div>
      <div class="flex justify-end mt-4 gap-2">
        <button class="btn" @click="resetSearch">重置</button>
        <button class="btn btn-primary" @click="handleSearch">搜索</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="overflow-x-auto bg-base-100 rounded-box">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>编号</th>
            <th>妖兽名称</th>
            <th>位置</th>
            <th>危险等级</th>
            <th>上报时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.location }}</td>
            <td>
              <div class="badge" :class="getDangerLevelClass(item.dangerLevel)">
                {{ item.dangerLevelText }}
              </div>
            </td>
            <td>{{ item.createTime }}</td>
            <td>
              <div class="badge" :class="getStatusBadgeClass(item.status)">
                {{ item.statusText }}
              </div>
            </td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-info" @click="handleView(item)">查看</button>
                <button class="btn btn-sm btn-warning" @click="handleEdit(item)">编辑</button>
                <button class="btn btn-sm btn-error" @click="handleDelete(item)">删除</button>
                <button class="btn btn-sm" @click="handlePrint(item)">打印</button>
              </div>
            </td>
          </tr>
          <tr v-if="tableData.length === 0">
            <td colspan="7" class="text-center py-4">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-base-content/70">
        共 {{ total }} 条数据
      </div>
      <div class="join">
        <button 
          class="join-item btn"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        <button class="join-item btn btn-active">{{ currentPage }}</button>
        <button 
          class="join-item btn"
          :disabled="currentPage >= totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <LeelaaConfirm
      v-model="showDeleteConfirm"
      :message="`确定要删除「${deleteItem?.name}」这条记录吗？`"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LeelaaInput from '@/components/form/basic/leelaa-input.vue'
import LeelaaSelect from '@/components/form/basic/leelaa-select.vue'
import LeelaaDatepicker from '@/components/form/advance/leelaa-datepicker.vue'
import LeelaaConfirm from '@/components/common/leelaa-confirm.vue'
import { getReportList, getStatusOptions } from '@/mock/report'

const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref([])
const statusOptions = ref([])

// 搜索表单
const searchForm = reactive({
  name: '',
  startDate: '',
  endDate: '',
  status: ''
})

// 获取状态选项
const fetchStatusOptions = async () => {
  const res = await getStatusOptions()
  if (res.code === 200) {
    statusOptions.value = [{ value: '', label: '全部' }, ...res.data]
  }
}

// 获取列表数据
const fetchData = async () => {
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm
  }
  const res = await getReportList(params)
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.pagination.total
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
  searchForm.status = ''
  currentPage.value = 1
  handleSearch()
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}

// 新建
const handleCreate = () => {
  router.push({ name: 'reportCreate' })
}

// 查看
const handleView = (item) => {
  router.push({ name: 'reportEdit', params: { id: item.id }, query: { mode: 'view' } })
}

// 编辑
const handleEdit = (item) => {
  router.push({ name: 'reportEdit', params: { id: item.id } })
}

// 删除确认
const showDeleteConfirm = ref(false)
const deleteItem = ref(null)

const handleDelete = (item) => {
  deleteItem.value = item
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    // TODO: 调用API删除数据
    await new Promise(resolve => setTimeout(resolve, 1000))
    fetchData()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 打印
const handlePrint = (item) => {
  // TODO: 实现打印功能
  console.log('打印', item)
}

// 页码变化
const handlePageChange = (page) => {
  currentPage.value = page
  fetchData()
}

// 获取状态徽章样式
const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    processing: 'badge-info',
    completed: 'badge-success'
  }
  return classes[status] || 'badge-ghost'
}

// 获取危险等级样式
const getDangerLevelClass = (level) => {
  const classes = {
    low: 'badge-info',
    medium: 'badge-warning',
    high: 'badge-error',
    extreme: 'badge-error'
  }
  return classes[level] || 'badge-ghost'
}

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

onMounted(() => {
  fetchStatusOptions()
  fetchData()
})
</script>
