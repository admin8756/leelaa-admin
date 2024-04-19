<script setup>
import { themeChange } from 'theme-change';
const themeList = ['light', 'dark', 'cupcake', 'retro', 'dim', 'lemonade'];
</script>
<template>
  <div>
    <div class="text-red-600 p-3 text-2xl">Index Page</div>
    <div class="join join-vertical">
      <button
        class="btn join-item theme-controller"
        data-choose-theme
        data-key="theme"
        :data-set-theme="theme"
        v-for="(theme, index) in themeList"
        @click="themeChange(theme)"
        :key="index"
      >
        {{ theme }}
      </button>
    </div>
  </div>
</template>
