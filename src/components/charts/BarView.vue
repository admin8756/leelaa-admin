<template>
  <div class="chart-bar" ref="chartBar" :style="style"></div>
</template>
<script setup>
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent, TitleComponent } from "echarts/components";
import { ref, onMounted, computed, watch, provide } from "vue";
import { useWindowSize, watchThrottled } from "@vueuse/core";
const chartBar = ref(null);
let myChart = "";
const props = defineProps({
  // x轴数据
  xData: {
    type: Object,
    default: () => {},
  },
  // 数据
  yData: {
    type: Object,
    default: () => {},
  },
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 样式
  style: {
    type: Object,
    default: () => {},
  },
  // 颜色
  color: {
    type: String,
    default: "",
  },
});
// 更新图表
const updateChart = () => {
  const option = {
    title: {
      text: props.title,
    },
    xAxis: {
      type: "category",
      data: props.xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: props.yData,
        type: "bar",
      },
    ],
  };
  provide("chartsUpdate", option);
  myChart.setOption(option);
};
// 组件加载
onMounted(() => {
  const window = computed(() => {
    const { width, height } = useWindowSize();
    return width.value * height.value;
  });
  echarts.use([GridComponent, BarChart, CanvasRenderer, TitleComponent]);
  myChart = echarts.init(chartBar.value);
  updateChart();

  watchThrottled(
    window,
    () => {
      myChart.resize();
    },
    { throttle: 800 }
  );
});

// 监听数据发生变化

watch(
  [props.xData, props.yData],
  () => {
    updateChart();
  },
  { deep: true }
);
</script>

<style scoped>
.chart-bar {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
