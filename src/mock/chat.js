// 消息类型枚举
export const MessageType = {
  TEXT: 'text',
  IMAGE: 'image',
  LOCATION: 'location',
  VOICE: 'voice',
  WEATHER: 'weather',
  MAP: 'map',
  VIDEO: 'video',
  MUSIC: 'music',
  CONTACT: 'contact',
  QUOTE: 'quote',
  LINK: 'link',
  FILE: 'file'
}

// 模拟用户数据
export const users = [
  {
    id: 1,
    name: '太上长老',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1',
    level: '渡劫期',
    status: 'online'
  },
  {
    id: 2,
    name: '青云子',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=2',
    level: '化神期',
    status: 'online'
  }
]

// 模拟聊天记录
export const chatHistory = [
  {
    id: 1,
    type: MessageType.TEXT,
    content: '道友，可有空闲？',
    sender: users[0],
    timestamp: '2024-01-20 10:00:00'
  },
  {
    id: 2,
    type: MessageType.IMAGE,
    content: {
      url: 'https://picsum.photos/400/300',
      thumbnail: 'https://picsum.photos/100/75',
      description: '这是我新炼制的丹药'
    },
    sender: users[1],
    timestamp: '2024-01-20 10:01:00'
  },
  {
    id: 3,
    type: MessageType.LOCATION,
    content: {
      latitude: 34.2104,
      longitude: 108.8838,
      address: '终南山',
      name: '太乙宗道场'
    },
    sender: users[0],
    timestamp: '2024-01-20 10:02:00'
  },
  {
    id: 4,
    type: MessageType.VOICE,
    content: {
      url: '/mock/audio/message.mp3',
      duration: 15, // 秒
      transcription: '此处灵气充沛，适合修炼' // 可选的语音转文字
    },
    sender: users[1],
    timestamp: '2024-01-20 10:03:00'
  },
  {
    id: 5,
    type: MessageType.WEATHER,
    content: {
      location: '终南山',
      updateTime: '戌时已至，亥时将临',
      current: {
        temp: 18,
        weather: '晴',
        humidity: 65,
        windSpeed: 3,
        precipitation: 0,
        high: 22,
        low: 15
      },
      forecast: [
        { day: '明日', weather: '多云', high: 20, low: 12 },
        { day: '后日', weather: '晴', high: 22, low: 13 },
        { day: '三日后', weather: '小雨', high: 19, low: 11 },
        { day: '四日后', weather: '晴', high: 21, low: 14 }
      ]
    },
    sender: users[0],
    timestamp: '2024-01-20 10:04:00'
  },
  {
    id: 6,
    type: MessageType.MAP,
    content: {
      center: [108.8838, 34.2104],
      zoom: 12,
      markers: [
        {
          position: [108.8838, 34.2104],
          title: '太乙宗道场'
        }
      ],
      style: 'satellite' // 卫星图
    },
    sender: users[1],
    timestamp: '2024-01-20 10:05:00'
  },
  {
    id: 7,
    type: MessageType.VIDEO,
    content: {
      url: '/mock/video/cultivation.mp4',
      thumbnail: '/mock/images/video-thumb.jpg',
      duration: 180,
      title: '玄天功修炼要诀'
    },
    sender: users[0],
    timestamp: '2024-01-20 10:06:00'
  },
  {
    id: 8,
    type: MessageType.MUSIC,
    content: {
      url: '/mock/audio/meditation.mp3',
      title: '太乙清心曲',
      artist: '道宗古籍',
      cover: '/mock/images/music-cover.jpg',
      duration: 300
    },
    sender: users[1],
    timestamp: '2024-01-20 10:07:00'
  },
  {
    id: 9,
    type: MessageType.CONTACT,
    content: {
      name: '青云子',
      title: '蜀山剑宗长老',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=2',
      level: '渡劫期',
      contact: 'qingyunzi@shushan.com'
    },
    sender: users[0],
    timestamp: '2024-01-20 10:08:00'
  },
  {
    id: 10,
    type: MessageType.QUOTE,
    content: {
      text: '道可道，非常道；名可名，非常名。',
      author: '太上老君',
      source: '道德经'
    },
    sender: users[1],
    timestamp: '2024-01-20 10:09:00'
  },
  {
    id: 11,
    type: MessageType.LINK,
    content: {
      url: 'https://www.xiuxian.com/artifacts',
      title: '太上秘传法宝大全',
      description: '收录上古至今各派法宝，包含炼制之法、使用心得及实战经验。',
      image: 'https://picsum.photos/200/200'
    },
    sender: users[0],
    timestamp: '2024-01-20 10:10:00'
  },
  {
    id: 12,
    type: MessageType.FILE,
    content: {
      name: '太上道法总纲.pdf',
      type: 'application/pdf',
      size: 2457600, // 2.4MB
      url: 'https://example.com/taishang-daofa.pdf'
    },
    sender: users[1],
    timestamp: '2024-01-20 10:11:00'
  }
]

// 快捷回复选项
export const quickReplies = [
  {
    id: 1,
    type: 'text',
    content: '道友请讲',
    icon: 'clarity:talk-bubbles-line'
  },
  {
    id: 2,
    type: 'location',
    content: '分享当前位置',
    icon: 'mdi:location'
  },
  {
    id: 3,
    type: 'weather',
    content: '查看天气',
    icon: 'carbon:weather'
  }
]

// 表情包分类
export const emojiCategories = [
  {
    id: 'recent',
    name: '最近使用',
    emojis: ['🙏', '⚡️', '🔮', '✨', '🌟', '💫', '🌙']
  },
  {
    id: 'cultivation',
    name: '修仙',
    emojis: ['⚔️', '🗡️', '🏹', '🛡️', '📜', '🪔', '⚱️', '🎭']
  },
  {
    id: 'nature',
    name: '自然',
    emojis: ['🌺', '🌸', '🍃', '🌿', '🌱', '🌳', '🌴', '🌵']
  }
]
