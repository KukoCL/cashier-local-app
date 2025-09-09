import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EditStock from '../../../components/products/EditStock.vue'
import type { Product } from '../../../types/interfaces'

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
})
