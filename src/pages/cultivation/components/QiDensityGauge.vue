<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.3, '#e74c3c'],
              [0.7, '#f1c40f'],
              [1, '#2ecc71']
            ]
          }
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, 0],
          itemStyle: {
            color: '#1a1a1a'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 3
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 14,
          distance: -50,
          formatter: function (value) {
            if (value === 0 || value === 50 || value === 100) {
              return value + '%'
            }
            return ''
          }
        },
        title: {
          offsetCenter: [0, '20%'],
          fontSize: 16,
          color: '#464646'
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '50%'],
          valueAnimation: true,
          color: '#1a1a1a',
          formatter: function (value) {
            return value.toFixed(1) + '%'
          }
        },
        data: [
          {
            value: props.value,
            name: '灵气浓度'
          }
        ]
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
        data: [
          {
            value: props.value
          }
        ]
      }
    ]
  })
}

watch(() => props.value, updateChart)

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', () => chart?.resize())
})
</script>
