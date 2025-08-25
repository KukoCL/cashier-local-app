import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../../../components/products/ProductCard.vue'
import type { Product } from '../../../types/interfaces'

// Mock BaseCard and ConfirmationDialog components
vi.mock('../../../components/BaseCard.vue', () => ({
  default: {
    name: 'BaseCard',
    template: '<div class="base-card"><slot /></div>',
    props: ['variant'],
  },
}))

vi.mock('../../../components/ConfirmationDialog.vue', () => ({
  default: {
    name: 'ConfirmationDialog',
    template: '<div class="confirmation-dialog" v-if="isOpen">Mock Dialog</div>',
    props: ['isOpen', 'title', 'message', 'details', 'confirmText', 'cancelText', 'variant', 'loading'],
    emits: ['confirm', 'cancel'],
  },
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

describe('ProductCard', () => {
  it('should render product information', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('Test Description')
    expect(wrapper.text()).toContain('123456789')
    expect(wrapper.text()).toContain('10 unit')
    expect(wrapper.text()).toContain('electronics')
  })

  it('should format price correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    expect(wrapper.text()).toContain('$1.000')
  })

  it('should emit edit event when edit button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    await wrapper.find('.edit-btn').trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([mockProduct])
  })

  it('should show delete confirmation when delete button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    await wrapper.find('.delete-btn').trigger('click')

    // Check if the confirmation dialog is shown
    expect(wrapper.find('.confirmation-dialog').exists()).toBe(true)
  })

  it('should handle product without description', () => {
    const productWithoutDesc = { ...mockProduct, description: '' }
    const wrapper = mount(ProductCard, {
      props: {
        product: productWithoutDesc,
      },
    })

    expect(wrapper.find('.product-description').exists()).toBe(false)
  })

  it('should handle product without barcode', () => {
    const productWithoutCode = { ...mockProduct, barCode: '' }
    const wrapper = mount(ProductCard, {
      props: {
        product: productWithoutCode,
      },
    })

    expect(wrapper.text()).toContain('Sin código')
  })

  it('should handle delete confirmation flow', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    // Open delete confirmation
    await wrapper.find('.delete-btn').trigger('click')

    // Simulate confirming delete via the dialog component
    const confirmationDialog = wrapper.findComponent({ name: 'ConfirmationDialog' })
    await confirmationDialog.vm.$emit('confirm')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([mockProduct])
  })
})
