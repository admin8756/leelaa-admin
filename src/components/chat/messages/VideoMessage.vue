<template>
  <div class="video-message" @click="handleClick">
    <div class="video-message__container">
      <img 
        :src="content.thumbnail" 
        :alt="content.description"
        class="video-message__thumbnail"
      />
      <div class="video-message__overlay">
        <Icon icon="mingcute:play-fill" class="video-message__play" />
        <span class="video-message__duration">{{ formatDuration(content.duration) }}</span>
      </div>
    </div>
    <div v-if="content.title" class="video-message__info">
      <h3 class="video-message__title">{{ content.title }}</h3>
      <p v-if="content.description" class="video-message__description">
        {{ content.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
    validator: (obj) => {
      return obj.url && obj.thumbnail
    }
  }
})

const emit = defineEmits(['preview'])

const formatDuration = (seconds) => {
  if (!seconds) return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const handleClick = () => {
  emit('preview', {
    type: 'video',
    url: props.content.url,
    title: props.content.title,
    description: props.content.description
  })
}
</script>

<style scoped>
.video-message {
  @apply -m-4 cursor-pointer max-w-[600px] min-w-[300px];
}

.video-message__container {
  @apply relative aspect-video overflow-hidden rounded-lg;
}

.video-message__thumbnail {
  @apply w-full h-full object-cover;
}

.video-message__overlay {
  @apply absolute inset-0 bg-black/30
         flex items-center justify-center
         transition-colors duration-300;
}

.video-message:hover .video-message__overlay {
  @apply bg-black/50;
}

.video-message__play {
  @apply text-white text-4xl
         transition-transform duration-300 ease-out;
}

.video-message:hover .video-message__play {
  @apply scale-110;
}

.video-message__duration {
  @apply absolute bottom-2 right-2
         bg-black/70 text-white
         px-2 py-1 text-xs rounded-md;
}

.video-message__info {
  @apply p-4 space-y-1;
}

.video-message__title {
  @apply text-base font-medium leading-snug;
}

.video-message__description {
  @apply text-sm text-base-content/70 line-clamp-2;
}
</style>
