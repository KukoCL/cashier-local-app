import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MainLayout from '../../../components/layout/MainLayout.vue'

// Mock vue-router
const mockRoute = { path: '/products' }
const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => mockRouter,
}))

// Mock useSidebar composable
vi.mock('../../../composables/useSidebar', () => ({
  useSidebarConfig: vi.fn(() => [
    {
      id: 'products',
      title: 'Products',
      items: [
        { id: 'list', label: 'All Products', icon: '📋', action: 'list' },
      ],
    },
  ]),
}))

describe('MainLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRoute.path = '/products'
  })

  const createWrapper = () => {
    return shallowMount(MainLayout)
  }

  it('should render the main layout structure', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.main-layout').exists()).toBe(true)
    expect(wrapper.find('.layout-content').exists()).toBe(true)
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('should handle navigation from TopBar', async () => {
    const wrapper = createWrapper()

    // Test the handleNavigation method directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(wrapper.vm as any).handleNavigation('products')

    expect(mockRouter.push).toHaveBeenCalledWith('/products')
  })

  it('should handle home navigation', async () => {
    const wrapper = createWrapper()

    // Test the handleNavigation method directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(wrapper.vm as any).handleNavigation('home')

    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  it('should handle side navigation', async () => {
    const wrapper = createWrapper()

    // Test the method directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(wrapper.vm as any).handleSideNavigation('list')

    expect(mockRouter.push).toHaveBeenCalledWith('/products/list')
  })

  it('should handle sidebar item click', async () => {
    const wrapper = createWrapper()

    // Test the method directly - should not throw any errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => (wrapper.vm as any).handleItemClick()).not.toThrow()
  })
})