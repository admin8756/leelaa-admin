<template>
  <div class="contact-message">
    <div class="contact-card">
      <div class="contact-avatar">
        <img :src="content.avatar" :alt="content.name" class="avatar-img" />
        <div class="level-badge">{{ content.level }}</div>
      </div>
      <div class="contact-info">
        <div class="contact-header">
          <h3 class="contact-name">{{ content.name }}</h3>
          <span class="contact-title">{{ content.title }}</span>
        </div>
        <div class="contact-details">
          <Icon icon="ep:message" />
          <span class="contact-email">{{ content.contact }}</span>
        </div>
      </div>
      <button class="add-contact-btn">
        <Icon icon="ep:user-filled" />
        <span>加为好友</span>
      </button>
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
</script>

<style scoped>
.contact-message {
  @apply -m-4 max-w-[600px] min-w-[300px];
}

.contact-card {
  @apply flex items-center gap-6 p-4 rounded-lg;
}

.contact-avatar {
  @apply relative;
}

.avatar-img {
  @apply w-16 h-16 rounded-full object-cover border-2 border-primary/20;
}

.level-badge {
  @apply absolute -bottom-1 -right-1 px-2 py-0.5 text-xs rounded-full bg-primary/80 text-primary-content
         shadow-lg backdrop-blur-sm;
}

.contact-info {
  @apply flex-1;
}

.contact-header {
  @apply mb-2;
}

.contact-name {
  @apply text-lg font-bold;
}

.contact-title {
  @apply text-sm opacity-70 ml-2;
}

.contact-details {
  @apply flex items-center gap-2 text-sm opacity-70;
}

.add-contact-btn {
  @apply btn btn-primary btn-sm gap-2;
}
</style>
