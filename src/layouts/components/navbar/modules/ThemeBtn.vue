<script setup>
import { THEME_LIST } from '../../../../../enums/theme.js';
import { themeChange } from 'theme-change';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<template>
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
</template>
