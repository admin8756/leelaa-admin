<template>
  <div class="chart-bar" ref="chartBar" :style="style"></div>
</template>
<script setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ref, onMounted, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { watchThrottled } from "@vueuse/core";
const chartBar = ref(null);
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

onMounted(() => {
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
  const window = computed(() => {
    const { width, height } = useWindowSize();
    return width.value * height.value;
  });
  echarts.use([GridComponent, BarChart, CanvasRenderer, TitleComponent]);
  const myChart = echarts.init(chartBar.value);
  myChart.setOption(option);

  watchThrottled(
    window,
    () => {
      myChart.resize();
    },
    { throttle: 800 }
  );
});
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
