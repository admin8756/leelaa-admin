<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
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
  smooth: {
    type: Boolean,
    default: true
  },
  showSymbol: {
    type: Boolean,
    default: true
  },
  symbolSize: {
    type: Number,
    default: 6
  },
  lineStyle: {
    type: Object,
    default: () => ({
      width: 2
    })
  },
  itemStyle: {
    type: Object,
    default: () => ({})
  },
  areaStyle: {
    type: Object,
    default: null
  },
  emphasis: {
    type: Object,
    default: () => ({
      focus: 'series'
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
    type: 'line',
    name: props.name,
    data: props.data,
    smooth: props.smooth,
    showSymbol: props.showSymbol,
    symbolSize: props.symbolSize,
    lineStyle: props.lineStyle,
    itemStyle: props.itemStyle,
    emphasis: props.emphasis,
    yAxisIndex: props.yAxisIndex
  }

  if (props.areaStyle) {
    seriesConfig.areaStyle = props.areaStyle
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
  () => props.smooth,
  () => props.showSymbol,
  () => props.symbolSize,
  () => props.lineStyle,
  () => props.itemStyle,
  () => props.areaStyle,
  () => props.emphasis,
  () => props.yAxisIndex
], () => {
  updateSeries()
}, { deep: true })
</script>
