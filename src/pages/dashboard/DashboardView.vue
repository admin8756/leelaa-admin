<template>
  <div class="p-4 space-y-4">
    <stat-cards :stats="dashboardData.stats" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <resource-trend-chart :data="dashboardData.resourceTrend" />
      <cultivation-chart :data="dashboardData.cultivationDistribution" />
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <warning-list :warnings="dashboardData.warnings" />
      <quick-actions :actions="dashboardData.quickActions" @action="handleQuickAction" />
    </div>
    
    <sect-ranking :rankings="dashboardData.sectRankings" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StatCards from './components/StatCards.vue'
import ResourceTrendChart from './components/ResourceTrendChart.vue'
import CultivationChart from './components/CultivationChart.vue'
import WarningList from './components/WarningList.vue'
import QuickActions from './components/QuickActions.vue'
import SectRanking from './components/SectRanking.vue'

// 模拟数据
const dashboardData = ref({
  stats: {
    门下弟子: { value: 1234, trend: 0.12, label: '门下弟子', icon: 'mdi-account-group' },
    灵气浓度: { value: '128万', trend: 0.08, label: '灵气浓度', icon: 'mdi-weather-windy' },
    阵法数量: { value: 36, trend: 0.15, label: '阵法数量', icon: 'mdi-hexagon-multiple' },
    丹药储量: { value: 892, trend: -0.05, label: '丹药储量', icon: 'mdi-flask-round' }
  },
  // 资源趋势数据：改为数组格式，每个对象包含完整的日期和各类资源数据
  resourceTrend: [
    { date: '正月', spiritStone: 12800, elixir: 2200, magicWeapon: 150, talisman: 1800 },
    { date: '二月', spiritStone: 13200, elixir: 1820, magicWeapon: 232, talisman: 1850 },
    { date: '三月', spiritStone: 10100, elixir: 1910, magicWeapon: 201, talisman: 1950 },
    { date: '四月', spiritStone: 13400, elixir: 2340, magicWeapon: 154, talisman: 2050 },
    { date: '五月', spiritStone: 9000, elixir: 2900, magicWeapon: 190, talisman: 2200 },
    { date: '六月', spiritStone: 23000, elixir: 3300, magicWeapon: 330, talisman: 2500 }
  ],
  // 修为分布数据：使用具体的修为级别字段
  cultivationDistribution: {
    练气期: 3500,    // 练气期
    筑基期: 1200,      // 筑基期
    结丹期: 350,    // 结丹期
    元婴期: 80,          // 元婴期
    化神期: 15        // 化神期
  },
  warnings: [
    { 
      id: 1, 
      type: 'danger', 
      message: '发现魔修入侵护山大阵，请速速查探',
      location: '东南角护山大阵',
      time: '2024-01-15 13:45',
      status: '未处理',
      priority: '紧急',
      handler: '执法堂'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: '主峰灵脉灵气浓度下降，需及时查看',
      location: '主峰灵脉',
      time: '2024-01-15 12:30',
      status: '处理中',
      priority: '高',
      handler: '阵法堂'
    },
    { 
      id: 3, 
      type: 'warning', 
      message: '三位内门弟子即将突破瓶颈，需准备结丹室',
      location: '丹元峰',
      time: '2024-01-15 10:15',
      status: '处理中',
      priority: '中',
      handler: '内门执事'
    },
    { 
      id: 4, 
      type: 'info', 
      message: '丹房新炼制的培元丹已经完成',
      location: '丹房',
      time: '2024-01-15 09:20',
      status: '已完成',
      priority: '低',
      handler: '丹药堂'
    },
    { 
      id: 5, 
      type: 'info', 
      message: '藏经阁新增五部上古秘籍，待整理入库',
      location: '藏经阁',
      time: '2024-01-15 08:00',
      status: '未开始',
      priority: '低',
      handler: '藏经阁'
    }
  ],
  quickActions: [
    { 
      id: 'openFormation',
      title: '开启护山大阵',
      icon: 'mdi-shield-outline',
      color: 'primary'
    },
    { 
      id: 'distributeElixir',
      title: '分发丹药',
      icon: 'mdi-pill',
      color: 'success'
    },
    { 
      id: 'checkSpirit',
      title: '检查灵脉',
      icon: 'mdi-pulse',
      color: 'info'
    },
    { 
      id: 'gatherDisciples',
      title: '召集弟子',
      icon: 'mdi-account-group',
      color: 'warning'
    }
  ],
  sectRankings: [
    { rank: 1, name: '太清仙宗', power: 98000, trend: 'up' },
    { rank: 2, name: '蜀山剑宗', power: 96000, trend: 'stable' },
    { rank: 3, name: '昆仑玄门', power: 94000, trend: 'up' },
    { rank: 4, name: '天音禅宗', power: 92000, trend: 'down' },
    { rank: 5, name: '茅山道宗', power: 90000, trend: 'stable' },
    { rank: 6, name: '五台佛宗', power: 88000, trend: 'up' },
    { rank: 7, name: '终南道门', power: 86000, trend: 'stable' },
    { rank: 8, name: '峨眉仙门', power: 84000, trend: 'down' }
  ]
})

const handleQuickAction = (action) => {
  const actionMap = {
    openFormation: '开启护山大阵',
    distributeElixir: '分发丹药给突破弟子',
    checkSpirit: '检查灵脉状态',
    gatherDisciples: '召集门下弟子'
  }
  console.log(actionMap[action] || '未知操作')
}

onMounted(() => {
  // TODO: 从API获取真实数据
})
</script>
