<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { name } from "../../../../package.json";
import router, { routesList } from "@/router/index.js";

import LanguageBtn from "./modules/LanguageBtn.vue";
import ThemeBtn from "./modules/ThemeBtn.vue";
import MineBtn from "./modules/MineBtn.vue";

const dropdownRef = ref(null)

// 设置语言

// 判断当前路由是否是当前页面
const isActive = (path) => {
  const currentPath = router.currentRoute.value.path;
  // 如果当前选中的路径和当前路由的路径相同，则返回true
  if (currentPath === path) {
    return true;
  }
  // 如果查找路径在路由列表中，则返回false(因为是一级路由，不需要判断二级路由)
  if (~routesList.findIndex((item) => item.path === currentPath) || path == "/") {
    return false;
  }
  // 如果当前路由的路径不在路由列表中，则过滤包含二级路由的选项
  const parentRoutes = routesList.filter((route) => route.children);
  // 循环父路由
  for (const parentRoute of parentRoutes) {
    // 只过滤有path的二级路由
    const childPaths = parentRoute.children.map((child) => child.path) || [];
    const currentPathIndex = childPaths.indexOf(currentPath);
    if (~currentPathIndex) {
      return parentRoute.path === path;
    }
  }
  return false;
};

// 判断子路由是否是当前页面
const childrenIsActive = (path) => {
  const currentPath = router.currentRoute.value.path;
  return currentPath === path;
};

// 跳转页面
const pageTo = (to) => {
  router.push({ path: to });
};

// 处理菜单点击
const handleMenuClick = (path) => {
  router.push({ path });
  // 关闭下拉菜单
  const dropdown = dropdownRef.value?.querySelector('.dropdown-content');
  if (dropdown) {
    dropdown.style.display = 'none';
    setTimeout(() => {
      dropdown.style.display = '';
    }, 100);
  }
};

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    const dropdown = dropdownRef.value.querySelector('.dropdown-content');
    if (dropdown) {
      dropdown.style.display = 'none';
      setTimeout(() => {
        dropdown.style.display = '';
      }, 100);
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div
    class="navbar bg-base-100 text-base-content flex w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm"
  >
    <!-- 移动端布局 -->
    <div class="navbar-start">
      <div class="dropdown" ref="dropdownRef">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
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
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            v-for="(item, index) in routesList"
            :key="index"
            :class="isActive(item.path) ? 'text-primary' : ''"
          >
            <a @click="handleMenuClick(item.path || '/')">{{ item.meta.title }}</a>
            <ul v-if="item.children?.length" class="p-2">
              <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <a @click="handleMenuClick(subItem.path || '/')">{{ subItem.meta.title }}</a>
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
          :class="isActive(item.path) ? 'text-primary' : ''"
        >
          <a @click="pageTo(item.path || '/')" v-if="!item.children">{{ item.meta.title }}</a>
          <details v-else>
            <summary tabindex="0" role="button">{{ item.meta.title }}</summary>
            <ul tabindex="0" class="p-2 w-40">
              <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <a
                  :class="
                    childrenIsActive(subItem.path) ? 'text-primary' : 'text-base-content'
                  "
                  @click="pageTo(subItem.path || '/')"
                  >{{ subItem.meta.title }}</a
                >
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
