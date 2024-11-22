<template>
  <div class="space-y-4 md:space-y-6">
    <!-- 修炼概览卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <LCard v-for="stat in stats" :key="stat.title" :no-padding="true">
        <div class="p-3 md:p-4">
          <div class="flex items-center gap-2 md:gap-3">
            <div :class="`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center`">
              <Icon :icon="stat.icon" :class="`text-xl md:text-2xl text-${stat.color}`" />
            </div>
            <div>
              <div class="text-xs md:text-sm opacity-70">{{ stat.title }}</div>
              <div class="text-lg md:text-2xl font-semibold">{{ stat.value }}</div>
            </div>
          </div>
          <div class="mt-3 md:mt-4 flex items-center gap-2">
            <div :class="`flex items-center gap-1 text-${stat.trend === 'up' ? 'success' : 'error'}`">
              <Icon :icon="stat.trend === 'up' ? 'mdi-trending-up' : 'mdi-trending-down'" class="text-base md:text-lg" />
              <span class="text-sm">{{ stat.trendValue }}</span>
            </div>
            <span class="text-xs md:text-sm opacity-50">较上月</span>
          </div>
        </div>
      </LCard>
    </div>

    <!-- 修炼境界分布 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- 境界分布图 -->
      <LCard title="境界分布" icon="mdi-chart-pie" icon-color="primary">
        <div class="h-64 md:h-80">
          <CultivationPieChart :data="distribution" />
        </div>
      </LCard>

      <!-- 突破记录 -->
      <LCard title="突破记录" icon="mdi-lightning-bolt" icon-color="warning">
        <div 
          ref="tableScrollRef"
          class="overflow-x-auto touch-pan-x"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <table class="table w-full min-w-[600px]">
            <thead>
              <tr>
                <th>修士</th>
                <th>突破境界</th>
                <th>突破时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in records" :key="record.id">
                <td class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full">
                      <img :src="record.avatar" :alt="record.name">
                    </div>
                  </div>
                  <span>{{ record.name }}</span>
                </td>
                <td>
                  <CultivationLevelTag :level="record.level" />
                </td>
                <td>{{ record.time }}</td>
                <td>
                  <div :class="[
                    'badge',
                    record.status === 'success' ? 'badge-success' : 
                    record.status === 'failed' ? 'badge-error' : 'badge-warning'
                  ]">
                    {{ record.statusText }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LCard>
    </div>

    <!-- 资源消耗与收益 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- 资源消耗趋势 -->
      <LCard title="资源消耗趋势" icon="mdi-chart-line" icon-color="info">
        <div class="h-64 md:h-80">
          <ResourceTrendChart :data="trendData" />
        </div>
      </LCard>

      <!-- 灵气浓度监测 -->
      <LCard title="灵气浓度监测" icon="mdi-weather-windy" icon-color="success">
        <div class="h-64 md:h-80">
          <QiDensityGauge :value="qiDensity" />
        </div>
      </LCard>
    </div>

    <!-- 修炼排行 -->
    <LCard title="修炼排行" icon="mdi-podium" icon-color="secondary">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="rank in ranks" :key="rank.id" class="card bg-base-200">
          <div class="card-body p-4">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 h-12 md:w-16 md:h-16 rounded-full">
                  <img :src="rank.avatar" :alt="rank.name">
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-base md:text-lg font-semibold truncate">{{ rank.name }}</h3>
                <CultivationLevelTag :level="rank.level" />
                <p class="text-xs md:text-sm opacity-70 mt-1 truncate">修炼时长: {{ rank.duration }}</p>
              </div>
              <div class="text-3xl md:text-4xl font-bold opacity-30">#{{ rank.ranking }}</div>
            </div>
            <div class="mt-3 md:mt-4">
              <div class="flex justify-between text-xs md:text-sm">
                <span>修炼效率</span>
                <span>{{ rank.efficiency }}%</span>
              </div>
              <progress class="progress progress-primary w-full" :value="rank.efficiency" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    </LCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import LCard from '@/components/base/LCard/index.vue'
import CultivationLevelTag from '@/components/business/CultivationLevelTag.vue'
import CultivationPieChart from './components/CultivationPieChart.vue'
import ResourceTrendChart from './components/ResourceTrendChart.vue'
import QiDensityGauge from './components/QiDensityGauge.vue'

// 导入 mock 数据
import {
  cultivationStats,
  realmDistribution,
  breakthroughRecords,
  cultivationRanks,
  resourceTrendData,
  qiDensityValue
} from '@/mock/cultivation'

// 使用导入的数据
const stats = ref(cultivationStats)
const distribution = ref(realmDistribution)
const records = ref(breakthroughRecords)
const ranks = ref(cultivationRanks)
const trendData = ref(resourceTrendData)
const qiDensity = ref(qiDensityValue)

// 移动端优化：表格滚动控制
const tableScrollRef = ref(null)
const isScrolling = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const handleTouchStart = (e) => {
  isScrolling.value = true
  startX.value = e.touches[0].pageX - tableScrollRef.value.offsetLeft
  scrollLeft.value = tableScrollRef.value.scrollLeft
}

const handleTouchMove = (e) => {
  if (!isScrolling.value) return
  e.preventDefault()
  const x = e.touches[0].pageX - tableScrollRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  tableScrollRef.value.scrollLeft = scrollLeft.value - walk
}

const handleTouchEnd = () => {
  isScrolling.value = false
}
</script>

<style scoped>
.touch-pan-x {
  touch-action: pan-x;
}
</style>
