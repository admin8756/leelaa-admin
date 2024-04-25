<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const locList = [
  {
    code: 'EN',
    lang: 'English',
    loc: 'en',
  },
  {
    code: 'ZH',
    lang: '中文',
    loc: 'zh-CN',
  },
];
const setLanguage = (lang) => {
  locale.value = lang;
};
</script>
<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">{{ t('nav-bar.tab-lang') }}</div>
    <div
      tabindex="0"
      class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5"
    >
      <ul class="menu menu-sm gap-1">
        <li v-for="(locale, index) in locList" :key="index">
          <button class="btn glass flex justify-between w-full" @click="setLanguage(locale.loc)">
            <span
              class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
              :class="{ 'badge-primary': index === locale }"
            >
              {{ locale.code }}
            </span>
            <span class="font-[sans-serif]">{{ locale.lang }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
