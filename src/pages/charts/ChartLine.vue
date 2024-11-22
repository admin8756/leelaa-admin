<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>修为变化趋势</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="timeRange">
            <option value="week">近一周</option>
            <option value="month">近一月</option>
            <option value="year">近一年</option>
          </select>
          <select class="select select-sm select-bordered" v-model="dataType">
            <option value="power">灵力值</option>
            <option value="exp">修为值</option>
            <option value="both">双重对比</option>
          </select>
        </div>
      </h2>
      
      <!-- 图表容器 -->
      <div ref="chartRef" class="w-full h-[500px]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

// 数据
const timeRange = ref('week')
const dataType = ref('both')
const chartRef = ref(null)
let chart = null

// 生成日期数组
const generateDates = (range) => {
  const dates = []
  const now = new Date()
  const days = range === 'week' ? 7 : range === 'month' ? 30 : 365
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    dates.push(date.toLocaleDateString())
  }
  
  return dates
}

// 生成模拟数据
const generateData = (baseValue, volatility) => {
  const data = []
  let value = baseValue
  
  for (let i = 0; i < (timeRange.value === 'week' ? 7 : timeRange.value === 'month' ? 30 : 365); i++) {
    value = value + (Math.random() - 0.5) * volatility
    data.push(Math.floor(value))
  }
  
  return data
}

// 初始化图表
const initChart = () => {
  const chartDom = chartRef.value
  chart = echarts.init(chartDom)
  updateChart()
}

// 更新图表
const updateChart = () => {
  const dates = generateDates(timeRange.value)
  const powerData = generateData(1000, 100)
  const expData = generateData(800, 50)
  
  const series = []
  if (dataType.value === 'power' || dataType.value === 'both') {
    series.push({
      name: '灵力值',
      type: 'line',
      data: powerData,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2
      },
      itemStyle: {
        color: '#5470c6'
      },
      areaStyle: {
        opacity: 0.1
      }
    })
  }
  if (dataType.value === 'exp' || dataType.value === 'both') {
    series.push({
      name: '修为值',
      type: 'line',
      data: expData,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2
      },
      itemStyle: {
        color: '#91cc75'
      },
      areaStyle: {
        opacity: 0.1
      }
    })
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['灵力值', '修为值'],
      right: 10,
      top: 4
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
      data: dates,
      axisLabel: {
        interval: Math.floor(dates.length / 6),
        formatter: (value) => {
          return value.split('/').slice(1).join('/')
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '数值',
      nameTextStyle: {
        padding: [0, 0, 0, 40]
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series
  }
  
  chart?.setOption(option)
}

// 监听数据变化
watch([timeRange, dataType], () => {
  updateChart()
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  chart?.resize()
})

onMounted(() => {
  initChart()
})
</script>
