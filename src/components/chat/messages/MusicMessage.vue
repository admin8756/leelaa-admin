<template>
  <div class="music-card">
    <!-- 专辑封面和基本信息 -->
    <div class="cover-section">
      <div class="cover-wrapper">
        <div class="album-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 opacity-50">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1z"/>
          </svg>
        </div>
        
        <!-- 播放按钮 -->
        <button 
          class="btn btn-circle btn-lg glass absolute inset-0 m-auto w-12 h-12 hover:scale-110 transition-transform"
          :class="{ 'btn-primary': isPlaying }"
          @click="togglePlay"
        >
          <Icon 
            :icon="isPlaying ? 'mingcute:pause-fill' : 'mingcute:play-fill'" 
            class="w-6 h-6"
          />
        </button>
      </div>

      <div class="music-info">
        <h3 class="music-title">{{ audioContent.title }}</h3>
        <p class="music-artist">{{ audioContent.artist }}</p>
      </div>
    </div>

    <!-- 歌词显示 -->
    <div class="lyrics-section" v-if="audioContent.lyrics">
      <p class="lyrics">{{ audioContent.lyrics }}</p>
    </div>

    <!-- 播放控制区 -->
    <div class="controls-section">
      <!-- 进度条 -->
      <div class="progress-bar" @click="handleProgressClick">
        <div class="progress-bg"></div>
        <div 
          class="progress-value"
          :style="{ width: `${progress * 100}%` }"
        ></div>
      </div>
      
      <!-- 时间和名称 -->
      <div class="playback-info">
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="track-info">
          <span class="track-name">{{ audioContent.title }}</span>
          <span class="bullet">•</span>
          <span class="track-album">{{ audioContent.album }}</span>
        </div>
      </div>
    </div>

    <!-- 音频元素 -->
    <audio
      ref="audioRef"
      :src="audioContent.url"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleMetadata"
      @ended="handleEnded"
      preload="metadata"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
    validator(value) {
      return value.title && value.url
    }
  }
})

// 音频状态
const audioRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// 计算进度
const progress = computed(() => {
  if (!duration.value) return 0
  return currentTime.value / duration.value
})

// 播放控制
const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 进度条点击
const handleProgressClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  if (audioRef.value) {
    currentTime.value = ratio * duration.value
    audioRef.value.currentTime = currentTime.value
  }
}

// 时间更新
const handleTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

// 元数据加载
const handleMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

// 播放结束
const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 示例音频数据
const defaultAudio = {
  title: '冥想音乐',
  artist: '修真音律',
  album: '道法自然',
  url: '/assets/audio/meditation.mp3',
  lyrics: '这是一段优美的修真音乐，让人心神宁静，道心稳固。'
}

// 合并默认值
const audioContent = computed(() => ({
  ...defaultAudio,
  ...props.content
}))
</script>

<style scoped>
.music-card {
  @apply -m-4;
}

.cover-section {
  @apply p-6 flex gap-6 items-center;
}

.cover-wrapper {
  @apply relative w-24 h-24 rounded-xl overflow-hidden
         bg-base-content/5 flex items-center justify-center;
}

.album-placeholder {
  @apply absolute inset-0 flex items-center justify-center text-base-content/50;
}

.music-info {
  @apply flex-1 min-w-0;
}

.music-title {
  @apply text-lg font-medium truncate;
}

.music-artist {
  @apply text-base-content/70 text-sm truncate;
}

.lyrics-section {
  @apply px-6 pb-4;
}

.lyrics {
  @apply text-base-content/70 text-sm leading-relaxed
         max-h-20 overflow-y-auto;
}

.controls-section {
  @apply px-6 pb-6 space-y-4;
}

.progress-bar {
  @apply relative h-1.5 rounded-full cursor-pointer touch-none;
}

.progress-bg {
  @apply absolute inset-0 bg-base-content/20 rounded-full;
}

.progress-value {
  @apply absolute inset-y-0 left-0 bg-primary rounded-full
         transition-all duration-200;
}

.playback-info {
  @apply flex flex-col gap-1;
}

.time-display {
  @apply flex justify-between text-xs text-base-content/70;
}

.track-info {
  @apply flex items-center gap-2 text-xs text-base-content/50;
}

.bullet {
  @apply text-base-content/30;
}

.track-name {
  @apply font-medium;
}
</style>
