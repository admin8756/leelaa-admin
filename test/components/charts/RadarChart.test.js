import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RadarChart from '@/pages/dashboard/components/charts/RadarChart.vue'

describe('RadarChart.vue', () => {
  const mockData = [80, 85, 90, 75, 88]
  const mockIndicators = [
    { name: '实力', max: 100 },
    { name: '影响力', max: 100 },
    { name: '资源', max: 100 },
    { name: '修为', max: 100 },
    { name: '声望', max: 100 }
  ]

  it('renders properly', () => {
    const wrapper = mount(RadarChart, {
      props: {
        data: mockData,
        indicators: mockIndicators,
        color: '#4CAF50'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('initializes chart with correct data', () => {
    const wrapper = mount(RadarChart, {
      props: {
        data: mockData,
        indicators: mockIndicators,
        color: '#4CAF50'
      }
    })
    const chart = wrapper.vm.chartRef
    expect(chart).toBeDefined()
  })

  it('updates chart when data changes', async () => {
    const wrapper = mount(RadarChart, {
      props: {
        data: mockData,
        indicators: mockIndicators,
        color: '#4CAF50'
      }
    })
    const newData = [85, 90, 95, 80, 93]
    await wrapper.setProps({
      data: newData
    })
    // 验证更新函数被调用
    expect(wrapper.vm.updateChart).toHaveBeenCalled()
  })

  it('updates chart when indicators change', async () => {
    const wrapper = mount(RadarChart, {
      props: {
        data: mockData,
        indicators: mockIndicators,
        color: '#4CAF50'
      }
    })
    const newIndicators = [
      { name: '战力', max: 100 },
      { name: '地位', max: 100 },
      { name: '财富', max: 100 },
      { name: '境界', max: 100 },
      { name: '名望', max: 100 }
    ]
    await wrapper.setProps({
      indicators: newIndicators
    })
    // 验证更新函数被调用
    expect(wrapper.vm.updateChart).toHaveBeenCalled()
  })

  it('disposes chart on unmount', () => {
    const wrapper = mount(RadarChart, {
      props: {
        data: mockData,
        indicators: mockIndicators,
        color: '#4CAF50'
      }
    })
    wrapper.unmount()
    // 验证dispose函数被调用
    expect(wrapper.vm.dispose).toHaveBeenCalled()
  })
})
