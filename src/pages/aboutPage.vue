<script setup>
import { dependencies, devDependencies } from '../../package.json';
</script>

<template>
  <div class="overflow-x-auto p-4 flex mt-4">
    <div class="card w-96 bg-base-100 shadow-xl mr-4">
    <h1 class="m-2">运行依赖</h1>
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>依赖库</th>
            <th>版本</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in dependencies" :key="index">
            <th>{{ index }}</th>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card w-96 bg-base-100 shadow-xl">
    <h1 class="m-2">开发依赖</h1>
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>依赖库</th>
            <th>版本</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in devDependencies" :key="index">
            <th>{{ index }}</th>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* 在这里添加 Tailwind CSS 样式 */
</style>
