<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useECharts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: '#71717A'
  }
})

const chartRef = ref(null)
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

const updateChart = () => {
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
      data: Array.from({ length: props.data.length }, (_, i) => i + 1)
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
        data: props.data,
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
  }
  
  updateOptions(option)
}

watch(() => [props.data, props.color], updateChart, { deep: true })

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
