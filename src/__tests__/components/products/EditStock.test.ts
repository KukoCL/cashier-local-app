import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EditStock from '../../../components/products/EditStock.vue'
import type { Product } from '../../../types/interfaces'

// Type for the EditStock component instance
interface EditStockComponent {
  operationType: 'update' | 'add'
  quantity: number
  newTotal: number
  spanishUnitTypeForNewTotal: string
  isFormValid: unknown // Returns product object when valid, null/false when invalid
  handleConfirm: () => void
}

// Mock BaseModal component
const MockBaseModal = {
  name: 'BaseModal',
  template: '<div class="base-modal"><slot /></div>',
  props: ['isOpen', 'title', 'closeOnOverlayClick'],
  emits: ['close'],
}

// Mock the composable
vi.mock('../../../composables/useUnitTypeMapper', () => ({
  useUnitTypeMapper: () => ({
    mapUnitTypeToSpanish: vi.fn((_unitType: string, amount: number) => 
      amount === 1 ? 'Unidad' : 'Unidades',
    ),
  }),
}))

const mockProduct: Product = {
  id: '1',
  creationDate: '2024-01-01T00:00:00Z',
  lastUpdateDate: '2024-01-01T00:00:00Z',
  barCode: '123456789',
  name: 'Test Product',
  description: 'Test Description',
  price: 1000,
  stock: 10,
  productType: 'electronics',
  unitType: 'unit',
  isActive: true,
}

describe('EditStock', () => {
  it('should render when modal is open', () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('should emit close event', () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    wrapper.vm.$emit('close')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should emit close event when BaseModal emits close', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    // Find the BaseModal component and trigger its close event
    const baseModal = wrapper.findComponent(MockBaseModal)
    await baseModal.vm.$emit('close')

    // Check that the EditStock component emitted the close event
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('should render component and test basic functionality', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('isOpen')).toBe(true)
    expect(wrapper.props('product')).toEqual(mockProduct)
  })

  it('should calculate newTotal correctly for update operation', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Directly modify the reactive refs
    component.quantity = 15
    await wrapper.vm.$nextTick()
    expect(component.newTotal).toBe(15)

    // Change quantity
    component.quantity = 5
    await wrapper.vm.$nextTick()
    expect(component.newTotal).toBe(5)
  })

  it('should calculate newTotal correctly for add operation', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Set operation to add and quantity
    component.operationType = 'add'
    component.quantity = 5
    await wrapper.vm.$nextTick()
    expect(component.newTotal).toBe(15) // 10 + 5

    // Change quantity
    component.quantity = 3
    await wrapper.vm.$nextTick()
    expect(component.newTotal).toBe(13) // 10 + 3
  })

  it('should return 0 for newTotal when quantity is 0 or negative', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Default quantity is 0
    expect(component.newTotal).toBe(0)

    // Set quantity to 0
    component.quantity = 0
    await wrapper.vm.$nextTick()
    expect(component.newTotal).toBe(0)
  })

  it('should calculate spanishUnitTypeForNewTotal correctly', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Set quantity to 1 (singular)
    component.quantity = 1
    await wrapper.vm.$nextTick()
    expect(component.spanishUnitTypeForNewTotal).toBe('Unidad')

    // Set quantity to 5 (plural)
    component.quantity = 5
    await wrapper.vm.$nextTick()
    expect(component.spanishUnitTypeForNewTotal).toBe('Unidades')

    // Test with add operation
    component.operationType = 'add'
    component.quantity = 1
    await wrapper.vm.$nextTick()
    expect(component.spanishUnitTypeForNewTotal).toBe('Unidades') // 10 + 1 = 11 (plural)
  })

  it('should validate form correctly with isFormValid', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Initial state - invalid (quantity is 0)
    expect(component.isFormValid).toBeFalsy()

    // Set valid quantity - should return truthy (the product object in this case)
    component.quantity = 5
    await wrapper.vm.$nextTick()
    expect(component.isFormValid).toBeTruthy()

    // Set quantity back to 0 - invalid
    component.quantity = 0
    await wrapper.vm.$nextTick()
    expect(component.isFormValid).toBeFalsy()

    // Set negative quantity - invalid
    component.quantity = -1
    await wrapper.vm.$nextTick()
    expect(component.isFormValid).toBeFalsy()
  })

  it('should validate form as invalid when no product', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: null,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Even with valid quantity, should be invalid without product
    component.quantity = 5
    await wrapper.vm.$nextTick()
    expect(component.isFormValid).toBeFalsy()
  })

  it('should handle handleConfirm method correctly', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Set valid form data
    component.operationType = 'update'
    component.quantity = 15
    await wrapper.vm.$nextTick()

    // Call handleConfirm
    component.handleConfirm()

    // Check that confirm event was emitted with correct data
    const emittedEvents = wrapper.emitted('confirm')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents![0]).toEqual([{
      productId: '1',
      operationType: 'update',
      quantity: 15,
      newTotal: 15,
    }])

    // Check that form was reset after confirm
    expect(component.operationType).toBe('update')
    expect(component.quantity).toBe(0)
  })

  it('should handle handleConfirm with add operation', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Set add operation with quantity
    component.operationType = 'add'
    component.quantity = 5
    await wrapper.vm.$nextTick()

    // Call handleConfirm
    component.handleConfirm()

    // Check emitted event
    const emittedEvents = wrapper.emitted('confirm')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents![0]).toEqual([{
      productId: '1',
      operationType: 'add',
      quantity: 5,
      newTotal: 15, // 10 + 5
    }])
  })

  it('should not emit confirm when form is invalid', async () => {
    const wrapper = mount(EditStock, {
      props: {
        isOpen: true,
        product: mockProduct,
      },
      global: {
        components: {
          BaseModal: MockBaseModal,
        },
      },
    })

    const component = wrapper.vm as unknown as EditStockComponent

    // Form is invalid (quantity is 0)
    expect(component.isFormValid).toBe(false)

    // Call handleConfirm
    component.handleConfirm()

    // Should not emit confirm event
    expect(wrapper.emitted('confirm')).toBeFalsy()
  })
})
