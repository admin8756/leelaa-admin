<template>
  <div class="h-screen flex flex-col">
  <BaseNavBar />
    <div class="flex-1 overflow-y-auto">
      <div class="min-h-full flex flex-col">
        <div class="flex-1">
          <router-view></router-view>
        </div>
        <BaseFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseNavBar from "./components/BaseNavBar.vue";
import BaseFooter from "./components/BaseFooter.vue";
</script>

<style>
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
