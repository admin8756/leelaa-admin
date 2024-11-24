<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useECharts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  indicators: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: '#71717A'
  }
})

const chartRef = ref(null)
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

const updateChart = () => {
  const option = {
    radar: {
      indicator: props.indicators,
      splitNumber: 5,
      radius: '65%',
      axisName: {
        color: '#71717A',
        fontSize: 12,
        padding: [3, 5]
      },
      splitLine: {
        lineStyle: {
          color: ['#E4E4E7', '#A1A1AA', '#71717A'].reverse(),
          opacity: 0.5
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#71717A',
          opacity: 0.5
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: props.data,
            name: '综合评分',
            symbolSize: 6,
            lineStyle: {
              color: props.color,
              width: 2
            },
            areaStyle: {
              color: props.color + '40'
            }
          }
        ]
      }
    ]
  }
  
  updateOptions(option)
}

watch(() => [props.data, props.indicators, props.color], updateChart, { deep: true })

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
