<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
  <slot :params="[]" />
</template>

<script setup>
import { inject, onMounted, watch, useSlots } from 'vue'

const props = defineProps({
  trigger: {
    type: String,
    default: 'axis'
  },
  className: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.9)'
  },
  textStyle: {
    type: Object,
    default: () => ({
      color: '#333'
    })
  },
  extraCssText: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  },
  axisPointer: {
    type: Object,
    default: () => ({
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    })
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const slots = useSlots()

const updateTooltip = () => {
  if (!options) return

  // 确保 tooltip 对象存在
  if (!options.tooltip) {
    options.tooltip = {}
  }

  // 更新 tooltip 配置
  options.tooltip = {
    show: props.show,
    trigger: props.trigger,
    backgroundColor: props.backgroundColor,
    textStyle: props.textStyle,
    className: props.className,
    extraCssText: props.extraCssText,
    axisPointer: props.axisPointer,
    formatter: (params) => {
      if (slots.default) {
        return slots.default({ params })?.[0]?.children || ''
      }
      // 默认格式化
      return params.map(param => 
        `${param.seriesName}: ${param.value}`
      ).join('<br/>')
    }
  }

  // 立即更新图表
  if (chartInstance.value) {
    chartInstance.value.setOption({
      tooltip: options.tooltip
    }, { replaceMerge: ['tooltip'] })
  }
}

onMounted(() => {
  updateTooltip()
})

// 监听所有属性的变化
watch([
  () => props.show,
  () => props.trigger,
  () => props.className,
  () => props.backgroundColor,
  () => props.textStyle,
  () => props.extraCssText,
  () => props.axisPointer
], () => {
  updateTooltip()
}, { deep: true })
</script>
