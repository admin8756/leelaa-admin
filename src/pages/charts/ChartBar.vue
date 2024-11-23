<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>灵气分布图</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="timeRange">
            <option value="day">今日</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="year">本年</option>
          </select>
          <select class="select select-sm select-bordered" v-model="location">
            <option value="all">全部区域</option>
            <option value="inner">内门</option>
            <option value="outer">外门</option>
            <option value="secret">密地</option>
          </select>
        </div>
      </h2>
      
      <!-- 图表容器 -->
      <div ref="chartRef" class="w-full h-[500px]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useECharts } from '@/hooks/useECharts'

// 数据
const timeRange = ref('day')
const location = ref('all')
const chartRef = ref(null)

// 模拟数据
const generateData = () => {
  const areas = ['藏经阁', '丹房', '练功房', '灵田', '炼器室', '传功殿', '聚灵阵']
  return areas.map(area => ({
    name: area,
    value: Math.floor(Math.random() * 1000),
  }))
}

// 获取图表配置
const getChartOptions = () => {
  const data = generateData()
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: '灵气浓度'
    },
    series: [
      {
        name: '灵气浓度',
        type: 'bar',
        data: data.map(item => item.value)
      }
    ]
  }
}

// 使用 ECharts hook
const { initChart, updateOptions, resize, dispose } = useECharts(chartRef)

// 更新图表
const updateChart = () => {
  updateOptions(getChartOptions())
}

// 监听数据变化
watch([timeRange, location], () => {
  updateChart()
})

// 监听窗口大小变化
window.addEventListener('resize', resize)

onMounted(() => {
  initChart()
  updateChart()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  dispose()
})
</script>
