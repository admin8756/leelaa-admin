<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>
<template>
  <div class="hero min-h-screen" style="background-image: url(https://api.luvying.com/acgimg)">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">404  {{ t('not-found.title') }}</h1>
        <p class="mb-5">{{ t('not-found.description') }}</p>
        <button class="btn btn-primary" @click="goHome">{{ t('not-found.button') }}</button>
      </div>
    </div>
  </div>
</template>
