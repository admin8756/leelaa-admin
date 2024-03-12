<script setup></script>
<template>
  <div class="text-red-600 p-3 text-2xl">Index Page</div>
  <div class="join join-vertical">
    <input
      type="radio"
      name="theme-buttons"
      class="btn theme-controller join-item"
      aria-label="Default"
      value="default"
    />
    <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Retro" value="retro" />
    <input
      type="radio"
      name="theme-buttons"
      class="btn theme-controller join-item"
      aria-label="Cyberpunk"
      value="cyberpunk"
    />
    <input
      type="radio"
      name="theme-buttons"
      class="btn theme-controller join-item"
      aria-label="Valentine"
      value="valentine"
    />
    <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Aqua" value="aqua" />
  </div>
</template>
