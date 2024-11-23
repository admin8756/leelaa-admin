<template>
  <div 
    class="friend-list bg-base-200/90 border-r border-base-content/10 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[modelValue ? 'w-full md:w-80 h-full md:h-full' : 'w-0 md:w-80 h-0 md:h-full']"
  >
    <div class="h-full flex flex-col">
      <!-- 列表头部 -->
      <div class="p-4 border-b border-base-content/10 bg-base-200/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Icon icon="ri:sword-fill" class="text-lg text-primary" />
            <span class="text-sm opacity-70">在线 12</span>
          </div>
          <button class="btn btn-ghost btn-circle btn-sm md:hidden" @click="$emit('update:modelValue', false)">
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- 列表内容 -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="(item, index) in chatList" 
          :key="index"
          class="flex items-center p-3 hover:bg-base-300/50 transition-colors cursor-pointer border-b border-base-content/5"
        >
          <div class="avatar">
            <div class="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img :src="item.avatar" :alt="item.name" />
            </div>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <div class="font-medium flex items-center text-sm">
              {{ item.name }}
              <Icon v-if="item.self" icon="ri:sword-line" class="ml-1 text-primary" />
            </div>
            <div class="text-xs opacity-70 truncate">
              {{ item.lastMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  chatList: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>
