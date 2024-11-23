<template>
  <div class="flex h-screen flex-col">
    <!-- 导航栏 -->
    <nav-bar class="flex-none"></nav-bar>

    <!-- 主要内容区域 -->
    <div class="flex-1 overflow-auto">
      <main class="min-h-full p-4">
        <RouterView></RouterView>
      </main>

      <!-- 页尾 -->
      <app-footer class="flex-none"></app-footer>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./components/navbar/NavBar.vue";
import AppFooter from "./components/BaseFooter.vue";
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
