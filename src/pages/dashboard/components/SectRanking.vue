<template>
  <div class="card bg-base-200/50 backdrop-blur-sm shadow-xl">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <Icon icon="game-icons:holy-symbol" class="text-2xl text-primary" />
          <h2 class="card-title m-0">宗门排名</h2>
        </div>
        <div class="flex items-center gap-2 text-sm opacity-75">
          <Icon icon="mdi:clock-outline" />
          <span>{{ lastUpdate }}</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th class="w-16">排名</th>
              <th class="w-48">宗门</th>
              <th>综合评分</th>
              <th>特长</th>
              <th class="w-24">变化</th>
              <th class="w-24">趋势</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="sect in rankings" 
              :key="sect.id"
              class="hover:bg-base-200/50 transition-colors cursor-pointer group"
              @click="showSectDetails(sect)"
            >
              <!-- 排名 -->
              <td>
                <div 
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium"
                  :class="[
                    sect.currentRank === 1 ? 'bg-primary/20 text-primary' :
                    sect.currentRank === 2 ? 'bg-secondary/20 text-secondary' :
                    sect.currentRank === 3 ? 'bg-accent/20 text-accent' :
                    'bg-base-200/50'
                  ]"
                >
                  {{ sect.currentRank }}
                </div>
              </td>

              <!-- 宗门名称 -->
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="w-8 rounded-lg bg-neutral-focus text-neutral-content">
                      <span class="text-xs">{{ sect.name.slice(0, 2) }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-medium group-hover:text-primary transition-colors">
                      {{ sect.name }}
                    </div>
                    <div class="text-xs opacity-50">{{ sect.description }}</div>
                  </div>
                </div>
              </td>

              <!-- 综合评分 -->
              <td>
                <div class="flex items-center gap-2">
                  <div class="radial-progress text-primary" :style="{ '--value': sect.score, '--size': '2rem' }">
                    {{ sect.score }}
                  </div>
                  <div class="flex flex-col text-xs">
                    <span>综合评分</span>
                    <span class="opacity-50">{{ getScoreLevel(sect.score) }}</span>
                  </div>
                </div>
              </td>

              <!-- 特长 -->
              <td>
                <div class="flex gap-1">
                  <div 
                    v-for="specialty in sect.specialties" 
                    :key="specialty"
                    class="badge badge-sm"
                    :class="getSpecialtyClass(specialty)"
                  >
                    {{ specialty }}
                  </div>
                </div>
              </td>

              <!-- 排名变化 -->
              <td>
                <div 
                  class="badge"
                  :class="[
                    sect.rankChange > 0 ? 'badge-success' :
                    sect.rankChange < 0 ? 'badge-error' :
                    'badge-ghost'
                  ]"
                >
                  {{ sect.rankChange > 0 ? '↑' : sect.rankChange < 0 ? '↓' : '-' }}
                  {{ Math.abs(sect.rankChange) }}
                </div>
              </td>

              <!-- 趋势图 -->
              <td>
                <div class="w-24 h-8">
                  <TrendChart 
                    :data="sect.historicalRanks" 
                    :color="sect.trend === 'up' ? '#36D399' : sect.trend === 'down' ? '#F87272' : '#71717A'"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 宗门详情模态框 -->
    <dialog ref="sectDetailsModal" class="modal">
      <div class="modal-box max-w-3xl">
        <h3 class="font-bold text-lg mb-4">{{ selectedSect?.name }}</h3>
        
        <div v-if="selectedSect" class="space-y-6">
          <!-- 基本信息 -->
          <div class="grid grid-cols-3 gap-4">
            <div class="stat bg-base-200/50 rounded-box">
              <div class="stat-title">门派驻地</div>
              <div class="stat-value text-lg">{{ selectedSect.location }}</div>
            </div>
            <div class="stat bg-base-200/50 rounded-box">
              <div class="stat-title">掌门人</div>
              <div class="stat-value text-lg">{{ selectedSect.leader }}</div>
            </div>
            <div class="stat bg-base-200/50 rounded-box">
              <div class="stat-title">创建时间</div>
              <div class="stat-value text-lg">{{ selectedSect.foundingYear }}</div>
            </div>
          </div>

          <!-- 能力雷达图 -->
          <div class="h-64">
            <RadarChart :data="selectedSect.stats" />
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">关闭</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useSectStore } from '@/stores/sect'
import TrendChart from './charts/TrendChart.vue'
import RadarChart from './charts/RadarChart.vue'

const sectStore = useSectStore()
const rankings = computed(() => sectStore.rankings)
const lastUpdate = computed(() => {
  if (!sectStore.lastUpdateTime) return '实时数据'
  const date = new Date(sectStore.lastUpdateTime)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} 更新`
})

// 宗门详情相关
const sectDetailsModal = ref(null)
const selectedSect = ref(null)

const showSectDetails = (sect) => {
  selectedSect.value = sectStore.sects.find(s => s.id === sect.id)
  sectDetailsModal.value?.showModal()
}

// 评分等级判断
const getScoreLevel = (score) => {
  if (score >= 95) return '超然'
  if (score >= 90) return '卓越'
  if (score >= 85) return '杰出'
  if (score >= 80) return '优秀'
  return '良好'
}

// 特长标签样式
const getSpecialtyClass = (specialty) => {
  const classMap = {
    '丹道': 'badge-primary',
    '符箓': 'badge-secondary',
    '阵法': 'badge-accent',
    '剑道': 'badge-info',
    '御剑术': 'badge-info',
    '剑阵': 'badge-info',
    '道法': 'badge-warning',
    '炼器': 'badge-warning',
    '符咒': 'badge-warning',
    '佛法': 'badge-success',
    '医术': 'badge-success',
    '禅修': 'badge-success',
    '驱邪': 'badge-error',
    '炼丹': 'badge-error'
  }
  return classMap[specialty] || 'badge-neutral'
}
</script>

<style scoped>
.table :where(thead, tfoot) :where(th, td) {
  @apply bg-base-200/50 backdrop-blur-sm;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-base-content/20 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-base-content/30;
}
</style>
