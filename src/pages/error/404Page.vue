<script setup>
import { useRouter } from 'vue-router';
const goHome = () => {
  useRouter().push('/');
};
</script>
<template>
  <div class="hero min-h-screen" style="background-image: url(https://api.luvying.com/acgimg)">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">404 页面未找到</h1>
        <p class="mb-5">您流浪到了未知的页面，请检查您输入的网址是否正确。</p>
        <button class="btn btn-primary" @click="goHome">回到首页</button>
      </div>
    </div>
  </div>
</template>
