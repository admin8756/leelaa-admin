<template>
  <div class="charts-view"></div>
</template>

<script setup>
import { useSlots, useAttrs, inject, watch } from "vue";

const chartsUpdate = inject("chartsUpdate");
console.log(chartsUpdate);
watch(() => {
  console.log("chartsUpdate", chartsUpdate);
  chartsUpdate();
});
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
