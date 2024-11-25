<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
  <slot />
</template>

<script setup>
import { inject, onMounted, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stack: {
    type: String,
    default: ''
  },
  barWidth: {
    type: [Number, String],
    default: 'auto'
  },
  barGap: {
    type: String,
    default: '30%'
  },
  itemStyle: {
    type: Object,
    default: () => ({})
  },
  emphasis: {
    type: Object,
    default: () => ({
      focus: 'series'
    })
  },
  label: {
    type: Object,
    default: () => ({
      show: false,
      position: 'top'
    })
  },
  yAxisIndex: {
    type: Number,
    default: 0
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const updateSeries = () => {
  if (!options || !Array.isArray(props.data)) return

  // 确保 series 数组存在
  if (!Array.isArray(options.series)) {
    options.series = []
  }

  // 查找现有的系列或创建新的
  let seriesIndex = options.series.findIndex(s => s.name === props.name)
  const seriesConfig = {
    type: 'bar',
    name: props.name,
    data: props.data,
    stack: props.stack,
    barWidth: props.barWidth,
    barGap: props.barGap,
    itemStyle: props.itemStyle,
    emphasis: props.emphasis,
    label: props.label,
    yAxisIndex: props.yAxisIndex
  }

  if (seriesIndex === -1) {
    // 添加新系列
    options.series.push(seriesConfig)
  } else {
    // 更新现有系列
    options.series[seriesIndex] = seriesConfig
  }

  // 立即更新图表
  if (chartInstance.value) {
    const newOptions = {
      series: options.series
    }
    chartInstance.value.setOption(newOptions)
  }
}

onMounted(() => {
  updateSeries()
})

// 监听所有配置变化
watch([
  () => props.data,
  () => props.name,
  () => props.stack,
  () => props.barWidth,
  () => props.barGap,
  () => props.itemStyle,
  () => props.emphasis,
  () => props.label,
  () => props.yAxisIndex
], () => {
  updateSeries()
}, { deep: true })
</script>
