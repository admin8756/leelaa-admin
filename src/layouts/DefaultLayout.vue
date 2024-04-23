<template>
  <main>
    <nav class="p-4">
      <nav-bar></nav-bar>
    </nav>
    <section class="container">
      <RouterView></RouterView>
    </section>
  </main>
</template>

<script setup>
import NavBar from './components/navbar/NavBar.vue';
</script>
