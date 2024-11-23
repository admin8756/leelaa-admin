import dayjs from 'dayjs'

// 生成过去30天的日期数组
const generateDates = () => {
  const dates = []
  for (let i = 29; i >= 0; i--) {
    dates.push(dayjs().subtract(i, 'day').format('MM-DD'))
  }
  return dates
}

// 生成随机数据
const generateRandomData = (min, max, length) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

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

// 境界分布数据
export const realmDistribution = [
  { name: '练气期', value: 450 },
  { name: '筑基期', value: 320 },
  { name: '金丹期', value: 180 },
  { name: '元婴期', value: 80 },
  { name: '化神期', value: 30 },
  { name: '炼虚期', value: 10 }
]

// 突破记录
export const breakthroughRecords = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    level: '金丹期',
    time: '2024-02-20 15:30',
    status: 'success',
    statusText: '突破成功'
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    level: '筑基期',
    time: '2024-02-19 09:15',
    status: 'failed',
    statusText: '突破失败'
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    level: '元婴期',
    time: '2024-02-18 20:45',
    status: 'success',
    statusText: '突破成功'
  },
  {
    id: 4,
    name: '赵六',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    level: '练气期',
    time: '2024-02-18 16:20',
    status: 'inProgress',
    statusText: '突破中'
  }
]

// 修炼排行
export const cultivationRanks = [
  {
    id: 1,
    name: '叶凡',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    level: '化神期',
    duration: '168h',
    ranking: 1,
    efficiency: 98
  },
  {
    id: 2,
    name: '萧炎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    level: '元婴期',
    duration: '152h',
    ranking: 2,
    efficiency: 95
  },
  {
    id: 3,
    name: '韩立',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
    level: '金丹期',
    duration: '143h',
    ranking: 3,
    efficiency: 92
  }
]

// 资源消耗趋势数据
export const resourceTrendData = {
  dates: generateDates(),
  spirit: generateRandomData(100, 500, 30),
  elixir: generateRandomData(10, 50, 30),
  talisman: generateRandomData(5, 25, 30)
}

// 灵气浓度数据
export const qiDensityValue = 78.5
