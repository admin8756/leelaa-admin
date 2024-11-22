import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectRanking from '@/pages/dashboard/components/SectRanking.vue'
import { createPinia, setActivePinia } from 'pinia'
import { sects } from '@/mock/sect'

describe('SectRanking.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(SectRanking)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays correct number of sects', () => {
    const wrapper = mount(SectRanking)
    const sectItems = wrapper.findAll('.sect-item')
    expect(sectItems).toHaveLength(sects.length)
  })

  it('sorts sects by rank correctly', () => {
    const wrapper = mount(SectRanking)
    const sectNames = wrapper.findAll('.sect-name').map(el => el.text())
    const sortedSects = [...sects].sort((a, b) => {
      const aScore = (a.power + a.influence + a.resources + a.cultivation + a.reputation) / 5
      const bScore = (b.power + b.influence + b.resources + b.cultivation + b.reputation) / 5
      return bScore - aScore
    })
    const expectedNames = sortedSects.map(sect => sect.name)
    expect(sectNames).toEqual(expectedNames)
  })

  it('opens detail modal on sect click', async () => {
    const wrapper = mount(SectRanking)
    const firstSect = wrapper.find('.sect-item')
    await firstSect.trigger('click')
    const modal = wrapper.find('.sect-detail-modal')
    expect(modal.exists()).toBe(true)
  })

  it('displays correct sect details in modal', async () => {
    const wrapper = mount(SectRanking)
    const firstSect = wrapper.find('.sect-item')
    await firstSect.trigger('click')
    const modal = wrapper.find('.sect-detail-modal')
    const sect = sects[0]
    expect(modal.find('.sect-name').text()).toBe(sect.name)
    expect(modal.find('.sect-description').text()).toBe(sect.description)
    expect(modal.find('.sect-specialty').text()).toBe(sect.specialty)
  })
})
