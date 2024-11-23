<template>
  <div class="image-message">
    <div class="image-card">
      <div class="image-container">
        <img 
          :src="content.url" 
          :alt="content.description"
          class="image-preview"
          loading="lazy"
          @click="handleImageClick"
        />
        <div class="image-overlay">
          <Icon icon="ep:zoom-in" class="zoom-icon" />
        </div>
      </div>
      <div v-if="content.description" class="image-description">
        <p>{{ content.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  content: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['preview'])

const handleImageClick = (event) => {
  event.preventDefault()
  emit('preview', content.url)
}
</script>

<style scoped>
.image-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.image-card {
  @apply overflow-hidden rounded-lg;
}

.image-container {
  @apply relative max-h-[300px] overflow-hidden;
}

.image-preview {
  @apply w-full h-full object-cover cursor-zoom-in;
}

.image-overlay {
  @apply absolute inset-0 bg-black/0 flex items-center justify-center
         opacity-0 transition-all duration-300 hover:bg-black/30 hover:opacity-100;
}

.zoom-icon {
  @apply text-white text-2xl transform scale-0 transition-transform duration-300;
}

.image-overlay:hover .zoom-icon {
  @apply scale-100;
}

.image-description {
  @apply p-4 text-sm opacity-70;
}
</style>
