<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">资源趋势</h2>
      <div class="h-64">
        <div ref="chartRef" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useECharts.js'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

const updateChart = () => {
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
      data: ['灵石', '丹药', '法器', '符箓'],
      top: '5%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.data.map(item => item.date)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '灵石',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.spiritStone)
      },
      {
        name: '丹药',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.elixir)
      },
      {
        name: '法器',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.magicWeapon)
      },
      {
        name: '符箓',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.talisman)
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
