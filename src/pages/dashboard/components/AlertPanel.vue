<template>
  <CustomCard
    title="预警信息"
    icon="mdi-bell-alert"
    icon-color="warning"
    no-padding
  >
    <template #header-badge>
      <div class="badge badge-warning">{{ alerts.length }}</div>
    </template>

    <l-table
      :columns="columns"
      :data="alerts"
      :show-pagination="true"
      v-model:current-page="currentPage"
      :total="alerts.length"
      :page-size="pageSize"
      table-class="table-fixed"
      @page-change="handlePageChange"
    >
      <!-- 优先级列 -->
      <template #priority="{ row }">
        <div :class="[
          'badge',
          row.type === 'danger' ? 'badge-error' :
          row.type === 'warning' ? 'badge-warning' : 'badge-info'
        ]">
          {{ row.priority }}
        </div>
      </template>

      <!-- 状态列 -->
      <template #status="{ row }">
        <div :class="[
          'badge badge-ghost',
          row.status === '未处理' ? 'text-error' :
          row.status === '处理中' ? 'text-warning' : 'text-success'
        ]">
          {{ row.status }}
        </div>
      </template>

      <!-- 操作列 -->
      <template #actions="{ row }">
        <div class="flex gap-1">
          <button class="btn btn-ghost btn-xs" @click.stop="handleAlert(row)">
            <Icon icon="mdi-hand" size="small"/>
          </button>
          <button class="btn btn-ghost btn-xs" @click.stop="viewDetail(row)">
            <Icon icon="mdi-eye" size="small"/>
          </button>
          <button class="btn btn-ghost btn-xs" @click.stop="assignAlert(row)">
            <Icon icon="mdi-account-plus" size="small"/>
          </button>
        </div>
      </template>
    </l-table>

    <template #header-actions>
      <div class="flex gap-2">
        <button 
          class="btn btn-ghost btn-sm" 
          :class="{ 'animate-spin': isRefreshing }"
          @click="refresh"
        >
          <Icon icon="mdi-refresh" />
        </button>
        <button class="btn btn-ghost btn-sm" @click="showAll">
          <Icon icon="mdi-arrow-right" />
        </button>
      </div>
    </template>
  </CustomCard>
</template>

<script setup>
import { ref } from 'vue'
import CustomCard from '@/components/base/LCard/CustomCard.vue'
import LTable from '@/components/base/LTable/BaseTable.vue'
import { Icon } from '@iconify/vue'
import { generateNewAlerts } from '@/mock/cultivation'

const props = defineProps({
  alerts: {
    type: Array,
    required: true,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['update:alerts'])

const currentPage = ref(1)
const pageSize = 5
const isRefreshing = ref(false)

// 表格列配置
const columns = [
  { key: 'priority', title: '等级', width: '80px', slot: 'priority' },
  { key: 'location', title: '地点', width: '120px', ellipsis: true },
  { key: 'message', title: '内容', ellipsis: true },
  { key: 'handler', title: '处理人', width: '120px', ellipsis: true },
  { key: 'status', title: '状态', width: '100px', slot: 'status' },
  { key: 'actions', title: '操作', width: '120px', slot: 'actions' }
]

// 页码变更
const handlePageChange = (page) => {
  currentPage.value = page
}

// 操作方法
const refresh = async () => {
  isRefreshing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络延迟
    
    // 生成新的预警列表
    const newAlerts = generateNewAlerts(props.alerts.length)
    
    // 更新数据
    emit('update:alerts', newAlerts)
    
    // 重置到第一页
    currentPage.value = 1
  } finally {
    isRefreshing.value = false
  }
}

const showAll = () => {
  // TODO: 实现查看全部逻辑
  console.log('查看全部预警')
}

const handleAlert = (alert) => {
  // TODO: 实现处理警告逻辑
  console.log('处理预警:', alert)
}

const viewDetail = (alert) => {
  // TODO: 实现查看详情逻辑
  console.log('查看预警详情:', alert)
}

const assignAlert = (alert) => {
  // TODO: 实现分配警告逻辑
  console.log('分配预警:', alert)
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
