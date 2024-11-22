import { defineStore } from 'pinia'

/**
 * 宗门评分权重配置
 */
const SCORE_WEIGHTS = {
  disciples: 0.3,    // 门下弟子数量权重
  resources: 0.2,    // 宗门资源储备权重
  influence: 0.2,    // 江湖影响力权重
  heritage: 0.15,    // 传承底蕴权重
  formation: 0.15    // 阵法防御强度权重
}

export const useSectStore = defineStore('sect', {
  state: () => ({
    sects: [
      {
        id: 1,
        name: '太清仙宗',
        location: '昆仑山脉',
        leader: '玄清道君',
        foundingYear: '上古元年',
        description: '道法自然，清修治世',
        stats: {
          disciples: 3500,    // 门下弟子
          resources: 95,      // 资源储备指数
          influence: 98,      // 江湖影响力
          heritage: 99,       // 传承底蕴
          formation: 97       // 阵法防御
        },
        specialties: ['丹道', '符箓', '阵法'],
        lastRank: 1,
        historicalRanks: [1, 1, 1, 2, 1] // 最近5次排名
      },
      {
        id: 2,
        name: '蜀山剑宗',
        location: '蜀山',
        leader: '青云剑主',
        foundingYear: '上古三年',
        description: '剑气冲霄，斩妖除魔',
        stats: {
          disciples: 3200,
          resources: 92,
          influence: 96,
          heritage: 98,
          formation: 94
        },
        specialties: ['剑道', '御剑术', '剑阵'],
        lastRank: 3,
        historicalRanks: [3, 2, 2, 1, 2]
      },
      {
        id: 3,
        name: '昆仑玄门',
        location: '昆仑山',
        leader: '玄门真人',
        foundingYear: '上古二年',
        description: '继承三清道统，弘扬玄门正道',
        stats: {
          disciples: 3100,
          resources: 94,
          influence: 95,
          heritage: 97,
          formation: 96
        },
        specialties: ['道法', '炼器', '符咒'],
        lastRank: 2,
        historicalRanks: [2, 3, 3, 3, 3]
      },
      {
        id: 4,
        name: '天音禅宗',
        location: '天山',
        leader: '法音禅师',
        foundingYear: '上古五年',
        description: '梵音普度，佛法无边',
        stats: {
          disciples: 2800,
          resources: 90,
          influence: 93,
          heritage: 95,
          formation: 92
        },
        specialties: ['佛法', '医术', '禅修'],
        lastRank: 4,
        historicalRanks: [4, 4, 4, 4, 4]
      },
      {
        id: 5,
        name: '茅山道宗',
        location: '茅山',
        leader: '茅山掌门',
        foundingYear: '上古七年',
        description: '符箓驱邪，护佑苍生',
        stats: {
          disciples: 2600,
          resources: 88,
          influence: 91,
          heritage: 94,
          formation: 90
        },
        specialties: ['符箓', '驱邪', '炼丹'],
        lastRank: 5,
        historicalRanks: [5, 5, 5, 5, 5]
      }
    ],
    lastUpdateTime: null
  }),

  getters: {
    /**
     * 计算各宗门的综合评分并排名
     */
    rankings: (state) => {
      return state.sects
        .map(sect => {
          // 计算综合评分
          const score = Object.entries(sect.stats).reduce((total, [key, value]) => {
            return total + (value * (SCORE_WEIGHTS[key] || 0))
          }, 0)

          // 计算排名变化
          const currentRank = state.sects
            .map(s => calculateScore(s.stats))
            .sort((a, b) => b - a)
            .indexOf(score) + 1

          const rankChange = sect.lastRank - currentRank

          return {
            id: sect.id,
            name: sect.name,
            score: Math.round(score * 100) / 100,
            currentRank,
            lastRank: sect.lastRank,
            rankChange,
            trend: rankChange > 0 ? 'up' : rankChange < 0 ? 'down' : 'stable',
            stats: sect.stats,
            specialties: sect.specialties,
            description: sect.description,
            historicalRanks: sect.historicalRanks || [] // 添加历史排名数据
          }
        })
        .sort((a, b) => a.currentRank - b.currentRank)
    }
  },

  actions: {
    /**
     * 更新宗门数据
     */
    updateSectData(sectId, newData) {
      const sectIndex = this.sects.findIndex(s => s.id === sectId)
      if (sectIndex !== -1) {
        // 保存当前排名作为历史记录
        const currentRanking = this.rankings.find(r => r.id === sectId)
        if (currentRanking) {
          this.sects[sectIndex].lastRank = currentRanking.currentRank
          this.sects[sectIndex].historicalRanks.push(currentRanking.currentRank)
          this.sects[sectIndex].historicalRanks = this.sects[sectIndex].historicalRanks.slice(-5)
        }

        // 更新数据
        this.sects[sectIndex] = {
          ...this.sects[sectIndex],
          ...newData
        }

        this.lastUpdateTime = new Date().toISOString()
      }
    }
  }
})

/**
 * 计算宗门综合评分
 */
function calculateScore(stats) {
  return Object.entries(stats).reduce((total, [key, value]) => {
    return total + (value * (SCORE_WEIGHTS[key] || 0))
  }, 0)
}
