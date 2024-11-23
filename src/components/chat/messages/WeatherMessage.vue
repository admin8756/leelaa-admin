<template>
  <div class="weather-message">
    <div class="weather-card">
      <div class="weather-header">
        <div class="location-info">
          <h3 class="location-name">{{ content.location }}</h3>
          <p class="update-time">{{ content.updateTime }}</p>
        </div>
      </div>

      <div class="current-weather">
        <div class="weather-main">
          <div class="temp-display">
            <span class="current-temp">{{ content.current.temp }}°</span>
            <div class="temp-range">
              <span class="high-temp">{{ content.current.high }}°</span>
              <span class="temp-separator">/</span>
              <span class="low-temp">{{ content.current.low }}°</span>
            </div>
          </div>
          <div class="weather-info">
            <Icon :icon="getWeatherIcon(content.current.weather)" class="weather-icon" />
            <span class="weather-text">{{ content.current.weather }}</span>
          </div>
        </div>
        
        <div class="weather-details">
          <div class="detail-item">
            <Icon icon="mingcute:water-line" />
            <span>湿度 {{ content.current.humidity }}%</span>
          </div>
          <div class="detail-item">
            <Icon icon="mingcute:wind-line" />
            <span>风速 {{ content.current.windSpeed }}级</span>
          </div>
          <div class="detail-item">
            <Icon icon="mingcute:drop-line" />
            <span>降水 {{ content.current.precipitation }}mm</span>
          </div>
        </div>
      </div>

      <div class="weather-forecast">
        <div v-for="(day, index) in content.forecast" :key="index" class="forecast-item">
          <span class="forecast-day">{{ day.day }}</span>
          <Icon :icon="getWeatherIcon(day.weather)" class="forecast-icon" />
          <div class="forecast-temp">
            <span class="forecast-high">{{ day.high }}°</span>
            <span class="forecast-separator">/</span>
            <span class="forecast-low">{{ day.low }}°</span>
          </div>
        </div>
      </div>
    </div>
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

// 根据天气状况返回对应的图标
const getWeatherIcon = (weather) => {
  const iconMap = {
    '晴': 'ep:sunny',
    '多云': 'ep:cloudy',
    '阴': 'ep:partly-cloudy',
    '小雨': 'ep:light-rain',
    '中雨': 'ep:moderate-rain',
    '大雨': 'ep:heavy-rain',
    '雷阵雨': 'ep:lightning',
    '雪': 'ep:snow',
    '雾': 'ep:fog'
  }
  return iconMap[weather] || 'ep:question'
}
</script>

<style scoped>
.weather-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.weather-card {
  @apply p-4 rounded-lg;
}

.weather-header {
  @apply flex justify-between items-start;
}

.location-info {
  @apply space-y-1;
}

.location-name {
  @apply text-xl font-medium;
}

.update-time {
  @apply text-sm text-base-content/70;
}

.current-weather {
  @apply space-y-6;
}

.weather-main {
  @apply flex justify-between items-center;
}

.temp-display {
  @apply flex items-end gap-2;
}

.current-temp {
  @apply text-4xl font-light;
}

.temp-range {
  @apply text-base-content/70 mb-1;
}

.temp-separator {
  @apply mx-1 text-base-content/50;
}

.weather-info {
  @apply flex items-center gap-2;
}

.weather-icon {
  @apply w-12 h-12 text-primary;
}

.weather-text {
  @apply text-lg;
}

.weather-details {
  @apply flex gap-6;
}

.detail-item {
  @apply flex items-center gap-2 text-base-content/70;
}

.detail-item .iconify {
  @apply w-5 h-5;
}

.weather-forecast {
  @apply grid grid-cols-4 gap-4 pt-4 border-t border-base-content/10;
}

.forecast-item {
  @apply flex flex-col items-center gap-2;
}

.forecast-day {
  @apply text-sm text-base-content/70;
}

.forecast-icon {
  @apply w-6 h-6 text-primary;
}

.forecast-temp {
  @apply text-sm;
}

.forecast-separator {
  @apply mx-1 text-base-content/50;
}

.forecast-low {
  @apply text-base-content/70;
}
</style>
