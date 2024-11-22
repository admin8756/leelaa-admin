<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">资源趋势</h2>
      <div class="h-64">
        <!-- 使用echarts绘制折线图 -->
        <div ref="chartRef" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import echartsTheme from '@enums/echarts.theme.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  echarts.registerTheme('custom', echartsTheme)
  chart = echarts.init(chartRef.value, 'custom')
  updateChart()
}

const updateChart = () => {
  if (!chart) return
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['灵石', '丹药', '法器']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.dates || []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '灵石',
        type: 'line',
        data: props.data.spiritStones || []
      },
      {
        name: '丹药',
        type: 'line',
        data: props.data.pills || []
      },
      {
        name: '法器',
        type: 'line',
        data: props.data.artifacts || []
      }
    ]
  }
  
  chart.setOption(option)
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chart?.resize()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    chart?.resize()
  })
  if (chart) {
    chart.dispose()
    chart = null
  }
})
</script>
