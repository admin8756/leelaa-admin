<template>
  <div class="location-message" @click="handleClick">
    <div class="location-message__header">
      <Icon icon="mdi:map-marker" class="location-message__icon" />
      <div class="location-message__info">
        <div class="location-message__name">{{ content.name }}</div>
        <div class="location-message__address">{{ content.address }}</div>
      </div>
    </div>
    <div class="location-message__map">
      <img 
        :src="getStaticMapUrl(content.latitude, content.longitude)" 
        alt="Location Map"
        class="location-message__map-image"
      />
      <div class="location-message__overlay">
        <span>查看详情</span>
      </div>
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
      return obj.latitude && obj.longitude && obj.address && obj.name
    }
  }
})

const emit = defineEmits(['preview'])

const getStaticMapUrl = (lat, lng) => {
  // 这里使用 OpenStreetMap 的静态图片服务
  // 实际项目中可以替换为其他地图服务商的 API
  const zoom = 15
  const width = 300
  const height = 150
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=${lat},${lng},red`
}

const handleClick = () => {
  emit('preview', props.content)
}
</script>

<style scoped>
.location-message {
  width: 300px;
  background: var(--color-bg-light);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
}

.location-message__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
}

.location-message__icon {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.location-message__info {
  flex: 1;
  min-width: 0;
}

.location-message__name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.location-message__address {
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location-message__map {
  position: relative;
  height: 150px;
}

.location-message__map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-message__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.location-message__overlay span {
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.5);
}

.location-message:hover .location-message__overlay {
  opacity: 1;
}
</style>
