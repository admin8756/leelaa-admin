<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>灵根分布图谱</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="selectedType">
            <option value="all">全部灵根</option>
            <option value="fire">火灵根</option>
            <option value="water">水灵根</option>
            <option value="wood">木灵根</option>
            <option value="metal">金灵根</option>
            <option value="earth">土灵根</option>
          </select>
          <button class="btn btn-sm btn-outline" @click="refreshData">
            <Icon icon="mdi:refresh" />
          </button>
        </div>
      </h2>
      
      <!-- 图表容器 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div ref="scatterChartRef" class="w-full h-[400px]"></div>
        
        <!-- 详细信息 -->
        <div class="space-y-4">
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">灵根总数</div>
              <div class="stat-value">{{ totalCount }}</div>
              <div class="stat-desc">当前显示</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">平均品质</div>
              <div class="stat-value text-primary">{{ averageQuality }}</div>
              <div class="stat-desc">{{ qualityTrend }}</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">最高品质</div>
              <div class="stat-value text-secondary">{{ highestQuality }}</div>
              <div class="stat-desc">{{ highestName }}</div>
            </div>
          </div>
          
          <!-- 分布详情 -->
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>灵根类型</th>
                  <th>数量</th>
                  <th>占比</th>
                  <th>平均品质</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stat, type) in typeStats" :key="type">
                  <td>{{ type }}</td>
                  <td>{{ stat.count }}</td>
                  <td>{{ ((stat.count / totalCount) * 100).toFixed(1) }}%</td>
                  <td>{{ stat.avgQuality.toFixed(1) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'

// 数据
const selectedType = ref('all')
const scatterChartRef = ref(null)
let scatterChart = null

// 模拟数据生成
const generateData = (type = 'all') => {
  const types = ['fire', 'water', 'wood', 'metal', 'earth']
  const data = []
  
  // 为每种类型生成数据
  types.forEach((elementType) => {
    if (type === 'all' || type === elementType) {
      const count = 20 + Math.floor(Math.random() * 30)
      for (let i = 0; i < count; i++) {
        data.push({
          type: elementType,
          name: `${elementType}灵根弟子${i + 1}`,
          quality: 40 + Math.random() * 60,
          potential: 30 + Math.random() * 70,
        })
      }
    }
  })
  
  return data
}

// 当前数据
const currentData = ref(generateData())

// 计算属性
const totalCount = computed(() => currentData.value.length)

const averageQuality = computed(() => {
  const avg = currentData.value.reduce((sum, item) => sum + item.quality, 0) / totalCount.value
  return avg.toFixed(1)
})

const qualityTrend = computed(() => {
  const prevAvg = 75 // 模拟上期平均值
  const diff = averageQuality.value - prevAvg
  return diff > 0 ? `↗ 上升${diff.toFixed(1)}` : `↘ 下降${Math.abs(diff).toFixed(1)}`
})

const highestQuality = computed(() => {
  const highest = currentData.value.reduce((max, item) => 
    item.quality > max.quality ? item : max, currentData.value[0])
  return highest.quality.toFixed(1)
})

const highestName = computed(() => {
  const highest = currentData.value.reduce((max, item) => 
    item.quality > max.quality ? item : max, currentData.value[0])
  return highest.name
})

const typeStats = computed(() => {
  return currentData.value.reduce((stats, item) => {
    if (!stats[item.type]) {
      stats[item.type] = { count: 0, totalQuality: 0, avgQuality: 0 }
    }
    stats[item.type].count++
    stats[item.type].totalQuality += item.quality
    stats[item.type].avgQuality = stats[item.type].totalQuality / stats[item.type].count
    return stats
  }, {})
})

// 初始化图表
const initChart = () => {
  const chartDom = scatterChartRef.value
  scatterChart = echarts.init(chartDom)
  updateChart()
}

// 更新图表
const updateChart = () => {
  const colorMap = {
    fire: '#ff4d4f',
    water: '#69c0ff',
    wood: '#95de64',
    metal: '#ffd666',
    earth: '#d4b106'
  }
  
  const option = {
    title: {
      text: '灵根分布图谱'
    },
    legend: {
      data: Object.keys(colorMap).map(type => {
        const typeNames = {
          fire: '火灵根',
          water: '水灵根',
          wood: '木灵根',
          metal: '金灵根',
          earth: '土灵根'
        }
        return typeNames[type]
      })
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `${params.data.name}<br/>
                品质：${params.data.quality.toFixed(1)}<br/>
                潜力：${params.data.potential.toFixed(1)}`
      }
    },
    xAxis: {
      name: '灵根品质',
      type: 'value',
      min: 0,
      max: 100
    },
    yAxis: {
      name: '灵根潜力',
      type: 'value',
      min: 0,
      max: 100
    },
    series: Object.keys(colorMap).map(type => {
      const typeNames = {
        fire: '火灵根',
        water: '水灵根',
        wood: '木灵根',
        metal: '金灵根',
        earth: '土灵根'
      }
      return {
        name: typeNames[type],
        type: 'scatter',
        data: currentData.value
          .filter(item => item.type === type)
          .map(item => ({
            ...item,
            value: [item.quality, item.potential]
          })),
        itemStyle: {
          color: colorMap[type]
        },
        symbolSize: function(data) {
          return (data[0] + data[1]) / 10
        }
      }
    })
  }
  
  scatterChart?.setOption(option)
}

// 刷新数据
const refreshData = () => {
  currentData.value = generateData(selectedType.value)
  updateChart()
}

// 监听数据变化
watch(selectedType, () => {
  refreshData()
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  scatterChart?.resize()
})

onMounted(() => {
  initChart()
})
</script>
