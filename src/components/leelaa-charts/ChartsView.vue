<template>
  <div ref="chartRef" class="w-full">
    <div ref="chartContainer" class="w-full h-full"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, reactive } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  height: {
    type: String,
    default: '400px'
  }
})

const chartRef = ref(null)
const chartContainer = ref(null)
const chartInstance = ref(null)

const options = reactive({
  legend: {
    show: true,
    type: 'plain',
    selectedMode: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: '#eee'
      }
    }
  },
  grid: {
    top: 60,
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  series: []
})

provide('chartOptions', options)
provide('chartInstance', chartInstance)

const updateChart = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(options)
  }
}

onMounted(() => {
  if (!chartContainer.value) return

  chartInstance.value = echarts.init(chartContainer.value)
  updateChart()

  const resizeHandler = () => {
    chartInstance.value?.resize()
  }

  window.addEventListener('resize', resizeHandler)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
    chartInstance.value?.dispose()
  })
})
</script>
