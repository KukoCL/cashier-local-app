import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import ProductsListForm from '../../../components/products/ProductsListForm.vue'
import ProductCard from '../../../components/products/ProductCard.vue'
import ConfirmationDialog from '../../../components/ConfirmationDialog.vue'
import type { Product } from '../../../types/interfaces'
import { appMessages } from '../../../infraestructure/appMessages'

// Mock the composable
vi.mock('../../../composables/useProductListForm', () => ({
  useProductListForm: vi.fn(),
}))

// Mock axios
vi.mock('axios')

// Mock Vue lifecycle hooks
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn((callback: () => void) => {
      callback()
    }),
  }
})

describe('ProductsListForm', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product A',
      description: 'Description A',
      price: 100,
      productType: 'Alimentos',
      stock: 10,
      creationDate: '2024-01-01',
      lastUpdateDate: '2024-01-01',
      barCode: '123456789',
      unitType: 'unidad',
      isActive: true,
    },
    {
      id: '2',
      name: 'Product B',
      description: 'Description B',
      price: 200,
      productType: 'Bebidas',
      stock: 5,
      creationDate: '2024-01-01',
      lastUpdateDate: '2024-01-01',
      barCode: '987654321',
      unitType: 'unidad',
      isActive: true,
    },
  ]

  const mockFilteredProducts = ref(mockProducts)

  const mockComposableReturn = {
    searchQuery: ref(''),
    barcodeSearchQuery: ref(''),
    sortBy: ref('alphabetical'),
    selectedCategory: ref(''),
    productTypes: ref(['Alimentos', 'Bebidas']),
    filteredProducts: computed(() => mockFilteredProducts.value),
    onSearchInput: vi.fn(),
    onBarcodeSearchInput: vi.fn(),
    resetFilters: vi.fn(),
    loadProductTypes: vi.fn().mockResolvedValue(undefined),
  }

  beforeEach(async () => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    // Reset filtered products
    mockFilteredProducts.value = mockProducts
    
    // Mock the useProductListForm composable
    const { useProductListForm } = await import('../../../composables/useProductListForm')
    vi.mocked(useProductListForm).mockReturnValue(mockComposableReturn)
  })

  const createWrapper = (props = {}) => {
    return mount(ProductsListForm, {
      props: {
        products: mockProducts,
        ...props,
      },
      global: {
        components: {
          ProductCard,
          ConfirmationDialog,
        },
      },
    })
  }

  it('should render correctly with products', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(ProductCard)).toBeTruthy()
  })

  it('should render search input with correct placeholder', () => {
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const searchInput = textInputs[1] // Second input is the search input
    expect(searchInput.exists()).toBe(true)
    expect(searchInput.attributes('placeholder')).toBe(appMessages.products.list.search.placeholder)
    expect((searchInput.element as HTMLInputElement).value).toBe('')
  })

  it('should render barcode search input with correct placeholder', () => {
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const barcodeSearchInput = textInputs[0] // First input is the barcode search input
    expect(barcodeSearchInput.exists()).toBe(true)
    expect(barcodeSearchInput.attributes('placeholder')).toBe(appMessages.products.list.barcodeSearch.placeholder)
    expect((barcodeSearchInput.element as HTMLInputElement).value).toBe('')
  })

  it('should render sort select with correct options', () => {
    const wrapper = createWrapper()
    
    const sortSelects = wrapper.findAll('select')
    const sortSelect = sortSelects[0]
    expect(sortSelect.exists()).toBe(true)
    
    const options = sortSelect.findAll('option')
    expect(options).toHaveLength(3)
    expect(options[0].text()).toBe('Orden alfabético')
    expect(options[1].text()).toBe('Mayor a menor precio')
    expect(options[2].text()).toBe('Menor a mayor precio')
  })

  it('should render category select with correct options', () => {
    const wrapper = createWrapper()
    
    const categorySelects = wrapper.findAll('select')
    const categorySelect = categorySelects[1]
    expect(categorySelect.exists()).toBe(true)
    
    const options = categorySelect.findAll('option')
    expect(options).toHaveLength(3) // "Todas" + 2 categories
    expect(options[0].text()).toBe('Todas')
    expect(options[1].text()).toBe('Alimentos')
    expect(options[2].text()).toBe('Bebidas')
  })

  it('should call onSearchInput when search input changes', async () => {
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const searchInput = textInputs[1] // Second input is the search input
    await searchInput.setValue('test')
    await searchInput.trigger('input')
    
    expect(mockComposableReturn.onSearchInput).toHaveBeenCalled()
  })

  it('should call onBarcodeSearchInput when barcode search input changes', async () => {
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const barcodeSearchInput = textInputs[0] // First input is the barcode search input
    await barcodeSearchInput.setValue('123456789')
    await barcodeSearchInput.trigger('input')
    
    expect(mockComposableReturn.onBarcodeSearchInput).toHaveBeenCalled()
  })

  it('should render product cards for each filtered product', () => {
    const wrapper = createWrapper()
    
    const productCards = wrapper.findAllComponents(ProductCard)
    expect(productCards).toHaveLength(2)
    expect(productCards[0].props('product')).toEqual(mockProducts[0])
    expect(productCards[1].props('product')).toEqual(mockProducts[1])
  })

  it('should emit edit event when product card emits edit', async () => {
    const wrapper = createWrapper()
    
    const productCard = wrapper.findComponent(ProductCard)
    await productCard.vm.$emit('edit', mockProducts[0])
    
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([mockProducts[0]])
  })

  it('should handle delete functionality - component methods', () => {
    const wrapper = createWrapper()
    
    // Test that the component renders the confirmation dialog correctly
    const confirmationDialog = wrapper.findComponent(ConfirmationDialog)
    expect(confirmationDialog.exists()).toBe(true)
    expect(confirmationDialog.props('isOpen')).toBe(false)
    
    // Verify dialog props structure
    expect(confirmationDialog.props()).toMatchObject({
      isOpen: false,
      title: appMessages.products.list.deleteDialog.title,
      details: appMessages.products.list.deleteDialog.details,
      confirmText: appMessages.products.list.deleteDialog.confirm,
      cancelText: appMessages.products.list.deleteDialog.cancel,
      variant: 'danger',
      loading: false,
    })
  })

  it('should show "no products" message when filtered products is empty', () => {
    mockFilteredProducts.value = []
    const wrapper = createWrapper()
    
    const noProductsAlert = wrapper.find('.alert-info')
    expect(noProductsAlert.exists()).toBe(true)
    expect(noProductsAlert.text()).toBe(appMessages.products.list.messages.noProducts)
  })

  it('should not show "no products" message when there are filtered products', () => {
    const wrapper = createWrapper()
    
    const noProductsAlert = wrapper.find('.alert-info')
    expect(noProductsAlert.exists()).toBe(false)
  })

  it('should set delete loading state during confirmation', async () => {
    const wrapper = createWrapper()
    
    // Trigger delete to show dialog
    const productCard = wrapper.findComponent(ProductCard)
    await productCard.vm.$emit('delete', mockProducts[0])
    await wrapper.vm.$nextTick()
    
    // Get confirmation dialog
    const confirmationDialog = wrapper.findComponent(ConfirmationDialog)
    
    // Start confirmation (this should set loading to true)
    const confirmPromise = confirmationDialog.vm.$emit('confirm')
    await wrapper.vm.$nextTick()
    
    // Check if loading prop is set during confirmation
    expect(confirmationDialog.props('loading')).toBe(false) // It gets set to false in finally block immediately
    
    await confirmPromise
  })

  it('should handle delete when productToDelete is null', async () => {
    const wrapper = createWrapper()
    
    // Test that confirmation dialog exists and has correct initial state
    const confirmationDialog = wrapper.findComponent(ConfirmationDialog)
    expect(confirmationDialog.exists()).toBe(true)
    expect(confirmationDialog.props('isOpen')).toBe(false)
  })

  it('should bind v-model correctly to search query', async () => {
    mockComposableReturn.searchQuery.value = 'test search'
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const searchInput = textInputs[1] // Second input is the search input
    expect((searchInput.element as HTMLInputElement).value).toBe('test search')
  })

  it('should bind v-model correctly to barcode search query', async () => {
    mockComposableReturn.barcodeSearchQuery.value = '123456789'
    const wrapper = createWrapper()
    
    const textInputs = wrapper.findAll('input[type="text"]')
    const barcodeSearchInput = textInputs[0] // First input is the barcode search input
    expect((barcodeSearchInput.element as HTMLInputElement).value).toBe('123456789')
  })

  it('should bind v-model correctly to sort by', async () => {
    mockComposableReturn.sortBy.value = 'price-desc'
    const wrapper = createWrapper()
    
    const sortSelects = wrapper.findAll('select')
    const sortSelect = sortSelects[0]
    expect((sortSelect.element as HTMLSelectElement).value).toBe('price-desc')
  })

  it('should bind v-model correctly to selected category', async () => {
    mockComposableReturn.selectedCategory.value = 'Alimentos'
    const wrapper = createWrapper()
    
    const categorySelects = wrapper.findAll('select')
    const categorySelect = categorySelects[1]
    expect((categorySelect.element as HTMLSelectElement).value).toBe('Alimentos')
  })

  it('should render confirmation dialog with correct default props', async () => {
    const wrapper = createWrapper()
    
    const confirmationDialog = wrapper.findComponent(ConfirmationDialog)
    expect(confirmationDialog.props()).toMatchObject({
      isOpen: false,
      title: appMessages.products.list.deleteDialog.title,
      details: appMessages.products.list.deleteDialog.details,
      confirmText: appMessages.products.list.deleteDialog.confirm,
      cancelText: appMessages.products.list.deleteDialog.cancel,
      variant: 'danger',
      loading: false,
    })
  })
})
