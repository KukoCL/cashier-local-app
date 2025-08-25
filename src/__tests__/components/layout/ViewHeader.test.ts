import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ViewHeader from '../../../components/ViewHeader.vue'

describe('ViewHeader', () => {
  it('should render with required title prop', () => {
    const title = 'Test Page Title'
    const wrapper = mount(ViewHeader, {
      props: {
        title,
      },
    })

    expect(wrapper.find('h1').text()).toBe(title)
    expect(wrapper.classes()).toContain('view-header')
  })

  it('should render different titles correctly', () => {
    const testCases = [
      'Home Page',
      'Products List',
      'Create Product',
      'User Settings',
      'Dashboard Overview',
    ]

    testCases.forEach((title) => {
      const wrapper = mount(ViewHeader, {
        props: {
          title,
        },
      })

      expect(wrapper.find('h1').text()).toBe(title)
    })
  })

  it('should render empty title when provided', () => {
    const wrapper = mount(ViewHeader, {
      props: {
        title: '',
      },
    })

    expect(wrapper.find('h1').text()).toBe('')
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('should render title with special characters', () => {
    const specialTitle = 'Título con Ñ & Símbolos - 123!'
    const wrapper = mount(ViewHeader, {
      props: {
        title: specialTitle,
      },
    })

    expect(wrapper.find('h1').text()).toBe(specialTitle)
  })

  it('should render title with HTML entities correctly', () => {
    const titleWithEntities = 'Products & Services'
    const wrapper = mount(ViewHeader, {
      props: {
        title: titleWithEntities,
      },
    })

    expect(wrapper.find('h1').text()).toBe(titleWithEntities)
  })

  it('should handle long titles', () => {
    const longTitle = 'This is a very long title that might need to be handled differently in the UI ' +
      'but should still render correctly in the component'
    const wrapper = mount(ViewHeader, {
      props: {
        title: longTitle,
      },
    })

    expect(wrapper.find('h1').text()).toBe(longTitle)
  })

  it('should maintain accessibility with proper heading structure', () => {
    const wrapper = mount(ViewHeader, {
      props: {
        title: 'Accessible Title',
      },
    })

    const h1Element = wrapper.find('h1')
    expect(h1Element.exists()).toBe(true)
    expect(h1Element.text()).toBe('Accessible Title')
  })
})
