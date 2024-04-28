<script setup>
import { useI18n } from "vue-i18n";
import DropdownView from "@/components/DropdownView.vue";
const { t, locale } = useI18n();
const locList = [
  {
    code: "EN",
    lang: "English",
    loc: "en",
  },
  {
    code: "ZH",
    lang: "中文",
    loc: "zh-CN",
  },
];
const setLanguage = (lang) => {
  locale.value = lang;
};
</script>
<template>
  <DropdownView :list="locList" :title="t('nav-bar.tab-lang')">
    <template #default="{ item }">
      <button
        class="btn glass flex justify-between w-full"
        @click="setLanguage(item.loc)"
      >
        <span
          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
          :class="{ 'badge-primary': item.loc === locale }"
        >
          {{ item.code }}
        </span>
        <span class="font-[sans-serif]">{{ item.lang }}</span>
      </button>
    </template>
  </DropdownView>
</template>
