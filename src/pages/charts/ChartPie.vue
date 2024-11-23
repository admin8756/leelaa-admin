<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>宗门资源分布</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="resourceType">
            <option value="all">全部资源</option>
            <option value="elixir">丹药</option>
            <option value="weapon">法器</option>
            <option value="material">材料</option>
          </select>
          <button class="btn btn-sm btn-outline" @click="refreshData">
            <Icon icon="mdi:refresh" />
          </button>
        </div>
      </h2>
      
      <!-- 图表容器 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div ref="mainChartRef" class="w-full h-[400px]"></div>
        <div ref="subChartRef" class="w-full h-[400px]"></div>
      </div>
      
      <!-- 统计信息 -->
      <div class="stats shadow mt-4">
        <div class="stat">
          <div class="stat-title">总资源数</div>
          <div class="stat-value">{{ totalResources }}</div>
          <div class="stat-desc">较上月 +{{ monthGrowth }}%</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">最多资源</div>
          <div class="stat-value text-primary">{{ mostResource }}</div>
          <div class="stat-desc">占比 {{ mostPercentage }}%</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">最少资源</div>
          <div class="stat-value text-secondary">{{ leastResource }}</div>
          <div class="stat-desc">占比 {{ leastPercentage }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'

// 数据
const resourceType = ref('all')
const mainChartRef = ref(null)
const subChartRef = ref(null)
let mainChart = null
let subChart = null

// 统计数据
const totalResources = ref(0)
const monthGrowth = ref(0)
const mostResource = ref('')
const mostPercentage = ref(0)
const leastResource = ref('')
const leastPercentage = ref(0)

// 生成模拟数据
const generateData = () => {
  const resources = {
    elixir: [
      { name: '培元丹', value: Math.floor(Math.random() * 1000) },
      { name: '筑基丹', value: Math.floor(Math.random() * 1000) },
      { name: '金元丹', value: Math.floor(Math.random() * 1000) },
      { name: '玄阳丹', value: Math.floor(Math.random() * 1000) },
    ],
    weapon: [
      { name: '飞剑', value: Math.floor(Math.random() * 1000) },
      { name: '法印', value: Math.floor(Math.random() * 1000) },
      { name: '灵符', value: Math.floor(Math.random() * 1000) },
      { name: '阵盘', value: Math.floor(Math.random() * 1000) },
    ],
    material: [
      { name: '灵石', value: Math.floor(Math.random() * 1000) },
      { name: '灵草', value: Math.floor(Math.random() * 1000) },
      { name: '灵木', value: Math.floor(Math.random() * 1000) },
      { name: '灵铁', value: Math.floor(Math.random() * 1000) },
    ]
  }
  
  // 更新统计数据
  const allResources = [...resources.elixir, ...resources.weapon, ...resources.material]
  totalResources.value = allResources.reduce((sum, item) => sum + item.value, 0)
  monthGrowth.value = Math.floor(Math.random() * 30)
  
  const sortedResources = [...allResources].sort((a, b) => b.value - a.value)
  mostResource.value = sortedResources[0].name
  mostPercentage.value = Math.floor(sortedResources[0].value / totalResources.value * 100)
  leastResource.value = sortedResources[sortedResources.length - 1].name
  leastPercentage.value = Math.floor(sortedResources[sortedResources.length - 1].value / totalResources.value * 100)
  
  return resources
}

// 初始化图表
const initCharts = () => {
  mainChart = echarts.init(mainChartRef.value)
  subChart = echarts.init(subChartRef.value)
  updateCharts()
}

// 更新图表
const updateCharts = () => {
  const data = generateData()
  
  // 主图表配置
  const mainOption = {
    title: {
      text: '资源类型分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { name: '丹药', value: data.elixir.reduce((sum, item) => sum + item.value, 0) },
          { name: '法器', value: data.weapon.reduce((sum, item) => sum + item.value, 0) },
          { name: '材料', value: data.material.reduce((sum, item) => sum + item.value, 0) }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  
  // 子图表配置
  const subOption = {
    title: {
      text: resourceType.value === 'all' ? '详细分布' : 
            resourceType.value === 'elixir' ? '丹药分布' :
            resourceType.value === 'weapon' ? '法器分布' : '材料分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
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
        data: resourceType.value === 'all' ? 
              [...data.elixir, ...data.weapon, ...data.material] :
              data[resourceType.value]
      }
    ]
  }
  
  mainChart?.setOption(mainOption)
  subChart?.setOption(subOption)
}

// 刷新数据
const refreshData = () => {
  updateCharts()
}

// 监听数据变化
watch(resourceType, () => {
  updateCharts()
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  mainChart?.resize()
  subChart?.resize()
})

onMounted(() => {
  initCharts()
})
</script>
