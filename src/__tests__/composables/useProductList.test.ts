import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useProductList } from '../../composables/useProductList'
import type { Product } from '../../types/interfaces'

// Mock axios
vi.mock('axios')

// Mock Vue lifecycle hooks
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn((callback: () => void) => {
      // Execute callback immediately in test environment
      callback()
    }),
  }
})

describe('useProductList', () => {
  const mockProducts = ref<Product[]>([
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
    {
      id: '3',
      name: 'Product C',
      description: 'Description C',
      price: 50,
      productType: 'Alimentos',
      stock: 20,
      creationDate: '2024-01-01',
      lastUpdateDate: '2024-01-01',
      barCode: '456789123',
      unitType: 'unidad',
      isActive: true,
    },
  ])

  beforeEach(() => {
    // Set up Pinia
    setActivePinia(createPinia())
    
    vi.clearAllMocks()
    mockProducts.value = [
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
      {
        id: '3',
        name: 'Product C',
        description: 'Description C',
        price: 50,
        productType: 'Alimentos',
        stock: 20,
        creationDate: '2024-01-01',
        lastUpdateDate: '2024-01-01',
        barCode: '456789123',
        unitType: 'unidad',
        isActive: true,
      },
    ]
  })

  it('should initialize with default filter values', () => {
    const { searchQuery, sortBy, selectedCategory } = useProductList(mockProducts)

    expect(searchQuery.value).toBe('')
    expect(sortBy.value).toBe('alphabetical')
    expect(selectedCategory.value).toBe('')
  })

  it('should filter products by search query after debounce', async () => {
    const { searchQuery, filteredProducts, onSearchInput } = useProductList(mockProducts)

    searchQuery.value = 'Product A'
    onSearchInput()

    // Wait for debounce timeout
    await new Promise(resolve => setTimeout(resolve, 350))

    expect(filteredProducts.value).toHaveLength(1)
    expect(filteredProducts.value[0].name).toBe('Product A')
  })

  it('should filter products by category', () => {
    const { selectedCategory, filteredProducts } = useProductList(mockProducts)

    selectedCategory.value = 'Alimentos'

    expect(filteredProducts.value).toHaveLength(2)
    expect(filteredProducts.value.every(p => p.productType === 'Alimentos')).toBe(true)
  })

  it('should sort products alphabetically by default', () => {
    const { filteredProducts } = useProductList(mockProducts)

    const sortedNames = filteredProducts.value.map(p => p.name)
    expect(sortedNames).toEqual(['Product A', 'Product B', 'Product C'])
  })

  it('should sort products by price descending', () => {
    const { sortBy, filteredProducts } = useProductList(mockProducts)

    sortBy.value = 'price-desc'

    const prices = filteredProducts.value.map(p => p.price)
    expect(prices).toEqual([200, 100, 50])
  })

  it('should sort products by price ascending', () => {
    const { sortBy, filteredProducts } = useProductList(mockProducts)

    sortBy.value = 'price-asc'

    const prices = filteredProducts.value.map(p => p.price)
    expect(prices).toEqual([50, 100, 200])
  })

  it('should reset all filters', () => {
    const { searchQuery, sortBy, selectedCategory, resetFilters } = useProductList(mockProducts)

    // Set some filter values
    searchQuery.value = 'test'
    sortBy.value = 'price-desc'
    selectedCategory.value = 'Alimentos'

    resetFilters()

    expect(searchQuery.value).toBe('')
    expect(sortBy.value).toBe('alphabetical')
    expect(selectedCategory.value).toBe('')
  })

  it('should handle empty products array', () => {
    const emptyProducts = ref<Product[]>([])
    const { filteredProducts } = useProductList(emptyProducts)

    expect(filteredProducts.value).toEqual([])
  })

  it('should load product types from API on mount', async () => {
    const mockProductTypes = ['Alimentos', 'Bebidas', 'ArticulosDeAseo']
    const axiosGet = vi.mocked(axios.get)
    axiosGet.mockResolvedValueOnce({ data: mockProductTypes })

    // Since onMounted is mocked to execute immediately, the loadProductTypes will be called
    const { productTypes } = useProductList(mockProducts)

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(axiosGet).toHaveBeenCalledWith('/api/ProductTypes')
    expect(productTypes.value).toEqual(mockProductTypes)
  })
})
