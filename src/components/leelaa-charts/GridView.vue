<template>
  <!-- 这是一个虚拟组件，不会渲染实际的DOM -->
  <slot />
</template>

<script setup>
import { inject, onMounted, watch } from 'vue'

const props = defineProps({
  containLabel: {
    type: Boolean,
    default: true
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const updateGrid = () => {
  if (!options) return

  options.grid.containLabel = props.containLabel

  if (chartInstance.value) {
    const newOptions = {
      grid: options.grid
    }
    chartInstance.value.setOption(newOptions)
  }
}

onMounted(() => {
  updateGrid()
})

watch(() => props.containLabel, () => {
  updateGrid()
})
</script>
