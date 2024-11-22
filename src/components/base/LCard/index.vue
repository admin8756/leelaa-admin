<template>
  <div 
    class="card" 
    :class="[
      `bg-${bgColor}`,
      { 'shadow-xl': shadow }
    ]"
  >
    <!-- 卡片头部 -->
    <div 
      v-if="$slots.header || title" 
      class="card-header p-4 border-b flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <v-icon v-if="icon" :icon="icon" :class="`text-${iconColor}`" />
        <h2 class="card-title m-0" v-if="title">{{ title }}</h2>
        <slot name="header-badge"></slot>
      </div>
      <slot name="header-actions"></slot>
    </div>

    <!-- 卡片内容 -->
    <div 
      class="card-body" 
      :class="[
        bodyClass,
        { 'p-0': noPadding }
      ]"
    >
      <slot></slot>
    </div>

    <!-- 卡片底部 -->
    <div 
      v-if="$slots.footer" 
      class="card-footer p-4 border-t"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
  iconColor?: string
  bgColor?: string
  shadow?: boolean
  noPadding?: boolean
  bodyClass?: string
}

withDefaults(defineProps<Props>(), {
  bgColor: 'base-100',
  iconColor: 'primary',
  shadow: true,
  noPadding: false,
  bodyClass: ''
})
</script>
