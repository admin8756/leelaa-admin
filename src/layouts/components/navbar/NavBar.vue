<script setup>
import { name } from "../../../../package.json";
import router, { routesList } from "@/router/index.js";

import LanguageBtn from "./modules/LanguageBtn.vue";
import ThemeBtn from "./modules/ThemeBtn.vue";
import MineBtn from "./modules/MineBtn.vue";

// 设置语言

// 判断当前路由是否是当前页面
const isActive = (path) => {
  return router.currentRoute.value.path === path;
};
// 跳转页面
const pageTo = (to) => {
  router.push({ path: to });
};
</script>

<template>
  <div
    class="navbar bg-base-100 text-base-content sticky top-0 z-30 flex w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm"
  >
    <!-- 移动端布局 -->
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            v-for="(item, index) in routesList"
            :key="index"
            :class="isActive(item.path) ? 'active' : ''"
          >
            <a @click="pageTo(item.path || '/')">{{ item.meta.title }}</a>
            <ul class="p-2">
              <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <a @click="pageTo(subItem.path || '/')">{{ subItem.meta.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl normal-case font-bold">{{ name.toUpperCase() }}</a>
    </div>
    <!-- pc端布局 -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li
          v-for="(item, index) in routesList"
          :key="index"
          :class="isActive(item.path) ? 'active' : ''"
        >
          <a @click="pageTo(item.path || '/')" v-if="!item.children">{{
            item.meta.title
          }}</a>
          <details v-else>
            <summary tabindex="0" role="button">{{ item.meta.title }}</summary>
            <ul tabindex="0" class="p-2 w-40">
              <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <a @click="pageTo(subItem.path || '/')">{{ subItem.meta.title }}</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <!-- 控制主题 -->
      <ThemeBtn></ThemeBtn>
      <!-- 控制语言 -->
      <LanguageBtn></LanguageBtn>
      <!-- 个人信息 -->
      <MineBtn></MineBtn>
    </div>
  </div>
</template>

<style scoped></style>
