<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
let chart = null

const colors = [
  '#3498db', // 练气期 - 淡蓝色
  '#2ecc71', // 筑基期 - 翠绿色
  '#f1c40f', // 金丹期 - 金黄色
  '#e67e22', // 元婴期 - 橙色
  '#9b59b6', // 化神期 - 紫色
  '#e74c3c'  // 炼虚期 - 红色
]

const initChart = () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
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
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: props.data,
        color: colors
      }
    ]
  }

  chart = echarts.init(chartRef.value)
  chart.setOption(option)
}

const updateChart = () => {
  chart?.setOption({
    series: [
      {
        data: props.data
      }
    ]
  })
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', () => chart?.resize())
})
</script>
