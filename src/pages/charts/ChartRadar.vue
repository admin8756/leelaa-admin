<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>五行属性分析</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="selectedDisciple">
            <option v-for="disciple in disciples" :key="disciple.id" :value="disciple.id">
              {{ disciple.name }}
            </option>
          </select>
          <button class="btn btn-sm btn-outline" @click="refreshData">
            <Icon icon="mdi:refresh" />
          </button>
        </div>
      </h2>
      
      <!-- 图表容器 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div ref="radarChartRef" class="w-full h-[400px]"></div>
        
        <!-- 详细信息 -->
        <div class="space-y-4">
          <div class="stats stats-vertical shadow flex">
            <div class="stat">
              <div class="stat-title">主属性</div>
              <div class="stat-value text-primary">{{ currentDisciple.mainAttribute }}</div>
              <div class="stat-desc">五行偏向</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">灵根品质</div>
              <div class="stat-value">{{ currentDisciple.quality }}</div>
              <div class="stat-desc">综合评分</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">修炼建议</div>
              <div class="stat-value text-sm">{{ currentDisciple.suggestion }}</div>
              <div class="stat-desc">根据五行分析</div>
            </div>
          </div>
          
          <!-- 五行详情 -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(value, attr) in currentDisciple.attributes" :key="attr" 
                 class="stat bg-base-200 rounded-box">
              <div class="stat-title capitalize">{{ attr }}</div>
              <div class="stat-value text-2xl">{{ value }}</div>
              <div class="stat-desc">
                <progress class="progress" :class="getProgressClass(attr)" 
                         :value="value" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'

// 数据
const selectedDisciple = ref(1)
const radarChartRef = ref(null)
let radarChart = null

// 模拟数据
const disciples = [
  {
    id: 1,
    name: '张三',
    mainAttribute: '金',
    quality: 'A',
    suggestion: '建议修炼金系功法，注重金属性的提升',
    attributes: {
      金: 85,
      木: 45,
      水: 60,
      火: 30,
      土: 50
    }
  },
  {
    id: 2,
    name: '李四',
    mainAttribute: '火',
    quality: 'S',
    suggestion: '火属性极强，适合修炼火系神通',
    attributes: {
      金: 40,
      木: 30,
      水: 20,
      火: 95,
      土: 45
    }
  },
  {
    id: 3,
    name: '王五',
    mainAttribute: '水',
    quality: 'B',
    suggestion: '水系资质良好，可以考虑辅修木系功法',
    attributes: {
      金: 35,
      木: 65,
      水: 75,
      火: 25,
      土: 40
    }
  }
]

// 获取当前选中的弟子信息
const currentDisciple = computed(() => {
  return disciples.find(d => d.id === selectedDisciple.value) || disciples[0]
})

// 获取进度条样式
const getProgressClass = (attribute) => {
  const classMap = {
    金: 'progress-warning',
    木: 'progress-success',
    水: 'progress-info',
    火: 'progress-error',
    土: 'progress-secondary'
  }
  return classMap[attribute]
}

// 初始化图表
const initChart = () => {
  const chartDom = radarChartRef.value
  radarChart = echarts.init(chartDom)
  updateChart()
}

// 更新图表
const updateChart = () => {
  const disciple = currentDisciple.value
  const option = {
    title: {
      text: '五行属性分布'
    },
    legend: {
      data: ['当前属性', '平均水平']
    },
    radar: {
      indicator: [
        { name: '金', max: 100 },
        { name: '木', max: 100 },
        { name: '水', max: 100 },
        { name: '火', max: 100 },
        { name: '土', max: 100 }
      ],
      shape: 'circle',
      splitNumber: 5,
      axisName: {
        color: '#999'
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)',
            'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)',
            'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)',
            'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [
      {
        name: '属性分析',
        type: 'radar',
        data: [
          {
            value: [
              disciple.attributes.金,
              disciple.attributes.木,
              disciple.attributes.水,
              disciple.attributes.火,
              disciple.attributes.土
            ],
            name: '当前属性',
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                {
                  color: 'rgba(255, 145, 124, 0.1)',
                  offset: 0
                },
                {
                  color: 'rgba(255, 145, 124, 0.9)',
                  offset: 1
                }
              ])
            }
          },
          {
            value: [50, 50, 50, 50, 50],
            name: '平均水平',
            lineStyle: {
              type: 'dashed'
            }
          }
        ]
      }
    ]
  }
  
  radarChart?.setOption(option)
}

// 刷新数据
const refreshData = () => {
  updateChart()
}

// 监听数据变化
watch(selectedDisciple, () => {
  updateChart()
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  radarChart?.resize()
})

onMounted(() => {
  initChart()
})
</script>
