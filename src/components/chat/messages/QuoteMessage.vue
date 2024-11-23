<template>
  <div class="quote-message">
    <div class="quote-card">
      <div class="quote-icon">
        <Icon icon="ep:chat-dot-round" />
      </div>
      <div class="quote-content">
        <p class="quote-text">{{ content.text }}</p>
        <div class="quote-source">
          <span class="quote-author">{{ content.author }}</span>
          <span class="quote-separator">·</span>
          <span class="quote-book">{{ content.source }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.quote-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.quote-card {
  @apply flex gap-4 p-6 rounded-lg
         border-l-4 border-primary/50;
}

.quote-icon {
  @apply text-primary/70;
}

.quote-icon .iconify {
  @apply w-8 h-8;
}

.quote-content {
  @apply flex-1;
}

.quote-text {
  @apply text-lg font-medium mb-4 leading-relaxed;
}

.quote-source {
  @apply flex items-center gap-2 text-sm opacity-70;
}

.quote-author {
  @apply font-bold;
}

.quote-separator {
  @apply opacity-50;
}

.quote-book {
  @apply italic;
}
</style>
