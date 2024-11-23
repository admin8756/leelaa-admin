<template>
  <div 
    class="message-card"
    :class="{ 'message-card--self': isSelf }"
  >
    <div class="message-card__avatar">
      <img :src="message.sender.avatar" :alt="message.sender.name" />
    </div>
    <div class="message-card__content">
      <div class="message-card__name">{{ message.sender.name }}</div>
      <div class="message-card__bubble">
        <component 
          :is="messageComponents[message.type]" 
          :content="message.content"
          @preview="handlePreview"
        />
      </div>
      <div class="message-card__time">{{ formatTime(message.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MessageType } from '@/mock/chat'
import TextMessage from './messages/TextMessage.vue'
import ImageMessage from './messages/ImageMessage.vue'
import LocationMessage from './messages/LocationMessage.vue'
import VoiceMessage from './messages/VoiceMessage.vue'
import WeatherMessage from './messages/WeatherMessage.vue'
import MapMessage from './messages/MapMessage.vue'
import VideoMessage from './messages/VideoMessage.vue'
import MusicMessage from './messages/MusicMessage.vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  currentUserId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['preview'])

const messageComponents = {
  [MessageType.TEXT]: TextMessage,
  [MessageType.IMAGE]: ImageMessage,
  [MessageType.LOCATION]: LocationMessage,
  [MessageType.VOICE]: VoiceMessage,
  [MessageType.WEATHER]: WeatherMessage,
  [MessageType.MAP]: MapMessage,
  [MessageType.VIDEO]: VideoMessage,
  [MessageType.MUSIC]: MusicMessage
}

const isSelf = computed(() => props.message.sender.id === props.currentUserId)

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const handlePreview = (data) => {
  emit('preview', {
    type: props.message.type,
    data
  })
}
</script>

<style scoped>
.message-card {
  display: flex;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.message-card--self {
  flex-direction: row-reverse;
}

.message-card__avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.message-card__avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.message-card__content {
  max-width: 70%;
}

.message-card--self .message-card__content {
  align-items: flex-end;
}

.message-card__name {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.message-card__bubble {
  background: #fff;
  padding: 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-card--self .message-card__bubble {
  background: #4CAF50;
  color: white;
}

.message-card__time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
}
</style>
