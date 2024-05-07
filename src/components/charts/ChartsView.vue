<template>
  <div class="charts-view"><slot></slot></div>
</template>

<script setup>
import { useSlots, useAttrs, inject, watchEffect } from "vue";

const chartsUpdate = inject(
  "chartsUpdate",
  (msg) => {
    console.log(msg);
  },
  true
);
console.log(chartsUpdate);
watchEffect(
  () => chartsUpdate,
  () => {
    console.log(chartsUpdate);
  }
);
const slots = useSlots();
const attrs = useAttrs();
console.log(slots.default(), attrs);
const slotsList = slots.default();
slotsList.forEach((item) => {
  console.log(item.props);
  console.log(item.type.__name);
});
// 更新的方法
</script>
