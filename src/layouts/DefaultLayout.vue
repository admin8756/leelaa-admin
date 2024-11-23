<template>
  <div class="min-h-full flex flex-col">
    <BaseNavBar />
    <div class="flex-1 flex flex-col">
      <router-view></router-view>
    </div>
    <BaseFooter />
  </div>
</template>

<script setup>
import BaseNavBar from "./components/BaseNavBar.vue";
import BaseFooter from "./components/BaseFooter.vue";
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 美化滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.3);
}
</style>
