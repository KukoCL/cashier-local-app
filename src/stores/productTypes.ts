import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '../infraestructure/constants'

export const useProductTypesStore = defineStore('productTypes', () => {
  // State
  const productTypes = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string>('')

  // Actions
  const loadProductTypes = async (): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      const response = await axios.get<string[]>(API_ENDPOINTS.PRODUCT_TYPES)
      productTypes.value = response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading product types'
      error.value = errorMessage
      console.error('Error loading product types:', err)
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    productTypes,
    loading,
    error,
    
    // Actions
    loadProductTypes,
    clearError,
  }
})
