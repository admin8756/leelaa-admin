<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
  <slot />
</template>

<script setup>
import { inject, onMounted, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  orient: {
    type: String,
    default: 'horizontal'
  },
  left: {
    type: String,
    default: 'center'
  },
  top: {
    type: String,
    default: '5%'
  },
  textStyle: {
    type: Object,
    default: () => ({})
  },
  itemGap: {
    type: Number,
    default: 10
  },
  selectedMode: {
    type: Boolean,
    default: true
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const updateLegend = () => {
  if (!options) return

  options.legend = {
    show: props.show,
    orient: props.orient,
    left: props.left,
    top: props.top,
    textStyle: props.textStyle,
    itemGap: props.itemGap,
    selectedMode: props.selectedMode
  }

  // 立即更新图表
  if (chartInstance.value) {
    const newOptions = {
      legend: options.legend
    }
    chartInstance.value.setOption(newOptions)
  }
}

onMounted(() => {
  updateLegend()
})

// 监听所有配置变化
watch([
  () => props.show,
  () => props.orient,
  () => props.left,
  () => props.top,
  () => props.textStyle,
  () => props.itemGap,
  () => props.selectedMode
], () => {
  updateLegend()
}, { deep: true })
</script>
