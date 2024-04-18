<template>
  <main>
    <nav class="my-4">
      <nav-bar></nav-bar>
    </nav>
    <section class="container">
      <RouterView></RouterView>
    </section>
  </main>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>
