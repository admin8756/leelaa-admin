<template>
  <l-card
    title="预警信息"
    icon="mdi-bell-alert"
    icon-color="warning"
    no-padding
  >
    <template #header-badge>
      <div class="badge badge-warning">{{ warnings.length }}</div>
    </template>

    <template #header-actions>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm" @click="refresh">
          <Icon icon="mdi-refresh" />
        </button>
        <button class="btn btn-ghost btn-sm" @click="showAll">
          <Icon icon="mdi-arrow-right" />
        </button>
      </div>
    </template>

    <l-table
      :columns="columns"
      :data="warnings"
      :show-pagination="true"
      :current-page="currentPage"
      :total="warnings.length"
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
          <button class="btn btn-ghost btn-xs" @click.stop="handleWarning(row)">
            <Icon icon="mdi-hand" size="small"/>
          </button>
          <button class="btn btn-ghost btn-xs" @click.stop="viewDetail(row)">
            <Icon icon="mdi-eye" size="small"/>
          </button>
          <button class="btn btn-ghost btn-xs" @click.stop="assignWarning(row)">
            <Icon icon="mdi-account-plus" size="small"/>
          </button>
        </div>
      </template>
    </l-table>
  </l-card>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import LCard from '@/components/base/LCard/index.vue'
import LTable from '@/components/base/LTable/index.vue'

const props = defineProps({
  warnings: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits({
  'refresh': null,
  'showAll': null,
  'handle': null,
  'view': null,
  'assign': null
})

// 表格列配置
const columns = [
  { key: 'priority', title: '等级', width: '80px', slot: 'priority' },
  { key: 'location', title: '地点', width: '120px', ellipsis: true },
  { key: 'message', title: '内容', ellipsis: true },
  { key: 'handler', title: '处理人', width: '120px', ellipsis: true },
  { key: 'status', title: '状态', width: '100px', slot: 'status' },
  { key: 'actions', title: '操作', width: '120px', slot: 'actions' }
]

// 分页相关
const currentPage = ref(1)
const handlePageChange = (page) => {
  currentPage.value = page
}

// 操作方法
const refresh = () => emit('refresh')
const showAll = () => emit('showAll')
const handleWarning = (warning) => emit('handle', warning)
const viewDetail = (warning) => emit('view', warning)
const assignWarning = (warning) => emit('assign', warning)
</script>
