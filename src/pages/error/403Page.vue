<script setup>
import router from '@/router/index.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const goHome = () => {
  router.replace('/');
};
</script>
<template>
  <div class="hero min-h-screen" style="background-image: url(https://api.luvying.com/acgimg)">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">403 {{ t('not-accessed.title') }}</h1>
        <p class="mb-5">{{ t('not-accessed.description') }}</p>
        <button class="btn btn-primary" @click="goHome">{{ t('not-accessed.button') }}</button>
      </div>
    </div>
  </div>
</template>
