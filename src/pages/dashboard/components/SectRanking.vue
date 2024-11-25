<template>
  <div class="card bg-base-200/50 backdrop-blur-sm shadow-xl">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <Icon icon="game-icons:holy-symbol" class="text-2xl text-primary" />
          <h2 class="card-title m-0">宗门排名</h2>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="btn btn-ghost btn-sm btn-circle"
            :class="{ 'loading': isRefreshing }"
            @click="refresh"
          >
            <Icon icon="mdi:refresh" class="text-lg" />
          </button>
          <div class="text-sm opacity-75">
            <Icon icon="mdi:clock-outline" class="inline-block" />
            <span>{{ lastUpdate }}</span>
          </div>
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
                  <div class="avatar">
                    <div class="w-8 rounded-lg bg-neutral-focus">
                      <img :src="sect.avatar" :alt="sect.name" />
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
                <div class="badge" :class="getSpecialtyClass(sect.specialty)">
                  {{ sect.specialty }}
                </div>
              </td>

              <!-- 排名变化 -->
              <td>
                <div 
                  class="badge"
                  :class="[
                    sect.trend === 'up' ? 'badge-success' :
                    sect.trend === 'down' ? 'badge-error' :
                    'badge-ghost'
                  ]"
                >
                  {{ sect.trend === 'up' ? '↑' : sect.trend === 'down' ? '↓' : '-' }}
                  {{ sect.change }}
                </div>
              </td>

              <!-- 趋势图 -->
              <td>
                <div class="w-24 h-8">
                  <TrendChart 
                    :data="sect.rankHistory" 
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
              <div class="stat-title">规模</div>
              <div class="stat-value text-lg">{{ selectedSect.size }}</div>
            </div>
            <div class="stat bg-base-200/50 rounded-box">
              <div class="stat-title">特长</div>
              <div class="stat-value text-lg">{{ selectedSect.specialty }}</div>
            </div>
            <div class="stat bg-base-200/50 rounded-box">
              <div class="stat-title">综合评分</div>
              <div class="stat-value text-lg">{{ selectedSect.score }}</div>
            </div>
          </div>

          <!-- 能力雷达图 -->
          <div class="h-64">
            <RadarChart 
              :data="[
                selectedSect.power,
                selectedSect.influence,
                selectedSect.resources,
                selectedSect.cultivation,
                selectedSect.reputation
              ]"
              :indicators="[
                { name: '战斗力', max: 100 },
                { name: '影响力', max: 100 },
                { name: '资源', max: 100 },
                { name: '修炼', max: 100 },
                { name: '声望', max: 100 }
              ]"
              :color="selectedSect.color"
            />
          </div>

          <!-- 最近事件 -->
          <div class="space-y-2">
            <h4 class="font-medium">最近事件</h4>
            <div class="space-y-2">
              <div 
                v-for="event in selectedSect.events" 
                :key="event.title"
                class="alert"
                :class="{
                  'alert-success': event.type === 'success',
                  'alert-warning': event.type === 'warning',
                  'alert-info': event.type === 'info'
                }"
              >
                <div>
                  <h3 class="font-bold">{{ event.title }}</h3>
                  <div class="text-xs">{{ event.content }}</div>
                </div>
                <div class="text-xs opacity-75">{{ event.time }}</div>
              </div>
            </div>
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
import dayjs from 'dayjs'
import TrendChart from './charts/TrendChart.vue'
import RadarChart from './charts/RadarChart.vue'
import { sects, generateRankingList } from '@/mock/sect'

// 使用 ref 包装数据，使其成为响应式
const rankingData = ref(generateRankingList())
const lastUpdate = ref(dayjs().format('HH:mm'))
const isRefreshing = ref(false)
const sectDetailsModal = ref(null)
const selectedSect = ref(null)

// 合并 sects 和 rankingData 的数据
const rankings = computed(() => {
  return rankingData.value.map(ranking => {
    const sect = sects.find(s => s.name === ranking.name)
    return {
      ...sect,
      currentRank: ranking.rank,
      score: ranking.score,
      trend: ranking.trend,
      change: ranking.change
    }
  })
})

// 刷新排名数据
const refresh = async () => {
  isRefreshing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络延迟
    rankingData.value = generateRankingList() // 重新生成数据
    lastUpdate.value = dayjs().format('HH:mm')
  } finally {
    isRefreshing.value = false
  }
}

// 显示宗门详情
const showSectDetails = (sect) => {
  selectedSect.value = sect
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
    '丹修': 'badge-primary',
    '符修': 'badge-secondary',
    '阵修': 'badge-accent',
    '剑修': 'badge-info',
    '音修': 'badge-warning',
    '驭兽': 'badge-success'
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
  @apply bg-base-content/10 rounded-full hover:bg-base-content/20;
}
</style>
