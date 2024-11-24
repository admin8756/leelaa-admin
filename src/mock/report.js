import dayjs from 'dayjs';

// 妖兽类型
const yokaiTypes = [
  '九尾狐', '天狗', '河童', '座敷童子', '鬼火', '雪女',
  '山童', '天邪鬼', '百目鬼', '大天狗', '酒吞童子', '妖刀姬'
];

// 地点
const locations = [
  '东海龙宫', '昆仑山', '蓬莱仙岛', '方丈山', '瀛洲',
  '花果山', '灵山', '傲来国', '女儿国', '火焰山'
];

// 妖兽类型选项
export const getTypeOptions = () => {
  return [
    { label: '九尾狐', value: 'fox', color: '#FF6B6B' },
    { label: '天狗', value: 'dog', color: '#4ECDC4' },
    { label: '河童', value: 'kappa', color: '#45B7D1' },
    { label: '鬼', value: 'oni', color: '#96CEB4' },
    { label: '天狗', value: 'tengu', color: '#D4A5A5' },
    { label: '雪女', value: 'yuki-onna', color: '#9FA4C4' }
  ]
}

// 危险等级选项
export const getLevelOptions = () => {
  return [
    { label: 'SSS', value: 'sss', color: '#FF0000' },
    { label: 'SS', value: 'ss', color: '#FF4D00' },
    { label: 'S', value: 's', color: '#FF9900' },
    { label: 'A', value: 'a', color: '#FFCC00' },
    { label: 'B', value: 'b', color: '#99CC00' },
    { label: 'C', value: 'c', color: '#00CC00' }
  ]
}

// 区域选项
export const getAreaOptions = () => {
  return [
    { label: '东之国', value: 'east' },
    { label: '南之国', value: 'south' },
    { label: '西之国', value: 'west' },
    { label: '北之国', value: 'north' },
    { label: '中央', value: 'central' }
  ]
}

// 紧急程度选项
export const getUrgencyOptions = () => {
  return [
    { label: '紧急', value: 'urgent', color: '#FF4D4D' },
    { label: '高', value: 'high', color: '#FFA64D' },
    { label: '中', value: 'medium', color: '#FFD700' },
    { label: '低', value: 'low', color: '#90EE90' }
  ]
}

// 标签选项
export const getTagOptions = () => {
  return [
    { label: '群体事件', value: 'group' },
    { label: '单独行动', value: 'single' },
    { label: '有人员伤亡', value: 'injured' },
    { label: '造成破坏', value: 'damaged' },
    { label: '需要支援', value: 'support' },
    { label: '特殊处理', value: 'special' }
  ]
}

// 状态选项
export const getStatusOptions = () => {
  return [
    { label: '待处理', value: 'pending', color: '#FFB020' },
    { label: '处理中', value: 'processing', color: '#54D62C' },
    { label: '已完成', value: 'completed', color: '#00AB55' },
    { label: '已关闭', value: 'closed', color: '#637381' }
  ]
}

// 生成单条记录
const generateReport = (id) => {
  const type = getTypeOptions()[Math.floor(Math.random() * getTypeOptions().length)];
  const level = getLevelOptions()[Math.floor(Math.random() * getLevelOptions().length)];
  const area = getAreaOptions()[Math.floor(Math.random() * getAreaOptions().length)];
  const urgency = getUrgencyOptions()[Math.floor(Math.random() * getUrgencyOptions().length)];
  const tags = getTagOptions().slice(0, Math.floor(Math.random() * getTagOptions().length));
  const status = getStatusOptions()[Math.floor(Math.random() * getStatusOptions().length)];
  
  return {
    id,
    type: type.value,
    level: level.value,
    area: area.value,
    location: locations[Math.floor(Math.random() * locations.length)],
    description: '这是一段妖兽描述，讲述了它的特征和行为...',
    mainImage: 'https://picsum.photos/400/300',
    images: [
      'https://picsum.photos/400/300',
      'https://picsum.photos/400/300'
    ],
    urgency: urgency.value,
    tags: tags.map(tag => tag.value),
    status: status.value,
    reporter: '张三',
    reportTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    signature: '',
    power: Math.floor(Math.random() * 100),
    threat: Math.random() * 5,
    color: type.color
  };
};

// 生成基础数据
const baseData = Array.from({ length: 100 }, (_, index) => generateReport(index + 1));

// 获取列表数据（支持分页和搜索）
export const getReportList = ({ page = 1, pageSize = 10, name = '', status = '', startDate = '', endDate = '' }) => {
  let filteredData = [...baseData];
  
  // 按条件筛选
  if (name) {
    filteredData = filteredData.filter(item => item.name.includes(name));
  }
  if (status) {
    filteredData = filteredData.filter(item => item.status === status);
  }
  if (startDate) {
    filteredData = filteredData.filter(item => item.reportTime >= startDate);
  }
  if (endDate) {
    filteredData = filteredData.filter(item => item.reportTime <= endDate);
  }
  
  // 计算分页
  const total = filteredData.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filteredData.slice(start, end);
  
  return {
    code: 200,
    message: 'success',
    data: {
      list,
      pagination: {
        total,
        page,
        pageSize
      }
    }
  };
};

// 获取详情
export const getReportDetail = (id) => {
  const report = baseData.find(item => item.id === Number(id)) || generateReport(id);
  return {
    code: 200,
    message: 'success',
    data: report
  };
};
