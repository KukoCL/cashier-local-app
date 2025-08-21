import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '../../components/BaseCard.vue'

describe('BaseCard', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseCard)

    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('card--default')
    expect(wrapper.classes()).toContain('card--hover')
  })

  it('should render with custom variant', () => {
    const wrapper = mount(BaseCard, {
      props: {
        variant: 'product',
      },
    })

    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('card--product')
    expect(wrapper.classes()).toContain('card--hover')
  })

  it('should render without hover when disabled', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hover: false,
      },
    })

    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('card--default')
    expect(wrapper.classes()).not.toContain('card--hover')
  })

  it('should render slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: '<p>Test content</p>',
      },
    })

    expect(wrapper.html()).toContain('<p>Test content</p>')
  })

  it('should support stat variant', () => {
    const wrapper = mount(BaseCard, {
      props: {
        variant: 'stat',
      },
    })

    expect(wrapper.classes()).toContain('card--stat')
  })
})
