<template>
  <div class="charts-view"></div>
</template>

<script setup>
import { useSlots, useAttrs } from "vue";

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
