<script setup>
import { dependencies, devDependencies } from "../../package.json";
const goToPage = (url) => {
  window.open(`https://www.npmjs.com/package/${url}`, "_blank");
};
</script>

<template>
  <div class="card glass card-body">
    <div class="card-title">运行依赖</div>
    <div class="flex flex-wrap">
      <button
        class="btn mt-3 mr-3 btn-accent"
        v-for="(item, index) in dependencies"
        @click="goToPage(index)"
        :key="index"
      >
        {{ index }}
        <div class="badge">{{ item }}</div>
      </button>
    </div>
  </div>
  <div class="card glass card-body mt-5">
    <div class="card-title">开发依赖</div>
    <div class="flex flex-wrap">
      <button
        class="btn mt-3 mr-3"
        @click="goToPage(index)"
        v-for="(item, index) in devDependencies"
        :key="index"
      >
        {{ index }}
        <div class="badge">{{ item }}</div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
