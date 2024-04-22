<script setup>
import { name } from '../../../package.json';
import router, { routesList } from '@/router/index.js';
import { THEME_LIST } from '../../../enums/theme.js';
import { themeChange } from 'theme-change';
// 引入i18n
import { useI18n } from 'vue-i18n';
const { locale, messages, t } = useI18n();
// 设置语言
const setLanguage = (lang) => {
  locale.value = lang;
};
// 判断当前路由是否是当前页面
const isActive = (path) => {
  return router.currentRoute.value.path === path;
};
// 跳转页面
const pageTo = (to) => {
  router.push({ path: to });
};
// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  router.replace({ path: '/login' });
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
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="(item, index) in routesList" :key="index" :class="isActive(item.path) ? 'active' : ''">
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
        <li v-for="(item, index) in routesList" :key="index" :class="isActive(item.path) ? 'active' : ''">
          <a @click="pageTo(item.path || '/')" v-if="!item.children">{{ item.meta.title }}</a>
          <details v-else>
            <summary>{{ item.meta.title }}</summary>
            <ul class="p-2 w-40">
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
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1">{{ t('nav-bar.tab-theme') }}</div>
        <div
          class="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
        >
          <div class="grid grid-cols-1 gap-3 p-3">
            <button
              class="outline-base-content text-start outline-offset-4 btn glass"
              v-for="theme in THEME_LIST"
              :key="theme"
              data-choose-theme
              data-key="theme"
              :data-set-theme="theme"
              @click="themeChange(theme)"
            >
              {{ theme }}
            </button>
          </div>
        </div>
      </div>
      <!-- 控制语言 -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1">{{ t('nav-bar.tab-lang') }}</div>
        <div
          tabindex="0"
          class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5"
        >
          <ul class="menu menu-sm gap-1">
            <li v-for="(_, index) in messages" :key="index">
              <button class="btn glass" @click="setLanguage(index)">
                <span
                  class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                ></span>
                <span class="font-[sans-serif]"> {{ index }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              个人主页
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>设置</a></li>
          <li><a @click="logout">退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply text-primary;
}
</style>
