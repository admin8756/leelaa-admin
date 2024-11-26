<template>
  <div class="overflow-x-auto">
    <table class="table w-full" :class="tableClass">
      <!-- 表头 -->
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.key"
            :class="column.thClass"
            :style="{ width: column.width }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <!-- 表格内容 -->
      <tbody>
        <template v-if="displayData.length">
          <tr 
            v-for="(row, index) in displayData" 
            :key="row[rowKey] || index"
            :class="[
              rowClass,
              { 'hover:bg-base-200 cursor-pointer': clickable }
            ]"
            @click="handleRowClick(row)"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              :class="[
                column.tdClass,
                { 'truncate': column.ellipsis }
              ]"
              :title="column.ellipsis ? row[column.key] : ''"
            >
              <!-- 自定义渲染 -->
              <slot 
                v-if="column.slot" 
                :name="column.slot" 
                :row="row" 
                :index="index"
              ></slot>
              <!-- 默认渲染 -->
              <template v-else>
                {{ row[column.key] }}
              </template>
            </td>
          </tr>
        </template>

        <!-- 空状态 -->
        <tr v-else>
          <td :colspan="columns.length" class="text-center py-8">
            <slot name="empty">
              <div class="flex flex-col items-center text-base-content/50">
                <Icon icon="mdi-database-off" size="32" />
                <span class="mt-2">暂无数据</span>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 分页器 -->
  <div 
    v-if="showPagination && data.length" 
    class="flex justify-between items-center p-4 border-t"
  >
    <div class="text-sm text-base-content/70">
      共 {{ total }} 条数据
    </div>
    <div class="join">
      <button 
        class="join-item btn btn-sm" 
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >«</button>
      <button 
        v-for="page in displayPages" 
        :key="page"
        class="join-item btn btn-sm"
        :class="{ 'btn-active': page === currentPage }"
        @click="handlePageChange(page)"
      >{{ page }}</button>
      <button 
        class="join-item btn btn-sm"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >»</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => [],
    validator: (columns) => {
      return columns.every(col => {
        return typeof col.key === 'string' && 
               typeof col.title === 'string' &&
               (!col.width || typeof col.width === 'string') &&
               (!col.slot || typeof col.slot === 'string') &&
               (!col.ellipsis || typeof col.ellipsis === 'boolean') &&
               (!col.thClass || typeof col.thClass === 'string') &&
               (!col.tdClass || typeof col.tdClass === 'string')
      })
    }
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  tableClass: {
    type: String,
    default: ''
  },
  rowClass: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  bordered: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['row-click', 'page-change'])

// 计算属性
const tableClass = computed(() => ({
  'table-bordered': props.bordered,
  'table-hover': props.hoverable
}))

const displayData = computed(() => {
  if (!props.showPagination) return props.data
  const start = (props.currentPage - 1) * props.pageSize
  return props.data.slice(start, start + props.pageSize)
})

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const displayPages = computed(() => {
  const pages = []
  const maxPages = 5 // 最多显示5个页码
  const halfMaxPages = Math.floor(maxPages / 2)
  
  let startPage = Math.max(1, props.currentPage - halfMaxPages)
  let endPage = Math.min(totalPages.value, startPage + maxPages - 1)
  
  if (endPage - startPage + 1 < maxPages) {
    startPage = Math.max(1, endPage - maxPages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// 行点击事件
const handleRowClick = (row) => {
  if (props.clickable) {
    emit('row-click', row)
  }
}

// 分页方法
const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.table :where(th, td) {
  @apply whitespace-nowrap py-3 px-4;
}
</style>
