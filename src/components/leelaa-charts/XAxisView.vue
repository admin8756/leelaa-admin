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
  }
})

const options = inject('chartOptions')
const chartInstance = inject('chartInstance')

const updateAxis = () => {
  if (!options || !Array.isArray(props.data)) return

  options.xAxis.data = props.data

  if (chartInstance.value) {
    const newOptions = {
      xAxis: options.xAxis
    }
    chartInstance.value.setOption(newOptions)
  }
}

onMounted(() => {
  updateAxis()
})

watch(() => props.data, () => {
  updateAxis()
}, { deep: true })
</script>
