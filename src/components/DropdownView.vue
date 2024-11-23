// 下拉菜单
<script setup>
import { computed } from "vue";
const props = defineProps({
  // 下拉的列表
  list: {
    type: Array,
    default: () => [],
  },
  //  标题
  title: { type: String, default: "" },
  //   弹框的位置
  position: { type: String, default: "end" },
  // 打开方式
  openType: { type: String, default: "click" },
});
// 计算属性
const hover = computed(() => props.openType === "hover");
</script>
<template>
  <!-- <div class="dropdown dropdown-end" :class="{ 'dropdown-open': show }" @click="tabState"> -->
  <div class="dropdown dropdown-end" :class="{ 'dropdown-hover': hover }">
    <slot name="title" tabindex="0"></slot>
    <div v-if="title" tabindex="0" role="button" class="btn m-1">{{ title }}</div>
    <ul
      tabindex="0"
      class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 menu menu-sm gap-1 z-[999]"
    >
      <li v-for="(item, index) in list" :key="index">
        <slot :item="item"></slot>
      </li>
    </ul>
  </div>
</template>
