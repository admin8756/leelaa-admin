<script setup>
import { THEME_LIST, THEME_DEFAULT } from "../../../../../enums/theme.js";
import { themeChange } from "theme-change";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import DropdownView from "@/components/DropdownView.vue";
const { t } = useI18n();
// 传入主题名，返回style对象
const getThemeStyle = (themeName) => {
  const themeDetail = THEME_DEFAULT[themeName];
  if (!themeDetail) {
    return {};
  } else {
    return {
      background: themeDetail["base-100"],
      color: themeDetail["color-scheme"] === "light" ? "#000" : "#fff",
      borderRadius: themeDetail["--rounded-btn"] || "0px",
    };
  }
};
// 获取主题颜色
const getThemeColor = (themeName) => {
  const themeDetail = THEME_DEFAULT[themeName];
  if (!themeDetail) {
    return [];
  } else {
    const { accent, primary, warning, neutral } = themeDetail;
    return [accent, primary, warning, neutral];
  }
};
// 获取当前主题
const nowTheme = ref(localStorage.getItem("theme") || "light");
const saveTheme = (themeName) => {
  themeChange(themeName);
  nowTheme.value = themeName;
};
</script>
<template>
  <DropdownView :list="THEME_LIST" :title="t('nav-bar.tab-theme')">
    <template #default="{ item }">
      <button
        class="outline-base-content text-start flex items-center outline-offset-4 btn glass mt-2"
        :style="getThemeStyle(item)"
        data-choose-theme
        data-key="theme"
        :data-set-theme="item"
        @click="saveTheme(item)"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <svg
              v-if="item === nowTheme"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <p class="ml-1">{{ item }}</p>
          </div>
          <div class="flex">
            <span
              class="w-3 h-3 bg-red-500 rounded-full mr-1"
              v-for="(color, idx) in getThemeColor(item)"
              :key="idx"
              :style="{ 'background-color': color }"
            ></span>
          </div>
        </div>
      </button>
    </template>
  </DropdownView>
</template>
