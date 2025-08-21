import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProductsStore } from '../../stores/products'
import axios from 'axios'
import type { Product } from '../../types/interfaces'

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

const mockProducts: Product[] = [
  mockProduct,
  {
    ...mockProduct,
    id: '2',
    name: 'Inactive Product',
    isActive: false,
  },
]

describe('useProductsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = useProductsStore()
      
      expect(store.products).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
    })
  })

  describe('getters', () => {
    it('should return active products correctly', () => {
      const store = useProductsStore()
      store.products = mockProducts
      
      expect(store.activeProducts).toHaveLength(1)
      expect(store.activeProducts[0].isActive).toBe(true)
    })

    it('should find product by id', () => {
      const store = useProductsStore()
      store.products = mockProducts
      
      const product = store.getProductById('1')
      expect(product).toEqual(mockProduct)
    })

    it('should find product by barcode', () => {
      const store = useProductsStore()
      store.products = mockProducts
      
      const product = store.getProductByBarcode('123456789')
      expect(product).toEqual(mockProduct)
    })

    it('should return correct product counts', () => {
      const store = useProductsStore()
      store.products = mockProducts
      
      expect(store.productCount).toBe(2)
      expect(store.activeProductCount).toBe(1)
    })
  })

  describe('actions', () => {
    it('should load products successfully', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockResolvedValue({ data: mockProducts })
      
      await store.loadProducts()
      
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
      expect(store.products).toEqual(mockProducts)
    })

    it('should handle loading error', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      const errorMessage = 'Network error'
      axiosGet.mockRejectedValue(new Error(errorMessage))
      
      await store.loadProducts()
      
      expect(store.loading).toBe(false)
      expect(store.error).toBe(errorMessage)
    })

    it('should fetch product by id successfully', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockResolvedValue({ data: mockProduct })
      
      const result = await store.fetchProductById('1')
      
      expect(result).toEqual(mockProduct)
      expect(store.products).toHaveLength(1)
      expect(store.products[0]).toEqual(mockProduct)
    })

    it('should fetch product by barcode successfully', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockResolvedValue({ data: mockProduct })
      
      const result = await store.fetchProductByBarcode('123456789')
      
      expect(result).toEqual(mockProduct)
      expect(store.products).toHaveLength(1)
      expect(store.products[0]).toEqual(mockProduct)
    })

    it('should handle fetch product by id error', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockRejectedValue(new Error('Not found'))
      
      const result = await store.fetchProductById('1')
      
      expect(result).toBeNull()
    })

    it('should handle fetch product by barcode error', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockRejectedValue(new Error('Not found'))
      
      const result = await store.fetchProductByBarcode('123456789')
      
      expect(result).toBeNull()
    })

    it('should create product successfully', async () => {
      const store = useProductsStore()
      const axiosPost = vi.mocked(axios.post)
      const newProduct = {
        name: 'New Product',
        description: 'Description',
        price: 500,
        barCode: '987654321',
        stock: 5,
        productType: 'electronics',
        unitType: 'unit',
      }
      axiosPost.mockResolvedValue({ data: { ...mockProduct, ...newProduct } })
      
      const result = await store.createProduct(newProduct)
      
      expect(result).toBe(true)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
    })

    it('should handle create product error', async () => {
      const store = useProductsStore()
      const axiosPost = vi.mocked(axios.post)
      const newProduct = {
        name: 'New Product',
        description: 'Description',
        price: 500,
        barCode: '987654321',
        stock: 5,
        productType: 'electronics',
        unitType: 'unit',
      }
      axiosPost.mockRejectedValue(new Error('Create error'))
      
      const result = await store.createProduct(newProduct)
      
      expect(result).toBe(false)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Create error')
    })

    it('should update product successfully', async () => {
      const store = useProductsStore()
      store.products = [mockProduct]
      const axiosPut = vi.mocked(axios.put)
      const updateProduct = { ...mockProduct, name: 'Updated Product' }
      axiosPut.mockResolvedValue({ data: updateProduct })
      
      const result = await store.updateProduct(updateProduct)
      
      expect(result).toBe(true)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
      expect(store.products[0].name).toBe('Updated Product')
    })

    it('should handle update product error', async () => {
      const store = useProductsStore()
      const axiosPut = vi.mocked(axios.put)
      const updateProduct = { ...mockProduct, name: 'Updated Product' }
      axiosPut.mockRejectedValue(new Error('Update error'))
      
      const result = await store.updateProduct(updateProduct)
      
      expect(result).toBe(false)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Update error')
    })

    it('should delete product successfully', async () => {
      const store = useProductsStore()
      store.products = [mockProduct]
      const axiosDelete = vi.mocked(axios.delete)
      axiosDelete.mockResolvedValue({})
      
      const result = await store.deleteProduct('1')
      
      expect(result).toBe(true)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
      expect(store.products).toHaveLength(0)
    })

    it('should handle delete product error', async () => {
      const store = useProductsStore()
      const axiosDelete = vi.mocked(axios.delete)
      axiosDelete.mockRejectedValue(new Error('Delete error'))
      
      const result = await store.deleteProduct('1')
      
      expect(result).toBe(false)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Delete error')
    })

    it('should refresh from database', async () => {
      const store = useProductsStore()
      const axiosGet = vi.mocked(axios.get)
      axiosGet.mockResolvedValue({ data: mockProducts })
      
      await store.refreshFromDatabase()
      
      expect(store.products).toEqual(mockProducts)
    })

    it('should clear error state', () => {
      const store = useProductsStore()
      store.error = 'Some error'
      
      store.clearError()
      
      expect(store.error).toBe('')
    })

    it('should reset store to initial state', () => {
      const store = useProductsStore()
      store.products = mockProducts
      store.loading = true
      store.error = 'Some error'
      
      store.resetStore()
      
      expect(store.products).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
    })
  })
})
