<template>
  <div class="bg-base-100 p-4 rounded-box shadow">
    <h2 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
