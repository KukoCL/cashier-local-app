import { ref } from 'vue'
import axios from 'axios'
import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/interfaces'
import { API_ENDPOINTS } from '../infraestructure/constants'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string>('')

  const loadProducts = async (): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get<Product[]>(API_ENDPOINTS.PRODUCTS)
      products.value = response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading products'
      error.value = errorMessage
      console.error('Error loading products:', err)
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`)
      return response.data
    } catch (err) {
      console.error('Error getting product:', err)
      return null
    }
  }

  const getProductByBarcode = async (barcode: string): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`${API_ENDPOINTS.PRODUCTS}/barcode/${barcode}`)
      return response.data
    } catch (err) {
      console.error('Error getting product by barcode:', err)
      return null
    }
  }

  const createProduct = async (product: CreateProductRequest): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      await axios.post(API_ENDPOINTS.PRODUCTS, product)
      await loadProducts() // Refresh the list
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
      await axios.put(`${API_ENDPOINTS.PRODUCTS}/${product.id}`, product)
      await loadProducts() // Refresh the list
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
      await axios.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)
      await loadProducts() // Refresh the list
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

  return {
    // State
    products,
    loading,
    error,

    // Actions
    loadProducts,
    getProductById,
    getProductByBarcode,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
