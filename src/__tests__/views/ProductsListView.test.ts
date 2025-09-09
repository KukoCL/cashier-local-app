import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ProductsListView from '../../views/products/ProductsListView.vue'

// Mock the router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the products composable
const mockLoadProducts = vi.fn()
const mockDeleteProduct = vi.fn()

vi.mock('../../composables/useProducts', () => ({
  useProducts: () => ({
    products: { value: [] },
    loading: { value: false },
    error: { value: '' },
    loadProducts: mockLoadProducts,
    deleteProduct: mockDeleteProduct,
  }),
}))

// Mock the ProductsListForm component
vi.mock('../../components/products/ProductsListForm.vue', () => ({
  default: {
    name: 'ProductsListForm',
    template: '<div class="products-list-form"></div>',
    props: ['products'],
    emits: ['edit', 'delete', 'stockUpdated'],
  },
}))

describe('ProductsListView', () => {
  it('should render successfully', () => {
    const wrapper = shallowMount(ProductsListView)
    expect(wrapper.exists()).toBe(true)
  })

  it('should call loadProducts when stock is updated', async () => {
    const wrapper = shallowMount(ProductsListView)
    
    // Find the ProductsListForm component and emit stockUpdated event
    const productsListForm = wrapper.findComponent({ name: 'ProductsListForm' })
    await productsListForm.vm.$emit('stockUpdated')

    expect(mockLoadProducts).toHaveBeenCalled()
  })

  it('should handle delete product', async () => {
    mockDeleteProduct.mockResolvedValue(true)
    
    const wrapper = shallowMount(ProductsListView)
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 100,
      stock: 10,
      isActive: true,
    }

    // Find the ProductsListForm component and emit delete event
    const productsListForm = wrapper.findComponent({ name: 'ProductsListForm' })
    await productsListForm.vm.$emit('delete', mockProduct)

    expect(mockDeleteProduct).toHaveBeenCalledWith('1')
  })
})
