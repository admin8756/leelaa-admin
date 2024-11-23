// 生成随机天气数据
export const generateWeatherData = () => ({
  location: '蜀山剑宗',
  updateTime: '子时已过，丑时未央',
  current: {
    temp: Math.floor(15 + Math.random() * 15), // 15-30度之间
    weather: ['晴', '多云', '阴', '小雨'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(50 + Math.random() * 40), // 50-90%
    windSpeed: Math.floor(1 + Math.random() * 6), // 1-6级
    precipitation: Math.floor(Math.random() * 10), // 0-10mm
    high: Math.floor(25 + Math.random() * 5), // 25-30度
    low: Math.floor(15 + Math.random() * 5)  // 15-20度
  },
  forecast: [
    { day: '明日', weather: '多云', high: 25, low: 17 },
    { day: '后日', weather: '小雨', high: 22, low: 16 },
    { day: '三日后', weather: '晴', high: 24, low: 15 },
    { day: '四日后', weather: '晴', high: 26, low: 17 }
  ]
})

// 语音消息模拟数据
export const voiceMessageMock = {
  url: '/assets/audio/meditation.mp3',
  duration: 30,
  transcription: '道友，此处风景甚好，不如驻足一叙？'
}

// 图片消息模拟数据
export const imageMessageMock = {
  url: 'https://picsum.photos/800/600',
  thumbnail: 'https://picsum.photos/400/300',
  description: '修真界奇景'
}

// 视频消息模拟数据
export const videoMessageMock = {
  url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnail: 'https://picsum.photos/800/450',
  duration: 128,
  title: '御剑飞行教学',
  description: '初学者必看的御剑技巧'
}

// 音乐消息模拟数据
export const musicMessageMock = {
  title: '太上忘情',
  artist: '蜀山音律堂',
  album: '道法自然',
  url: '/assets/audio/meditation.mp3',
  lyrics: '悠悠太上道，渺渺忘情时。\n云深无觅处，心静自相知。'
}

// 位置消息模拟数据
export const locationMessageMock = {
  name: '蜀山剑宗主峰',
  address: '蜀山之巅，云海之上',
  latitude: 30.5728,
  longitude: 104.0668,
  image: 'https://picsum.photos/800/400'
}

// 链接消息模拟数据
export const linkMessageMock = {
  url: 'https://example.com/cultivation-guide',
  title: '修真入门指南',
  description: '包含基础功法、心法要诀、丹药炼制等内容',
  image: 'https://picsum.photos/400/300'
}

// 文件消息模拟数据
export const fileMessageMock = {
  name: '太上道典.pdf',
  size: 2.5 * 1024 * 1024,
  type: 'application/pdf',
  url: '#'
}

// 联系人消息模拟数据
export const contactMessageMock = {
  name: '青云子',
  title: '蜀山剑宗长老',
  avatar: 'https://picsum.photos/100/100',
  level: '渡劫期',
  contact: 'qingyunzi@shushan.com'
}

// 引用消息模拟数据
export const quoteMessageMock = {
  text: '道可道，非常道；名可名，非常名。',
  author: '太上老君',
  source: '道德经'
}
