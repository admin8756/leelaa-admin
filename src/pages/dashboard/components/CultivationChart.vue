<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">修为分布</h2>
      <div class="h-64">
        <div ref="chartRef" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@hooks/useECharts.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

const updateChart = () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: props.data.practitioner || 0, name: '练气期' },
          { value: props.data.foundation || 0, name: '筑基期' },
          { value: props.data.coreFormation || 0, name: '结丹期' },
          { value: props.data.nascent || 0, name: '元婴期' },
          { value: props.data.integration || 0, name: '化神期' }
        ]
      }
    ]
  }
  
  updateOptions(option)
}

// 监听数据变化
watch(() => props.data, updateChart, { deep: true, immediate: true })

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
