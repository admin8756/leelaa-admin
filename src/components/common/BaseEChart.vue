<template>
  <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { xianxiaLight } from '@/enums'

echarts.registerTheme('xianxia-light', xianxiaLight)

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  theme: {
    type: String,
    default: 'xianxia-light'
  },
  height: {
    type: String,
    default: '300px'
  },
  width: {
    type: String,
    default: '100%'
  }
})

const emit = defineEmits(['chartReady'])
const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value, props.theme)
  chart.setOption(props.options)
  emit('chartReady', chart)
}

const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.options,
  (newVal) => {
    chart?.setOption(newVal)
  },
  { deep: true }
)
</script>
