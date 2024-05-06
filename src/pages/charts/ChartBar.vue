<template>
  <div>
    <BarView title="简单柱状图" :xData="xData" :yData="yData"></BarView>
    <div class="btn" @click="addData">添加一个数据</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const xData = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
const yData = ref([150, 230, 224, 218, 135, 147, 260]);
const addXData = () => {
  // 随机生成一个字符串
  const randomStr = Math.random().toString(36).substring(2, 7);
  xData.value.push(randomStr);
};
const addYData = () => {
  // 随机生成一个数字
  const randomNum = Math.floor(Math.random() * 1000);
  yData.value.push(randomNum);
};
const addData = () => {
  addXData();
  addYData();
};
</script>
