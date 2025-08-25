import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/interfaces'
import { API_ENDPOINTS } from '../infraestructure/constants'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string>('')

  // Form state for ProductsCreateForm
  const formData = ref<CreateProductRequest>({
    barCode: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    productType: '',
    unitType: '',
    isActive: true,
    purchasePrice: 0,
    profitPercentage: 0,
  })

  // Getters
  const activeProducts = computed(() =>
    products.value.filter(product => product.isActive),
  )

  const getProductById = computed(() =>
    (id: string) => products.value.find(product => product.id === id),
  )

  const getProductByBarcode = computed(() =>
    (barcode: string) => products.value.find(product => product.barCode === barcode),
  )

  const productCount = computed(() => products.value.length)
  const activeProductCount = computed(() => activeProducts.value.length)

  // Actions
  const loadProducts = async (): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      // Fetch data from LiteDB database through API
      const response = await axios.get<Product[]>(API_ENDPOINTS.PRODUCTS)

      // Update store with fresh data from database
      products.value = response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading products'
      error.value = errorMessage
      console.error('Error loading products:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      // Fetch specific product from LiteDB database through API
      const response = await axios.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`)
      const product = response.data

      // Update store with the fetched product data
      const existingIndex = products.value.findIndex(p => p.id === id)
      if (existingIndex !== -1) {
        products.value[existingIndex] = product
      } else {
        products.value.push(product)
      }

      return product
    } catch (err) {
      console.error('Error getting product:', err)
      return null
    }
  }

  const fetchProductByBarcode = async (barcode: string): Promise<Product | null> => {
    try {
      // Fetch specific product from LiteDB database through API
      const response = await axios.get<Product>(`${API_ENDPOINTS.PRODUCTS}/barcode/${barcode}`)
      const product = response.data

      // Update store with the fetched product data
      const existingIndex = products.value.findIndex(p => p.barCode === barcode)
      if (existingIndex !== -1) {
        products.value[existingIndex] = product
      } else {
        products.value.push(product)
      }

      return product
    } catch (err) {
      console.error('Error getting product by barcode:', err)
      return null
    }
  }

  const createProduct = async (product: CreateProductRequest): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      // Update LiteDB database through API
      const response = await axios.post<Product>(API_ENDPOINTS.PRODUCTS, product)

      // After successful database update, refresh the store
      const createdProduct = response.data
      products.value.push(createdProduct)

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating product'
      error.value = errorMessage
      console.error('Error creating product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (product: UpdateProductRequest): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      // Update LiteDB database through API
      const response = await axios.put<Product>(`${API_ENDPOINTS.PRODUCTS}/${product.id}`, product)

      // After successful database update, refresh the store
      const updatedProduct = response.data
      const index = products.value.findIndex(p => p.id === product.id)
      if (index !== -1) {
        products.value[index] = updatedProduct
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating product'
      error.value = errorMessage
      console.error('Error updating product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      // Update LiteDB database through API
      await axios.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)

      // After successful database update, refresh the store
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value.splice(index, 1)
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting product'
      error.value = errorMessage
      console.error('Error deleting product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  const resetStore = () => {
    products.value = []
    loading.value = false
    error.value = ''
  }

  // Helper method to refresh store data from database
  const refreshFromDatabase = async (): Promise<void> => {
    await loadProducts()
  }

  // Form management actions
  const updateFormData = <K extends keyof CreateProductRequest>(
    field: K,
    value: CreateProductRequest[K],
  ) => {
    formData.value[field] = value
  }

  const resetFormData = () => {
    formData.value = {
      barCode: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      productType: '',
      unitType: '',
      isActive: true,
      purchasePrice: 0,
      profitPercentage: 0,
    }
  }

  const calculateSalePrice = () => {
    if (formData.value.purchasePrice && formData.value.profitPercentage) {
      const profit = (formData.value.purchasePrice * formData.value.profitPercentage) / 100
      formData.value.price = Math.round(formData.value.purchasePrice + profit)
    } else {
      formData.value.price = 0
    }
  }

  return {
    // State
    products,
    loading,
    error,
    formData,

    // Getters
    activeProducts,
    getProductById,
    getProductByBarcode,
    productCount,
    activeProductCount,

    // Actions
    loadProducts,
    fetchProductById,
    fetchProductByBarcode,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
    resetStore,
    refreshFromDatabase,

    // Form actions
    updateFormData,
    resetFormData,
    calculateSalePrice,
  }
})
