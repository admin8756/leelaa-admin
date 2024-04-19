<script setup>
import { onMounted } from 'vue';
import { themeChange } from 'theme-change';
onMounted(() => {
  themeChange(false);
});
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
