<!-- 修仙主题的聊天页面 -->
<template>
  <div class="chat-container h-[calc(100vh-4rem)] bg-base-100 bg-[url('/src/assets/images/chat-bg.png')] bg-cover bg-center">
    <!-- 主内容区 -->
    <div class="h-full flex flex-col md:flex-row bg-base-100/95 backdrop-blur-sm">
      <!-- 修仙者列表 - 移动端可隐藏 -->
      <ChatSidebar
        v-model="showFriendList"
        :chat-list="chatList"
      />

      <!-- 聊天主窗口 -->
      <div class="chat-main flex-1 flex flex-col h-full">
        <!-- 聊天头部 -->
        <div class="chat-header flex items-center justify-between p-4 bg-base-200/90 border-b border-base-content/10">
          <div class="flex items-center">
            <button class="btn btn-ghost btn-circle btn-sm md:hidden mr-2" @click="showFriendList = true">
              <Icon icon="heroicons:bars-3" class="w-5 h-5" />
            </button>
            <h3 class="text-lg font-bold flex items-center">
              <Icon icon="ri:message-3-line" class="mr-2 text-primary" />
              修仙论道
            </h3>
          </div>
          <div class="text-sm opacity-70 flex items-center">
            <Icon icon="ri:time-line" class="mr-1" />
            {{ currentTime }}
          </div>
        </div>

        <!-- 聊天内容区 -->
        <div ref="messagesRef" class="chat-messages flex-1 overflow-y-auto p-4 bg-base-100/50">
          <TransitionGroup 
            name="message"
            tag="div"
            class="space-y-4"
          >
            <ChatMessage
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
              @preview="handlePreview"
            />
          </TransitionGroup>
        </div>

        <!-- 输入区域 -->
        <ChatInput
          ref="chatInputRef"
          v-model="showVoiceRecorder"
          @send="sendMessage"
        />
      </div>
    </div>

    <!-- 预览弹窗 -->
    <div 
      v-if="preview.show"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      @click="preview.show = false"
    >
      <div 
        class="bg-base-100 rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto"
        @click.stop
      >
        <component
          :is="messageComponents[preview.type]"
          v-if="preview.content"
          :content="preview.content"
          class="preview-content"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { users, chatHistory, MessageType } from '@/mock/chat'
import ChatSidebar from '@/components/chat/ChatSidebar.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import TextMessage from '@/components/chat/messages/TextMessage.vue'
import ImageMessage from '@/components/chat/messages/ImageMessage.vue'
import LocationMessage from '@/components/chat/messages/LocationMessage.vue'
import VoiceMessage from '@/components/chat/messages/VoiceMessage.vue'
import WeatherMessage from '@/components/chat/messages/WeatherMessage.vue'
import VideoMessage from '@/components/chat/messages/VideoMessage.vue'
import MusicMessage from '@/components/chat/messages/MusicMessage.vue'

// 消息组件映射
const messageComponents = {
  [MessageType.TEXT]: TextMessage,
  [MessageType.IMAGE]: ImageMessage,
  [MessageType.LOCATION]: LocationMessage,
  [MessageType.VOICE]: VoiceMessage,
  [MessageType.WEATHER]: WeatherMessage,
  [MessageType.VIDEO]: VideoMessage,
  [MessageType.MUSIC]: MusicMessage
}

// 状态
const showFriendList = ref(true)
const showVoiceRecorder = ref(false)
const messages = ref([])
const chatList = ref(users)
const messagesRef = ref(null)
const chatInputRef = ref(null)
const preview = ref({
  show: false,
  type: '',
  content: null
})

// 当前时间
const currentTime = computed(() => {
  return new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
})

// 生成消息
const createMessage = (content, type = MessageType.TEXT, self = false) => ({
  id: Date.now(),
  type,
  content: typeof content === 'string' ? { text: content } : content,
  sender: self ? {
    id: 999,
    name: '修道者',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4',
    level: '练气期',
    status: 'online'
  } : users[0],
  timestamp: new Date().toLocaleString(),
  sending: false,
  state: false
})

// 发送消息
const sendMessage = async (data) => {
  // 添加发送中的消息
  const message = createMessage(
    typeof data === 'object' ? data.content : data,
    typeof data === 'object' ? data.type : MessageType.TEXT,
    true
  )
  
  message.sending = true
  messages.value.push(message)
  scrollToBottom()

  // 模拟发送延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 更新消息状态
  message.sending = false

  // 模拟回复
  setTimeout(() => {
    let replyContent = ''
    let replyType = MessageType.TEXT

    switch (message.type) {
      case MessageType.TEXT:
        replyContent = '道友所言甚是，让贫道思索片刻...'
        break
      case MessageType.WEATHER:
        replyContent = {
          location: '蜀山剑宗',
          updateTime: '亥时已至，子时将临',
          current: {
            temp: 20,
            weather: '晴',
            humidity: 60,
            windSpeed: 2,
            precipitation: 0,
            high: 24,
            low: 16
          },
          forecast: [
            { day: '明日', weather: '多云', high: 23, low: 15 },
            { day: '后日', weather: '小雨', high: 21, low: 14 },
            { day: '三日后', weather: '晴', high: 25, low: 16 },
            { day: '四日后', weather: '晴', high: 26, low: 17 }
          ]
        }
        replyType = MessageType.WEATHER
        break
      case MessageType.VOICE:
        replyContent = {
          url: '/mock/voice-reply.mp3',
          duration: 15,
          transcription: '贫道已收到道友的传音符，容我细细参详...'
        }
        replyType = MessageType.VOICE
        break
      case MessageType.LOCATION:
        replyContent = '此处灵气充沛，确实是个好去处。'
        break
      case MessageType.MUSIC:
        replyContent = '此曲有道韵，不错不错。'
        break
      default:
        replyContent = '贫道收到道友的传讯了。'
    }

    messages.value.push(createMessage(replyContent, replyType))
    scrollToBottom()
  }, 1000)
}

// 处理预览
const handlePreview = (data) => {
  preview.value = {
    show: true,
    type: data.type,
    content: data.content
  }
}

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  }, 100)
}

onMounted(() => {
  // 加载历史消息
  messages.value = chatHistory
  scrollToBottom()
  chatInputRef.value?.focus()
})
</script>

<style scoped>
.chat-container {
  background-image: url('@/assets/images/ink-bg.svg');
}

.preview-content {
  max-width: 80vw;
  max-height: 80vh;
}

/* 消息动画 */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
