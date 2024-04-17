<template>
  <div class="m-4">
    <nav-bar></nav-bar>
  </div>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>
