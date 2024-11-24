<template>
  <div class="p-4 space-y-4">
    <stat-cards :stats="cultivationStats" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <resource-trend-chart :data="resourceTrend" />
      <cultivation-chart :data="realmDistribution" />
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <alert-panel v-model:alerts="alerts" />
      <quick-actions :actions="actionList" @action="handleQuickAction" />
    </div>
    
    <sect-ranking />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import StatCards from './components/StatCards.vue'
import ResourceTrendChart from './components/ResourceTrendChart.vue'
import CultivationChart from './components/CultivationChart.vue'
import AlertPanel from './components/AlertPanel.vue'
import QuickActions from './components/QuickActions.vue'
import SectRanking from './components/SectRanking.vue'
import { 
  cultivationStats,
  realmDistribution,
  warningList,
  actionList,
  resourceTrend
} from '@/mock/cultivation'

// 使用 ref 包装预警列表数据，使其成为响应式
const alerts = ref(warningList)

// 快捷操作处理
const handleQuickAction = (action) => {
  console.log('执行快捷操作:', action)
}

onMounted(() => {
  // TODO: 从API获取真实数据
})
</script>
