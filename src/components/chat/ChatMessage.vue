<template>
  <div
    class="chat group"
    :class="[
      message.sender.id === 999 ? 'chat-end' : 'chat-start',
      'message-item animate-slide-in'
    ]"
  >
    <!-- 头像 -->
    <div 
      class="chat-image avatar cursor-pointer transition-transform duration-300 hover:scale-110"
      @click="$emit('avatarClick', message.sender)"
    >
      <div class="w-10 rounded-full ring ring-primary/50 ring-offset-2 ring-offset-base-100 transition-all duration-300">
        <img 
          :src="message.sender.avatar" 
          :alt="message.sender.name" 
          class="bg-base-200"
        />
      </div>
    </div>

    <!-- 用户信息和时间 -->
    <div class="chat-header opacity-75 flex items-center space-x-2 select-none">
      <span class="font-medium">{{ message.sender.name }}</span>
      <span class="text-xs opacity-50">{{ message.sender.level }}</span>
      <Icon 
        v-if="message.sender.id === 999" 
        icon="mingcute:star-fill" 
        class="text-yellow-500" 
      />
      <time class="text-xs opacity-50">{{ message.timestamp }}</time>
    </div>
    
    <!-- 消息内容 -->
    <div 
      class="chat-bubble backdrop-blur-lg overflow-hidden"
      :class="[
        message.sender.id === 999 
          ? 'bg-primary/80' 
          : 'bg-base-content/10',
        {'animate-pulse': message.sending}
      ]"
    >
      <!-- 动态组件 -->
      <component
        :is="messageComponents[message.type]"
        v-if="messageComponents[message.type]"
        :content="message.content"
        @preview="$emit('preview', $event)"
      />

      <!-- 发送中动画 -->
      <div 
        v-if="message.sending" 
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent sending-wave"
      ></div>
    </div>
    
    <!-- 消息状态 -->
    <div 
      class="chat-footer opacity-50 flex items-center space-x-1 select-none"
      :class="{'justify-end': message.sender.id === 999}"
    >
      <template v-if="message.sender.id === 999">
        <span class="text-xs">{{ message.state ? '已传达' : '传音中' }}</span>
        <Icon 
          :icon="message.state ? 'mingcute:check-double-fill' : 'mingcute:check-fill'" 
          class="transition-all duration-300"
          :class="{'text-primary scale-110': message.state}"
        />
      </template>
      <template v-else>
        <Icon icon="mingcute:sword-fill" class="text-accent" />
        <span class="text-xs">道法传音</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { MessageType } from '@/mock/chat'
import TextMessage from './messages/TextMessage.vue'
import ImageMessage from './messages/ImageMessage.vue'
import LocationMessage from './messages/LocationMessage.vue'
import VoiceMessage from './messages/VoiceMessage.vue'
import WeatherMessage from './messages/WeatherMessage.vue'
import VideoMessage from './messages/VideoMessage.vue'
import MusicMessage from './messages/MusicMessage.vue'
import ContactMessage from './messages/ContactMessage.vue'
import QuoteMessage from './messages/QuoteMessage.vue'
import LinkMessage from './messages/LinkMessage.vue'
import FileMessage from './messages/FileMessage.vue'

// 消息组件映射
const messageComponents = {
  [MessageType.TEXT]: TextMessage,
  [MessageType.IMAGE]: ImageMessage,
  [MessageType.LOCATION]: LocationMessage,
  [MessageType.VOICE]: VoiceMessage,
  [MessageType.WEATHER]: WeatherMessage,
  [MessageType.VIDEO]: VideoMessage,
  [MessageType.MUSIC]: MusicMessage,
  [MessageType.CONTACT]: ContactMessage,
  [MessageType.QUOTE]: QuoteMessage,
  [MessageType.LINK]: LinkMessage,
  [MessageType.FILE]: FileMessage
}

defineProps({
  message: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.sender && value.content && value.type
    }
  }
})

defineEmits(['preview', 'avatarClick'])
</script>

<style scoped>
/* 发送中动画 */
.sending-wave {
  animation: wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes wave {
  from {
    transform: translateX(-100%) skewX(-15deg);
  }
  to {
    transform: translateX(100%) skewX(-15deg);
  }
}

/* 消息进入动画 */
.message-item {
  animation: message-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

@keyframes message-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-image {
  @apply z-10;
}

.chat-footer {
  @apply mt-1;
}
</style>
