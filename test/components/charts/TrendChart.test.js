import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrendChart from '@/pages/dashboard/components/charts/TrendChart.vue'

describe('TrendChart.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(TrendChart, {
      props: {
        data: [1, 2, 3, 4, 5],
        color: '#4CAF50'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('initializes chart with correct data', () => {
    const data = [1, 2, 3, 4, 5]
    const wrapper = mount(TrendChart, {
      props: {
        data,
        color: '#4CAF50'
      }
    })
    const chart = wrapper.vm.chartRef
    expect(chart).toBeDefined()
  })

  it('updates chart when data changes', async () => {
    const wrapper = mount(TrendChart, {
      props: {
        data: [1, 2, 3],
        color: '#4CAF50'
      }
    })
    await wrapper.setProps({
      data: [4, 5, 6]
    })
    // 验证更新函数被调用
    expect(wrapper.vm.updateChart).toHaveBeenCalled()
  })

  it('disposes chart on unmount', () => {
    const wrapper = mount(TrendChart, {
      props: {
        data: [1, 2, 3],
        color: '#4CAF50'
      }
    })
    wrapper.unmount()
    // 验证dispose函数被调用
    expect(wrapper.vm.dispose).toHaveBeenCalled()
  })
})
