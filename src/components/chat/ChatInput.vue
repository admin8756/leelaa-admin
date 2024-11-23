<template>
  <div class="chat-input">
    <!-- 主输入区域 -->
    <div class="input-area" :class="{ 'input-area--focused': isFocused }">
      <!-- 工具栏 -->
      <div class="tools-bar">
        <button
          v-for="tool in messageTools"
          :key="tool.type"
          class="tool-btn"
          :class="{ 'tool-btn--active': activeType === tool.type }"
          @click="handleToolClick(tool.type)"
        >
          <Icon :icon="tool.icon" class="tool-icon" />
          <span class="tool-label">{{ tool.label }}</span>
        </button>
      </div>

      <!-- 输入框 -->
      <div class="input-container">
        <textarea
          ref="inputRef"
          v-model="message"
          placeholder="请输入您的道法感悟..."
          class="message-input"
          :rows="1"
          @input="autoGrow"
          @keydown.enter.prevent="handleSend"
          @focus="handleFocus"
          @blur="handleBlur"
        ></textarea>
        
        <!-- 发送按钮 -->
        <button 
          class="send-btn"
          :class="{ 'send-btn--loading': isLoading }"
          :disabled="!canSend || isLoading"
          @click="handleSend"
        >
          <Icon 
            v-if="!isLoading" 
            icon="game-icons:scroll-quill" 
            class="send-icon"
          />
          <span>传音</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import {
  voiceMessageMock,
  imageMessageMock,
  videoMessageMock,
  musicMessageMock,
  generateWeatherData,
  locationMessageMock,
  linkMessageMock,
  fileMessageMock,
  contactMessageMock,
  quoteMessageMock
} from '@/mock/chatMessages'

// 消息工具
const messageTools = [
  { type: 'voice', icon: 'mingcute:mic-fill', label: '语音' },
  { type: 'image', icon: 'mingcute:image-fill', label: '图片' },
  { type: 'video', icon: 'mingcute:video-fill', label: '视频' },
  { type: 'music', icon: 'mingcute:music-fill', label: '音乐' },
  { type: 'weather', icon: 'mingcute:sun-fill', label: '天气' },
  { type: 'location', icon: 'mingcute:map-pin-fill', label: '位置' },
  { type: 'link', icon: 'mingcute:link-fill', label: '链接' },
  { type: 'file', icon: 'mingcute:file-fill', label: '文件' },
  { type: 'contact', icon: 'mingcute:user-fill', label: '名片' },
  { type: 'quote', icon: 'mingcute:quote-fill', label: '引用' }
]

// 状态
const message = ref('')
const isFocused = ref(false)
const isLoading = ref(false)
const showTypePanel = ref(false)
const activeType = ref('')
const inputRef = ref(null)

// 计算属性
const canSend = computed(() => message.value.trim())

// 方法
const handleFocus = () => {
  isFocused.value = true
  showTypePanel.value = false
  activeType.value = ''
}

const handleBlur = () => {
  isFocused.value = false
}

const autoGrow = (e) => {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}

const handleToolClick = (type) => {
  // 生成随机的发送者ID (1 或 2)
  const senderId = Math.random() < 0.5 ? 1 : 2

  // 根据消息类型发送对应的模拟数据
  switch (type) {
    case 'voice':
      emit('send', { type, senderId, content: voiceMessageMock })
      break
    case 'image':
      emit('send', { type, senderId, content: imageMessageMock })
      break
    case 'video':
      emit('send', { type, senderId, content: videoMessageMock })
      break
    case 'music':
      emit('send', { type, senderId, content: musicMessageMock })
      break
    case 'weather':
      emit('send', { type, senderId, content: generateWeatherData() })
      break
    case 'location':
      emit('send', { type, senderId, content: locationMessageMock })
      break
    case 'link':
      emit('send', { type, senderId, content: linkMessageMock })
      break
    case 'file':
      emit('send', { type, senderId, content: fileMessageMock })
      break
    case 'contact':
      emit('send', { type, senderId, content: contactMessageMock })
      break
    case 'quote':
      emit('send', { type, senderId, content: quoteMessageMock })
      break
  }
}

const handleSend = async () => {
  if (!canSend.value || isLoading.value) return
  
  isLoading.value = true
  try {
    const content = message.value.trim()
    if (content) {
      emit('send', {
        type: 'text',
        senderId: Math.random() < 0.5 ? 1 : 2,
        content: { text: content }
      })
      message.value = ''
      inputRef.value.style.height = 'auto'
    }
  } finally {
    isLoading.value = false
  }
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus()
})

const emit = defineEmits(['send'])
</script>

<style scoped>
.chat-input {
  @apply relative bg-base-200/90 border-t border-base-content/10;
}

.input-area {
  @apply p-4 transition-all duration-300;
}

.input-area--focused {
  @apply bg-base-100/50;
}

.tools-bar {
  @apply flex gap-2 mb-4 flex-wrap;
}

.tool-btn {
  @apply flex flex-col items-center gap-1 px-4 py-2 rounded-lg
         transition-all duration-300 hover:bg-base-content/10;
}

.tool-btn--active {
  @apply bg-primary/20 text-primary;
}

.tool-icon {
  @apply w-6 h-6;
}

.tool-label {
  @apply text-xs;
}

.input-container {
  @apply flex gap-4 items-end;
}

.message-input {
  @apply flex-1 input input-bordered bg-base-100/50 min-h-[40px] max-h-[120px]
         resize-none placeholder:text-base-content/50;
}

.send-btn {
  @apply btn btn-primary min-w-[100px] h-[40px] gap-2
         relative overflow-hidden transition-all duration-300;
}

.send-btn--loading {
  @apply loading loading-spinner loading-sm before:!w-4 before:!h-4;
}

.send-icon {
  @apply w-5 h-5 transition-transform duration-300;
}

.send-btn:hover .send-icon {
  @apply rotate-12 scale-110;
}
</style>
