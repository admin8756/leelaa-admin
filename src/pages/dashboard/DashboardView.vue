<template>
  <div class="p-4 space-y-4">
    <stat-cards :stats="dashboardData.stats" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <resource-trend-chart :data="dashboardData.resourceTrend" />
      <cultivation-chart :data="dashboardData.cultivationDistribution" />
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <warning-list :warnings="dashboardData.warnings" />
      <quick-actions @action="handleQuickAction" />
    </div>
    
    <sect-ranking :rankings="dashboardData.sectRankings" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StatCards from '@components/business/dashboard/StatCards.vue'
import ResourceTrendChart from '@components/business/dashboard/ResourceTrendChart.vue'
import CultivationChart from '@components/business/dashboard/CultivationChart.vue'
import WarningList from '@components/business/dashboard/WarningList.vue'
import QuickActions from '@components/business/dashboard/QuickActions.vue'
import SectRanking from '@components/business/dashboard/SectRanking.vue'

// 模拟数据
const dashboardData = ref({
  stats: {
    disciples: { value: 1234, trend: 0.12 },
    resources: { value: 50000, trend: -0.05 },
    missions: { value: 89, trend: 0.23 },
    formations: { value: 12, trend: 0 }
  },
  resourceTrend: {
    dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
    spiritStones: [120, 132, 101, 134, 90, 230],
    pills: [220, 182, 191, 234, 290, 330],
    artifacts: [150, 232, 201, 154, 190, 330]
  },
  cultivationDistribution: {
    levels: ['练气期', '筑基期', '金丹期', '元婴期', '化神期'],
    values: [300, 200, 100, 50, 20]
  },
  warnings: [
    { type: 'error', message: '灵石储备不足，请及时补充' },
    { type: 'warning', message: '有3位弟子即将突破瓶颈' },
    { type: 'info', message: '新的修炼功法已经到达' }
  ],
  sectRankings: [
    { rank: 1, name: '青云门', power: 9999, trend: 'up' },
    { rank: 2, name: '蜀山剑派', power: 9888, trend: 'down' },
    { rank: 3, name: '昆仑派', power: 9777, trend: 'stable' }
  ]
})

const handleQuickAction = (action) => {
  console.log('Quick action:', action)
  // TODO: 处理快捷操作
}

onMounted(() => {
  // TODO: 从API获取真实数据
})
</script>
