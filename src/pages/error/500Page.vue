<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import router from '@/router/index.js';
const goHome = () => {
  router.replace('/');
};
</script>

<template>
  <div class="hero min-h-screen" style="background-image: url(https://api.luvying.com/acgimg)">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">500 {{ t('internal-error.title') }}</h1>
        <p class="mb-5">{{ t('internal-error.description') }}</p>
        <button class="btn btn-primary" @click="goHome()">{{ t('internal-error.button') }}</button>
      </div>
    </div>
  </div>
</template>
