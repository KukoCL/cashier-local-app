import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SideBar from '../../../components/layout/SideBar.vue'
import type { SidebarSection } from '../../../types/interfaces'

// Mock vue-router
const mockRoute = { path: '/products/list' }

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
}))

describe('SideBar', () => {
  const mockSections: SidebarSection[] = [
    {
      id: 'products',
      title: 'Products',
      items: [
        {
          id: 'products-list',
          label: 'All Products',
          icon: '📋',
          action: 'list',
        },
        {
          id: 'products-create',
          label: 'Add Product',
          icon: '➕',
          action: 'create',
        },
      ],
    },
    {
      id: 'reports',
      title: 'Reports',
      items: [
        {
          id: 'reports-sales',
          label: 'Sales Report',
          icon: '💰',
          action: 'sales',
        },
      ],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockRoute.path = '/products/list'
  })

  const createWrapper = (sections = mockSections) => {
    return mount(SideBar, {
      props: {
        sections,
      },
    })
  }

  it('should render sidebar structure', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.sidebar').exists()).toBe(true)
    expect(wrapper.find('.sidebar-content').exists()).toBe(true)
  })

  it('should render all sections and their titles', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Reports')
  })

  it('should render all menu items', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('📋 All Products')
    expect(wrapper.text()).toContain('➕ Add Product')
    expect(wrapper.text()).toContain('💰 Sales Report')
  })

  it('should emit navigate event when string action item is clicked', async () => {
    const wrapper = createWrapper()

    const listButton = wrapper.find('.sidebar-button')
    await listButton.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['list'])
  })

  it('should emit itemClick event when any item is clicked', async () => {
    const wrapper = createWrapper()

    const listButton = wrapper.find('.sidebar-button')
    await listButton.trigger('click')

    expect(wrapper.emitted('itemClick')).toBeTruthy()
    expect(wrapper.emitted('itemClick')?.[0]).toEqual([mockSections[0].items[0]])
  })

  it('should mark active item based on current route', () => {
    mockRoute.path = '/products/list'
    const wrapper = createWrapper()

    const buttons = wrapper.findAll('.sidebar-button')
    // First button should be active since route contains 'list'
    expect(buttons[0].classes()).toContain('active')
  })

  it('should handle item with custom isActive property', () => {
    const sectionsWithActiveItem: SidebarSection[] = [
      {
        id: 'test',
        title: 'Test',
        items: [
          {
            id: 'test-item',
            label: 'Test Item',
            icon: '🔧',
            action: 'test',
            isActive: true,
          },
        ],
      },
    ]

    const wrapper = createWrapper(sectionsWithActiveItem)

    const button = wrapper.find('.sidebar-button')
    expect(button.classes()).toContain('active')
  })

  it('should handle function action items', async () => {
    const mockFunction = vi.fn()
    const sectionsWithFunction: SidebarSection[] = [
      {
        id: 'test',
        title: 'Test',
        items: [
          {
            id: 'test-function',
            label: 'Test Function',
            icon: '⚡',
            action: mockFunction,
          },
        ],
      },
    ]

    const wrapper = createWrapper(sectionsWithFunction)

    const button = wrapper.find('.sidebar-button')
    await button.trigger('click')

    expect(mockFunction).toHaveBeenCalled()
    expect(wrapper.emitted('itemClick')).toBeTruthy()
    // Should NOT emit navigate for function actions
    expect(wrapper.emitted('navigate')).toBeFalsy()
  })

  it('should handle empty sections gracefully', () => {
    const wrapper = createWrapper([])

    expect(wrapper.find('.sidebar').exists()).toBe(true)
    expect(wrapper.findAll('.sidebar-section')).toHaveLength(0)
  })

  it('should handle sections with no items', () => {
    const emptySections: SidebarSection[] = [
      {
        id: 'empty',
        title: 'Empty Section',
        items: [],
      },
    ]

    const wrapper = createWrapper(emptySections)

    expect(wrapper.text()).toContain('Empty Section')
    expect(wrapper.findAll('.sidebar-button')).toHaveLength(0)
  })

  it('should not mark item as active when route does not match', () => {
    mockRoute.path = '/different/path'
    const wrapper = createWrapper()

    const buttons = wrapper.findAll('.sidebar-button')
    buttons.forEach(button => {
      expect(button.classes()).not.toContain('active')
    })
  })

  it('should render correct number of sections and items', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.sidebar-section')).toHaveLength(2)
    expect(wrapper.findAll('.sidebar-button')).toHaveLength(3)
  })
})
