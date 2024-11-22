import * as echarts from 'echarts'
import echartsTheme from '@enums/echarts.theme.js'

export function useECharts(chartRef) {
  let chart = null

  const initChart = () => {
    if (!chartRef.value) return
    
    echarts.registerTheme('xianxia-light', echartsTheme)
    chart = echarts.init(chartRef.value, 'xianxia-light')
    
    // 设置图表容器自适应
    chart.setOption({
      grid: {
        containLabel: true
      }
    })
    
    // 初始化时调整尺寸
    chart.resize()
  }

  const updateOptions = (option) => {
    if (!chart) {
      initChart()
    }
    
    // 合并自适应配置
    const defaultOption = {
      grid: {
        containLabel: true
      }
    }
    const mergedOption = {
      ...defaultOption,
      ...option
    }
    
    chart?.setOption(mergedOption, true)
    // 更新后调整尺寸
    chart?.resize()
  }

  const resize = () => {
    chart?.resize()
  }

  const dispose = () => {
    if (chart) {
      chart.dispose()
      chart = null
    }
  }

  return {
    initChart,
    updateOptions,
    resize,
    dispose
  }
}
