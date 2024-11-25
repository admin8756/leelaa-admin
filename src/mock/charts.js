// 生成随机数据
const generateRandomData = (min, max, count) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// 修真资源分配数据
export const resourceData = {
  xAxis: ['一月', '二月', '三月', '四月', '五月', '六月'],
  series: [
    {
      name: '灵石',
      data: generateRandomData(1000, 5000, 6)
    },
    {
      name: '丹药',
      data: generateRandomData(100, 500, 6)
    },
    {
      name: '法器',
      data: generateRandomData(50, 200, 6)
    }
  ]
}

// 宗门财务统计数据
export const financeData = {
  xAxis: ['第一季度', '第二季度', '第三季度', '第四季度'],
  series: [
    {
      name: '收入',
      data: generateRandomData(50000, 100000, 4)
    },
    {
      name: '支出',
      data: generateRandomData(30000, 80000, 4)
    }
  ]
}

// 修炼进度跟踪数据
export const progressData = {
  xAxis: ['一月', '二月', '三月', '四月', '五月', '六月'],
  series: [
    {
      name: '功法修炼',
      data: generateRandomData(60, 100, 6)
    },
    {
      name: '法器炼制',
      data: generateRandomData(50, 90, 6)
    }
  ]
}

// 灵气浓度监测数据
export const spiritData = {
  xAxis: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  series: [
    {
      name: '主峰',
      data: generateRandomData(60, 100, 8)
    },
    {
      name: '平均值',
      data: generateRandomData(70, 90, 8)
    }
  ]
}
