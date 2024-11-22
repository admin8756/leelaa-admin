<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">快捷操作</h2>
      <div class="grid grid-cols-2 gap-4">
        <button class="btn btn-primary" @click="$emit('action', 'distribute-resources')">
          分配资源
        </button>
        <button class="btn btn-secondary" @click="$emit('action', 'assign-tasks')">
          分派任务
        </button>
        <button class="btn btn-accent" @click="$emit('action', 'manage-disciples')">
          管理弟子
        </button>
        <button class="btn btn-info" @click="$emit('action', 'view-reports')">
          查看报告
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['action'])
</script>
