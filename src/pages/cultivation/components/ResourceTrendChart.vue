<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      dates: [],
      spirit: [],
      elixir: [],
      talisman: []
    })
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['灵石', '丹药', '符箓'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.data.dates
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '消耗量'
      }
    ],
    series: [
      {
        name: '灵石',
        type: 'line',
        stack: '总量',
        areaStyle: {
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        data: props.data.spirit,
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: '#f1c40f'
        }
      },
      {
        name: '丹药',
        type: 'line',
        stack: '总量',
        areaStyle: {
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        data: props.data.elixir,
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: '#e74c3c'
        }
      },
      {
        name: '符箓',
        type: 'line',
        stack: '总量',
        areaStyle: {
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        data: props.data.talisman,
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: '#3498db'
        }
      }
    ]
  }

  chart = echarts.init(chartRef.value)
  chart.setOption(option)
}

const updateChart = () => {
  chart?.setOption({
    xAxis: [
      {
        data: props.data.dates
      }
    ],
    series: [
      {
        data: props.data.spirit
      },
      {
        data: props.data.elixir
      },
      {
        data: props.data.talisman
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
