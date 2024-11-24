import dayjs from 'dayjs'

// 生成随机时间（最近24小时内）
const generateRandomTime = () => {
  const now = dayjs()
  const hoursAgo = Math.floor(Math.random() * 24)
  const minutesAgo = Math.floor(Math.random() * 60)
  return now.subtract(hoursAgo, 'hour').subtract(minutesAgo, 'minute').format('YYYY-MM-DD HH:mm')
}

// 生成随机状态
const generateRandomStatus = () => {
  const statuses = ['未处理', '处理中', '已处理']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

// 生成随机优先级和类型
const generateRandomPriority = () => {
  const priorities = [
    { priority: '紧急', type: 'danger' },
    { priority: '高', type: 'warning' },
    { priority: '中', type: 'warning' },
    { priority: '普通', type: 'info' }
  ]
  return priorities[Math.floor(Math.random() * priorities.length)]
}

// 生成随机处理人
const generateRandomHandler = () => {
  const handlers = [
    '执法堂', '阵法堂', '内门执事', '巡山队', 
    '药园管理处', '后勤部', '藏经阁守阁人', 
    '比武组委会', '器物堂', '考核组'
  ]
  return handlers[Math.floor(Math.random() * handlers.length)]
}

// 生成随机地点
const generateRandomLocation = () => {
  const locations = [
    '东南角护山大阵', '主峰灵脉', '丹元峰', '后山禁地',
    '灵药园', '外门广场', '藏经阁', '中央广场',
    '丹房', '迎仙殿', '演武场', '藏宝阁'
  ]
  return locations[Math.floor(Math.random() * locations.length)]
}

// 生成随机消息
const generateRandomMessage = () => {
  const messages = [
    '发现魔修入侵护山大阵，请速速查探',
    '灵脉灵气浓度异常，需及时查看',
    '弟子即将突破瓶颈，需准备结丹室',
    '发现疑似邪修踪迹，需立即调查',
    '新培育的千年灵芝即将成熟',
    '斗法场地出现裂痕，需维修',
    '禁制有异常波动，疑似有人触碰',
    '门派大比即将开始，场地需要准备',
    '炉鼎出现裂纹，需要修复',
    '新一批弟子入门考核即将开始',
    '灵兽园有异兽暴动迹象',
    '阵法能量不稳，需要维护'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

// 生成随机预警
const generateRandomAlert = (id) => {
  const { priority, type } = generateRandomPriority()
  return {
    id,
    type,
    message: generateRandomMessage(),
    location: generateRandomLocation(),
    time: generateRandomTime(),
    status: generateRandomStatus(),
    priority,
    handler: generateRandomHandler()
  }
}

// 生成一组新的预警数据
export const generateNewAlerts = (count = 10) => {
  const alerts = Array.from({ length: count }, (_, index) => 
    generateRandomAlert(index + 1)
  )
  return alerts.sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf())
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

// 初始预警列表数据
export const warningList = generateNewAlerts()

// 快捷操作数据
export const actionList = [
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
]

// 资源趋势数据
export const resourceTrend = [
  { date: '正月', spiritStone: 12800, elixir: 2200, magicWeapon: 150, talisman: 1800 },
  { date: '二月', spiritStone: 13200, elixir: 1820, magicWeapon: 232, talisman: 1850 },
  { date: '三月', spiritStone: 10100, elixir: 1910, magicWeapon: 201, talisman: 1950 },
  { date: '四月', spiritStone: 13400, elixir: 2340, magicWeapon: 154, talisman: 2050 },
  { date: '五月', spiritStone: 9000, elixir: 2900, magicWeapon: 190, talisman: 2200 },
  { date: '六月', spiritStone: 23000, elixir: 3300, magicWeapon: 330, talisman: 2500 }
]
