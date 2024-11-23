<template>
  <div class="link-message">
    <a :href="content.url" target="_blank" class="link-card">
      <div class="link-preview" v-if="content.image">
        <img 
          :src="content.image" 
          :alt="content.title"
          class="preview-image"
        />
      </div>
      <div class="link-content">
        <h3 class="link-title">{{ content.title }}</h3>
        <p class="link-description">{{ content.description }}</p>
        <div class="link-meta">
          <Icon icon="mingcute:link" />
          <span class="link-url">{{ formatUrl(content.url) }}</span>
        </div>
      </div>
    </a>
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

const formatUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return url
  }
}
</script>

<style scoped>
.link-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.link-card {
  @apply flex gap-4 rounded-lg overflow-hidden
         hover:opacity-90 transition-all duration-300;
}

.link-preview {
  @apply w-32 h-32 flex-shrink-0 overflow-hidden;
}

.preview-image {
  @apply w-full h-full object-cover;
}

.link-content {
  @apply flex-1 min-w-0 p-4;
}

.link-title {
  @apply text-lg font-medium mb-2 line-clamp-1;
}

.link-description {
  @apply text-sm opacity-70 mb-3 line-clamp-2;
}

.link-meta {
  @apply flex items-center gap-2 text-sm text-primary/70;
}

.link-meta .iconify {
  @apply w-4 h-4;
}

.link-url {
  @apply truncate;
}
</style>
