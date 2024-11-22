<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { name } from "../../../../package.json";
import router, { routesList } from "@/router/index.js";

import LanguageBtn from "./modules/LanguageBtn.vue";
import ThemeBtn from "./modules/ThemeBtn.vue";
import MineBtn from "./modules/MineBtn.vue";

const dropdownRef = ref(null)
const openedDetails = ref(null)

// 判断当前路由是否是当前页面
const isActive = (path) => {
  const currentPath = router.currentRoute.value.path;
  if (currentPath === path) {
    return true;
  }
  if (path === '/') {
    return false;
  }
  return currentPath.startsWith(path);
};

// 判断子路由是否是当前页面
const childrenIsActive = (path) => {
  const currentPath = router.currentRoute.value.path;
  return currentPath === path;
};

// 跳转页面
const pageTo = (to) => {
  if (!to) return;
  
  // 规范化路径，移除多余的斜杠
  const normalizedPath = to.replace(/\/+/g, '/');
  
  // 如果是主页，使用replace
  if (normalizedPath === '/') {
    router.replace('/');
  } else {
    router.push(normalizedPath);
  }
};

// 处理菜单点击
const handleMenuClick = (path) => {
  if (!path) return;
  
  // 规范化路径，移除多余的斜杠
  const normalizedPath = path.replace(/\/+/g, '/');
  
  // 如果是主页，使用replace
  if (normalizedPath === '/') {
    router.replace('/');
  } else {
    router.push(normalizedPath);
  }
  
  // 关闭下拉菜单
  const dropdown = dropdownRef.value?.querySelector('.dropdown-content');
  if (dropdown) {
    dropdown.style.display = 'none';
    setTimeout(() => {
      dropdown.removeAttribute('style');
    }, 100);
  }
};

// 处理 details 元素的点击事件
const handleDetailsClick = (event) => {
  const details = event.currentTarget;
  
  // 如果点击的是当前打开的 details，不做处理
  if (details === openedDetails.value) return;
  
  // 关闭之前打开的 details
  if (openedDetails.value && openedDetails.value !== details) {
    openedDetails.value.removeAttribute('open');
  }
  
  // 更新当前打开的 details
  openedDetails.value = details;
};

// 点击外部关闭所有下拉菜单
const handleClickOutside = (event) => {
  // 移动端下拉菜单
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    const dropdown = dropdownRef.value.querySelector('.dropdown-content');
    if (dropdown) {
      dropdown.style.display = 'none';
      setTimeout(() => {
        dropdown.removeAttribute('style');
      }, 100);
    }
  }
  
  // PC端下拉菜单
  if (openedDetails.value && !openedDetails.value.contains(event.target)) {
    openedDetails.value.removeAttribute('open');
    openedDetails.value = null;
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
    class="navbar bg-base-100 text-base-content flex w-full bg-opacity-95 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-lg sticky top-0 z-30"
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
          class="dropdown-content menu menu-sm mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            v-for="(item, index) in routesList"
            :key="index"
            :class="[
              isActive(item.path) ? 'text-primary font-bold' : '',
              'hover:text-primary transition-colors duration-200'
            ]"
          >
            <a v-if="!item.children" @click="handleMenuClick(item.path)">{{ item.meta.title }}</a>
            <template v-else>
              <a @click="item.children[0]?.meta?.isGroup ? null : handleMenuClick(item.path)">
                {{ item.meta.title }}
              </a>
              <ul v-if="item.children?.length" class="p-2">
                <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                  <!-- 如果是分组 -->
                  <li v-if="subItem.meta?.isGroup" class="menu-title">
                    <span>{{ subItem.meta.title }}</span>
                    <ul class="pl-2">
                      <li v-for="(groupItem, groupIndex) in subItem.children" :key="groupIndex">
                        <a 
                          :class="[
                            childrenIsActive(groupItem.path) ? 'text-primary font-bold active' : '',
                            'hover:text-primary transition-colors duration-200'
                          ]"
                          @click="handleMenuClick(groupItem.path)"
                        >
                          {{ groupItem.meta.title }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <!-- 如果不是分组 -->
                  <li v-else>
                    <a 
                      :class="[
                        childrenIsActive(subItem.path) ? 'text-primary font-bold active' : '',
                        'hover:text-primary transition-colors duration-200'
                      ]"
                      @click="handleMenuClick(subItem.path)"
                    >
                      {{ subItem.meta.title }}
                    </a>
                  </li>
                </template>
              </ul>
            </template>
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
          :class="[
            isActive(item.path) ? 'text-primary font-bold' : '',
            'hover:text-primary transition-colors duration-200'
          ]"
        >
          <a v-if="!item.children" @click="pageTo(item.path)">{{ item.meta.title }}</a>
          <details v-else class="dropdown" @click="handleDetailsClick">
            <summary tabindex="0" role="button">{{ item.meta.title }}</summary>
            <ul tabindex="0" class="p-2 bg-base-100 rounded-box w-52 shadow-lg dropdown-content z-[999] menu">
              <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <!-- 如果是分组 -->
                <li v-if="subItem.meta?.isGroup" class="menu-title pt-2 first:pt-0">
                  <span class="text-sm opacity-50">{{ subItem.meta.title }}</span>
                  <ul class="pl-2">
                    <li v-for="(groupItem, groupIndex) in subItem.children" :key="groupIndex">
                      <a 
                        :class="[
                          childrenIsActive(groupItem.path) ? 'text-primary font-bold active' : '',
                          'hover:text-primary transition-colors duration-200'
                        ]"
                        @click="pageTo(groupItem.path)"
                      >
                        {{ groupItem.meta.title }}
                      </a>
                    </li>
                  </ul>
                </li>
                <!-- 如果不是分组 -->
                <li v-else>
                  <a 
                    :class="[
                      childrenIsActive(subItem.path) ? 'text-primary font-bold active' : '',
                      'hover:text-primary transition-colors duration-200'
                    ]"
                    @click="pageTo(subItem.path)"
                  >
                    {{ subItem.meta.title }}
                  </a>
                </li>
              </template>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <LanguageBtn />
      <ThemeBtn />
      <MineBtn />
    </div>
  </div>
</template>

<style scoped></style>
