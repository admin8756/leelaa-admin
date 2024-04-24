<template>
  <main>
    <nav class="p-4">
      <nav-bar></nav-bar>
    </nav>
    <div class="p-4">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script setup>
import NavBar from './components/navbar/NavBar.vue';
</script>
