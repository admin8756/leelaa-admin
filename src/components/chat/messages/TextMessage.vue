<template>
  <div class="text-message">
    {{ typeof content === 'object' ? content.text : content }}
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: [String, Object],
    required: true,
    validator: (value) => {
      if (typeof value === 'string') return true
      return typeof value === 'object' && typeof value.text === 'string'
    }
  }
})
</script>

<style scoped>
.text-message {
  @apply text-base-content/90 leading-relaxed;
  word-break: break-word;
  line-height: 1.5;
}
</style>
