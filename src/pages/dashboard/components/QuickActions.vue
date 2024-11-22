<template>
  <div class="card bg-base-200/50 backdrop-blur-sm shadow-lg">
    <div class="card-body p-6">
      <div class="flex items-center gap-3 mb-6">
        <Icon icon="mdi:lightning-bolt" class="text-warning text-2xl" />
        <h2 class="card-title m-0 text-xl">快捷操作</h2>
      </div>
      
      <div class="grid grid-cols-2 gap-5">
        <button 
          v-for="action in actions" 
          :key="action.id"
          class="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all duration-300"
          :class="[
            action.primary 
              ? 'bg-primary/10 hover:bg-primary/20' 
              : 'bg-base-100/30 hover:bg-base-100/50'
          ]"
          @click="$emit('action', action.id)"
        >
          <!-- 图标容器 -->
          <div 
            class="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 mb-2"
            :class="[
              action.primary 
                ? 'bg-primary/20 group-hover:bg-primary/30' 
                : 'bg-base-200/50 group-hover:bg-base-200/70'
            ]"
          >
            <Icon 
              :icon="action.icon" 
              class="text-3xl transition-all duration-300"
              :class="[
                action.primary 
                  ? 'text-primary group-hover:text-primary-focus' 
                  : `text-${action.color} group-hover:scale-110`
              ]" 
            />
          </div>

          <!-- 文字内容 -->
          <div class="flex flex-col items-center text-center">
            <span 
              class="text-base font-medium mb-1"
              :class="{ 'text-primary-content': action.primary }"
            >
              {{ action.title }}
            </span>
            <span 
              class="text-sm opacity-75"
              :class="{ 'text-primary-content/70': action.primary }"
            >
              {{ action.desc }}
            </span>
          </div>

          <!-- 悬浮效果装饰 -->
          <div 
            class="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
            :class="[
              action.primary 
                ? 'bg-primary/5' 
                : 'bg-base-content/5'
            ]"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const actions = [
  {
    id: 'openFormation',
    title: '开启护山大阵',
    desc: '激活门派防护阵法',
    icon: 'mdi:shield-check',
    color: 'primary',
    primary: true
  },
  {
    id: 'distributeElixir',
    title: '分发丹药',
    desc: '向突破弟子分发丹药',
    icon: 'game-icons:magic-potion',
    color: 'success'
  },
  {
    id: 'checkSpirit',
    title: '检查灵脉',
    desc: '查看灵气浓度变化',
    icon: 'mdi:chart-bell-curve-cumulative',
    color: 'info'
  },
  {
    id: 'gatherDisciples',
    title: '召集弟子',
    desc: '紧急召集门下弟子',
    icon: 'mdi:account-group',
    color: 'warning'
  }
]

defineEmits(['action'])
</script>

<style scoped>
.card {
  @apply transition-all duration-300;
}

button {
  @apply border-none shadow-sm hover:shadow-md;
}

/* 添加微妙的光晕效果 */
button::after {
  content: '';
  @apply absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300;
  background: radial-gradient(circle at center, var(--fallback-b1, oklch(var(--b1))), transparent 70%);
}

button:hover::after {
  @apply opacity-30;
}
</style>
