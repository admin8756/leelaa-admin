<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useECharts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  color: {
    type: String,
    default: '#71717A'
  }
})

const chartRef = ref(null)
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

const updateChart = () => {
  // 确保数据是有效的数组
  const chartData = Array.isArray(props.data) ? props.data : [];
  
  const option = {
    animation: false,
    grid: {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2
    },
    xAxis: {
      type: 'category',
      show: false,
      data: Array.from({ length: chartData.length }, (_, i) => i + 1)
    },
    yAxis: {
      type: 'value',
      show: false,
      inverse: true,
      min: 1,
      max: 5
    },
    series: [
      {
        data: chartData,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: props.color,
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: props.color + '40' // 40% 透明度
            }, {
              offset: 1,
              color: props.color + '00' // 完全透明
            }]
          }
        }
      }
    ]
  };

  updateOptions(option);
};

// 监听数据变化
watch(() => [props.data, props.color], updateChart, { deep: true, immediate: true })

onMounted(() => {
  initChart()
  updateChart()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  dispose()
})
</script>
