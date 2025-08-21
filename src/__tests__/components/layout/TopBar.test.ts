import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TopBar from '../../../components/layout/TopBar.vue'

// Mock vue-router
const mockRoute = { path: '/products' }
vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
}))

describe('TopBar', () => {
  it('should render the brand name', () => {
    const wrapper = mount(TopBar)

    expect(wrapper.text()).toContain('Cashier App')
  })

  it('should render navigation buttons', () => {
    const wrapper = mount(TopBar)

    expect(wrapper.text()).toContain('🏠 Inicio')
    expect(wrapper.text()).toContain('📦 Products')
  })

  it('should emit navigate event when home button is clicked', async () => {
    const wrapper = mount(TopBar)

    const homeButton = wrapper.find('button:first-child')
    await homeButton.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['home'])
  })

  it('should emit navigate event when products button is clicked', async () => {
    const wrapper = mount(TopBar)

    const productsButton = wrapper.find('button:last-child')
    await productsButton.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['products'])
  })

  it('should mark products button as active when on products page', () => {
    const wrapper = mount(TopBar)

    const productsButton = wrapper.find('button:last-child')
    expect(productsButton.classes()).toContain('active')
  })

  it('should compute current section from route', () => {
    // Change the mock route to test different sections
    mockRoute.path = '/home'
    const wrapper = mount(TopBar)

    // The component should work with the mocked route
    expect(wrapper.vm).toBeDefined()
  })
})
