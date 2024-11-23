import * as echarts from 'echarts'
import xianxiaTheme from '@enums/echarts.theme.js'

// 注册主题
echarts.registerTheme('xianxia-light', xianxiaTheme)

/**
 * ECharts Hook
 * @param {Object} options - 配置项
 * @param {String} theme - 主题名称
 * @returns {Object} - ECharts实例和更新方法
 */
export const useECharts = (domRef, options = {}, theme = 'xianxia-light') => {
  let chart = null

  // 初始化图表
  const initChart = () => {
    if (!domRef.value) return
    
    chart = echarts.init(domRef.value, theme)
    if (options) {
      chart.setOption(options)
    }
  }

  // 更新配置
  const updateOptions = (newOptions, notMerge = false) => {
    if (chart) {
      chart.setOption(newOptions, notMerge)
    }
  }

  // 调整大小
  const resize = () => {
    chart?.resize()
  }

  // 销毁图表
  const dispose = () => {
    if (chart) {
      chart.dispose()
      chart = null
    }
  }

  return {
    chart,
    initChart,
    updateOptions,
    resize,
    dispose
  }
}

// 导出主题名称常量
export const THEME_XIANXIA_LIGHT = 'xianxia-light'
