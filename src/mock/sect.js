// 宗门数据
export const sects = [
  {
    id: 1,
    name: '太虚剑宗',
    description: '以剑道闻名天下，门内藏剑千万',
    avatar: 'https://picsum.photos/200?random=1',
    specialty: '剑修',
    color: '#0EA5E9',
    size: '特大型',
    power: 95,
    influence: 88,
    resources: 85,
    cultivation: 92,
    reputation: 90,
    rankHistory: [5, 4, 3, 2, 1, 2, 1],
    events: [
      {
        title: '剑道大会',
        content: '举办第99届剑道大会，吸引各大宗门参与',
        time: '3天前',
        type: 'success'
      },
      {
        title: '新剑法创立',
        content: '太上长老悟出"太虚剑意"',
        time: '7天前',
        type: 'info'
      }
    ]
  },
  {
    id: 2,
    name: '丹霞宗',
    description: '丹道传承，道法自然',
    avatar: 'https://picsum.photos/200?random=2',
    specialty: '丹修',
    color: '#EC4899',
    size: '大型',
    power: 75,
    influence: 92,
    resources: 96,
    cultivation: 88,
    reputation: 94,
    rankHistory: [3, 2, 1, 1, 2, 3, 2],
    events: [
      {
        title: '丹药拍卖',
        content: '举办年度丹药拍卖会，成交额创新高',
        time: '2天前',
        type: 'success'
      },
      {
        title: '新药问世',
        content: '研制出新型聚灵丹，效果优于市面同类',
        time: '5天前',
        type: 'info'
      }
    ]
  },
  {
    id: 3,
    name: '五行宗',
    description: '阵法宗师，五行相生',
    avatar: 'https://picsum.photos/200?random=3',
    specialty: '阵修',
    color: '#10B981',
    size: '大型',
    power: 86,
    influence: 85,
    resources: 88,
    cultivation: 90,
    reputation: 87,
    rankHistory: [4, 3, 2, 3, 4, 3, 3],
    events: [
      {
        title: '护山大阵升级',
        content: '成功升级护山大阵，防御力提升30%',
        time: '1天前',
        type: 'success'
      },
      {
        title: '外门遇袭',
        content: '外门阵法遭到不明势力破坏',
        time: '4天前',
        type: 'warning'
      }
    ]
  },
  {
    id: 4,
    name: '天音谷',
    description: '以音入道，闻名遐迩',
    avatar: 'https://picsum.photos/200?random=4',
    specialty: '音修',
    color: '#F59E0B',
    size: '中型',
    power: 78,
    influence: 89,
    resources: 82,
    cultivation: 85,
    reputation: 88,
    rankHistory: [6, 5, 4, 4, 5, 4, 4],
    events: [
      {
        title: '音道交流会',
        content: '举办跨宗门音道交流会',
        time: '2天前',
        type: 'info'
      }
    ]
  },
  {
    id: 5,
    name: '青云符宗',
    description: '符道传承，底蕴深厚',
    avatar: 'https://picsum.photos/200?random=5',
    specialty: '符修',
    color: '#8B5CF6',
    size: '大型',
    power: 82,
    influence: 86,
    resources: 90,
    cultivation: 84,
    reputation: 85,
    rankHistory: [2, 3, 4, 5, 4, 5, 5],
    events: [
      {
        title: '符道突破',
        content: '掌门突破符道瓶颈，实力大增',
        time: '6天前',
        type: 'success'
      }
    ]
  },
  {
    id: 6,
    name: '万兽山',
    description: '驭兽世家，与兽为伴',
    avatar: 'https://picsum.photos/200?random=6',
    specialty: '驭兽',
    color: '#059669',
    size: '中型',
    power: 85,
    influence: 80,
    resources: 78,
    cultivation: 83,
    reputation: 82,
    rankHistory: [7, 6, 5, 6, 6, 6, 6],
    events: [
      {
        title: '灵兽暴动',
        content: '后山灵兽暴动，所幸及时控制',
        time: '1天前',
        type: 'warning'
      }
    ]
  },
  {
    id: 7,
    name: '玄天道宗',
    description: '道法自然，清修无为',
    avatar: 'https://picsum.photos/200?random=7',
    specialty: '丹修',
    color: '#DC2626',
    size: '特大型',
    power: 91,
    influence: 94,
    resources: 92,
    cultivation: 89,
    reputation: 93,
    rankHistory: [1, 1, 2, 3, 2, 1, 2],
    events: [
      {
        title: '道法交流',
        content: '举办道法交流大会，各派高手云集',
        time: '1天前',
        type: 'success'
      }
    ]
  },
  {
    id: 8,
    name: '碧云峰',
    description: '云雾缭绕，仙家气象',
    avatar: 'https://picsum.photos/200?random=8',
    specialty: '剑修',
    color: '#2563EB',
    size: '中型',
    power: 84,
    influence: 79,
    resources: 76,
    cultivation: 88,
    reputation: 80,
    rankHistory: [8, 7, 8, 7, 7, 8, 7],
    events: [
      {
        title: '剑法突破',
        content: '开创新剑法"碧云九式"',
        time: '5天前',
        type: 'success'
      }
    ]
  },
  {
    id: 9,
    name: '百花谷',
    description: '医道济世，妙手回春',
    avatar: 'https://picsum.photos/200?random=9',
    specialty: '丹修',
    color: '#DB2777',
    size: '中型',
    power: 72,
    influence: 88,
    resources: 85,
    cultivation: 80,
    reputation: 89,
    rankHistory: [9, 8, 7, 8, 9, 8, 8],
    events: [
      {
        title: '新药研制',
        content: '成功研制"百花续命丹"',
        time: '3天前',
        type: 'success'
      }
    ]
  },
  {
    id: 10,
    name: '落日剑派',
    description: '剑气纵横，威震八方',
    avatar: 'https://picsum.photos/200?random=10',
    specialty: '剑修',
    color: '#9333EA',
    size: '大型',
    power: 89,
    influence: 83,
    resources: 81,
    cultivation: 87,
    reputation: 84,
    rankHistory: [6, 7, 6, 5, 6, 7, 6],
    events: [
      {
        title: '剑道交流',
        content: '与太虚剑宗切磋剑道',
        time: '2天前',
        type: 'info'
      }
    ]
  },
  {
    id: 11,
    name: '天机阁',
    description: '推演天机，预知未来',
    avatar: 'https://picsum.photos/200?random=11',
    specialty: '阵修',
    color: '#4F46E5',
    size: '小型',
    power: 70,
    influence: 95,
    resources: 88,
    cultivation: 75,
    reputation: 92,
    rankHistory: [10, 9, 10, 11, 10, 9, 10],
    events: [
      {
        title: '天机预警',
        content: '预测到修真界大劫将至',
        time: '1天前',
        type: 'warning'
      }
    ]
  },
  {
    id: 12,
    name: '御剑山庄',
    description: '御剑飞行，快意恩仇',
    avatar: 'https://picsum.photos/200?random=12',
    specialty: '剑修',
    color: '#0891B2',
    size: '中型',
    power: 88,
    influence: 78,
    resources: 75,
    cultivation: 86,
    reputation: 81,
    rankHistory: [11, 10, 9, 10, 11, 10, 11],
    events: [
      {
        title: '御剑大会',
        content: '举办年度御剑比赛',
        time: '4天前',
        type: 'info'
      }
    ]
  }
]

// 生成随机评分 (85-100)
const generateScore = () => {
  return (85 + Math.random() * 15).toFixed(1)
}

// 生成随机变化值 (0.1-2.0)
const generateChange = () => {
  return (0.1 + Math.random() * 1.9).toFixed(1)
}

// 生成排名数据
export const generateRankingList = () => {
  // 获取所有宗门名称
  const sectNames = sects.map(sect => sect.name)
  
  // 生成排名数据
  const rankings = sectNames.map(name => {
    const score = generateScore()
    const change = generateChange()
    const trend = Math.random() > 0.5 ? 'up' : 'down'
    
    return {
      name,
      score: parseFloat(score),
      change: parseFloat(change),
      trend
    }
  })
  
  // 按评分排序
  rankings.sort((a, b) => b.score - a.score)
  
  // 添加排名
  return rankings.map((item, index) => ({
    ...item,
    rank: index + 1
  }))
}

// 初始排名数据
export const sectRankingList = generateRankingList()

// 修炼统计数据
export const cultivationStats = [
  {
    title: '修炼成功率',
    value: '86.5%',
    icon: 'mdi-percent',
    color: 'primary',
    trend: 'up',
    trendValue: '2.3%'
  },
  {
    title: '平均修炼时长',
    value: '4.2h',
    icon: 'mdi-clock',
    color: 'secondary',
    trend: 'up',
    trendValue: '0.5h'
  },
  {
    title: '灵石消耗',
    value: '1,892',
    icon: 'mdi-diamond-stone',
    color: 'accent',
    trend: 'down',
    trendValue: '3.1%'
  },
  {
    title: '突破次数',
    value: '28',
    icon: 'mdi-lightning-bolt',
    color: 'warning',
    trend: 'up',
    trendValue: '5次'
  }
]
