<template>
  <div class="file-message">
    <div class="file-card">
      <div class="file-icon">
        <Icon :icon="getFileIcon(content.type)" />
      </div>
      <div class="file-info">
        <h3 class="file-name">{{ content.name }}</h3>
        <p class="file-size">{{ formatFileSize(content.size) }}</p>
      </div>
      <button class="download-btn" @click="handleDownload">
        <Icon icon="mingcute:download-3-line" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const getFileIcon = (type) => {
  const iconMap = {
    'application/pdf': 'ep:document',
    'application/msword': 'ep:document-copy',
    'application/vnd.ms-excel': 'ep:document',
    'application/vnd.ms-powerpoint': 'ep:document',
    'text/plain': 'ep:document-checked',
    'image/jpeg': 'ep:picture-rounded',
    'image/png': 'ep:picture-rounded',
    'video/mp4': 'ep:video-camera',
    'audio/mpeg': 'ep:headset',
    'application/zip': 'ep:folder'
  }
  return iconMap[type] || 'ep:document'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleDownload = () => {
  window.open(props.content.url, '_blank')
}
</script>

<style scoped>
.file-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.file-card {
  @apply flex items-center gap-4 p-4 rounded-lg
         hover:bg-base-content/5 transition-all duration-300;
}

.file-icon {
  @apply w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10;
}

.file-icon .iconify {
  @apply w-8 h-8 text-primary;
}

.file-info {
  @apply flex-1 min-w-0;
}

.file-name {
  @apply text-base font-medium truncate;
}

.file-size {
  @apply text-sm opacity-70;
}

.download-btn {
  @apply p-2 rounded-lg hover:bg-base-content/10 transition-colors duration-200;
}

.download-btn .iconify {
  @apply w-6 h-6;
}
</style>
