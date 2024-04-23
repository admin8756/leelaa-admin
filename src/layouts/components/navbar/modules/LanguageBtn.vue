<script setup>
import { useI18n } from 'vue-i18n';
const { messages, t, locale } = useI18n();
const setLanguage = (lang) => {
  locale.value = lang;
};
</script>
<template>
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
</template>
