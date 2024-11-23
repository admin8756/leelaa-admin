<template>
  <div class="voice-message">
    <!-- 隐藏的音频元素 -->
    <audio
      :src="content.url"
      class="hidden"
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="handleEnded"
    ></audio>
    
    <!-- 主要内容区域 -->
    <div class="voice-content relative">
      <!-- 背景进度条 -->
      <div 
        class="absolute inset-0 bg-base-content/10 transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>

      <!-- 前景内容 -->
      <div class="relative flex items-center gap-3 p-2">
        <button 
          class="btn btn-circle btn-xs bg-transparent hover:bg-transparent border-0"
          @click="handlePlayClick"
        >
          <Icon 
            :icon="isPlaying ? 'solar:pause-bold' : 'solar:play-bold'" 
            class="w-4 h-4"
          />
        </button>
        
        <div class="flex-1 flex items-center justify-between text-xs">
          <span>{{ formatTime(currentTime) }}</span>
          <span class="opacity-50">{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <!-- 语音转写文本 -->
    <div 
      v-if="content.transcription" 
      class="mt-2 voice-transcription"
    >
      <div class="transcription-content">
        {{ content.transcription }}
      </div>
    </div>

    <!-- 消息类型标识 -->
    <div class="mt-2 flex items-center gap-1 text-xs text-base-content/50">
      <Icon icon="ri:sound-module-line" class="w-3.5 h-3.5" />
      <span>语音传音</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  content: {
    type: Object,
    required: true
  }
})

const isPlaying = ref(false)
const audioRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

// 播放控制
const handlePlayClick = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 监听音频播放结束
const handleEnded = () => {
  isPlaying.value = false
}

// 更新进度
const onTimeUpdate = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  progress.value = (currentTime.value / duration.value) * 100
}

// 加载音频信息
const onLoadedMetadata = () => {
  if (!audioRef.value) return
  duration.value = audioRef.value.duration
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 组件销毁前停止播放
onBeforeUnmount(() => {
  if (audioRef.value && !audioRef.value.paused) {
    audioRef.value.pause()
  }
})
</script>

<style scoped>
.voice-message {
  @apply flex flex-col min-w-[200px];
}

.voice-content {
  @apply rounded-lg overflow-hidden;
}

.voice-transcription {
  @apply px-3 py-2 rounded-lg;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
}

.transcription-content {
  @apply text-sm leading-relaxed;
  font-weight: 300;
  letter-spacing: 0.2px;
}

/* 播放按钮悬浮效果 */
.btn-circle {
  @apply transition-all duration-300;
}

.btn-circle:hover {
  @apply opacity-80;
}
</style>
