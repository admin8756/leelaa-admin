<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-center gap-2 mb-4">
        <v-icon icon="mdi-lightning-bolt" class="text-warning text-xl" />
        <h2 class="card-title m-0">快捷操作</h2>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <button 
          v-for="action in actions" 
          :key="action.id"
          class="btn gap-2 h-auto py-4"
          :class="action.btnClass"
          @click="$emit('action', action.id)"
        >
          <v-icon :icon="action.icon" />
          <div class="flex flex-col items-start">
            <span class="text-sm">{{ action.title }}</span>
            <span class="text-xs opacity-75">{{ action.desc }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const actions = [
  {
    id: 'distribute-resources',
    title: '分配资源',
    desc: '分配门派资源',
    icon: 'mdi-shield-outline',
    btnClass: 'btn-primary'
  },
  {
    id: 'assign-tasks',
    title: '分派任务',
    desc: '分派门派任务',
    icon: 'mdi-pill',
    btnClass: 'btn-secondary'
  },
  {
    id: 'manage-disciples',
    title: '管理弟子',
    desc: '管理门下弟子',
    icon: 'mdi-pulse',
    btnClass: 'btn-accent'
  },
  {
    id: 'view-reports',
    title: '查看报告',
    desc: '查看门派报告',
    icon: 'mdi-account-group',
    btnClass: 'btn-info'
  }
]

defineEmits(['action'])
</script>

<style scoped>
.btn {
  @apply transition-all duration-200 hover:scale-[1.02];
}
</style>
