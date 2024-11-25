<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
  <slot />
</template>

<script setup>
import { inject, onMounted, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'left'
  },
  index: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  },
  formatter: {
    type: Function,
    default: null
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const updateAxis = () => {
  if (!options) return

  // 确保 yAxis 是数组
  if (!Array.isArray(options.yAxis)) {
    options.yAxis = [options.yAxis]
  }

  // 创建或更新指定索引的坐标轴
  const axisConfig = {
    type: 'value',
    name: props.name,
    position: props.position,
    axisLabel: {}
  }

  if (props.min !== null) {
    axisConfig.min = props.min
  }

  if (props.max !== null) {
    axisConfig.max = props.max
  }

  if (props.formatter) {
    axisConfig.axisLabel.formatter = props.formatter
  }

  if (options.yAxis[props.index]) {
    Object.assign(options.yAxis[props.index], axisConfig)
  } else {
    options.yAxis[props.index] = axisConfig
  }

  if (chartInstance.value) {
    const newOptions = {
      yAxis: options.yAxis
    }
    chartInstance.value.setOption(newOptions)
  }
}

onMounted(() => {
  updateAxis()
})

watch([
  () => props.name,
  () => props.position,
  () => props.min,
  () => props.max,
  () => props.formatter
], () => {
  updateAxis()
}, { deep: true })
</script>
