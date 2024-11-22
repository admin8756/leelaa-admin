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
        <template v-if="data.length">
          <tr 
            v-for="(row, index) in data" 
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
                <v-icon icon="mdi-database-off" size="32" />
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

<script setup lang="ts">
import { computed } from 'vue'

interface Column {
  key: string
  title: string
  width?: string
  slot?: string
  ellipsis?: boolean
  thClass?: string
  tdClass?: string
}

interface Props {
  columns: Column[]
  data: any[]
  rowKey?: string
  tableClass?: string
  rowClass?: string
  clickable?: boolean
  showPagination?: boolean
  currentPage?: number
  pageSize?: number
  total?: number
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  tableClass: '',
  rowClass: '',
  clickable: false,
  showPagination: false,
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const emit = defineEmits<{
  (e: 'row-click', row: any): void
  (e: 'page-change', page: number): void
}>()

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 计算显示的页码
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
const handleRowClick = (row: any) => {
  if (props.clickable) {
    emit('row-click', row)
  }
}

// 页码改变事件
const handlePageChange = (page: number) => {
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
