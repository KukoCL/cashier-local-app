import { ref } from 'vue'
import type { CreateProductRequest } from '../types/interfaces'

// Initial form data constant for product creation
const INITIAL_CREATE_FORM_DATA: CreateProductRequest = {
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

export const useProductCreateForm = () => {
  // Form state for ProductsCreateForm
  const createFormData = ref<CreateProductRequest>({ ...INITIAL_CREATE_FORM_DATA })

  // Form management actions
  const updateCreateFormData = <K extends keyof CreateProductRequest>(
    field: K,
    value: CreateProductRequest[K],
  ) => {
    createFormData.value[field] = value
  }

  /**
   * Resets the create form data to its initial state by creating a shallow copy of the INITIAL_CREATE_FORM_DATA.
   * This function restores all form fields to their default values.
   */
  const resetCreateFormData = () => {
    createFormData.value = { ...INITIAL_CREATE_FORM_DATA }
  }

  /**
   * Calculates the sale price based on purchase price and profit percentage.
   * Updates the price field in the form data.
   */
  const calculateSalePrice = () => {
    if (createFormData.value.purchasePrice && createFormData.value.profitPercentage) {
      const profit = (createFormData.value.purchasePrice * createFormData.value.profitPercentage) / 100
      createFormData.value.price = Math.round(createFormData.value.purchasePrice + profit)
    } else {
      createFormData.value.price = 0
    }
  }

  return {
    // State
    createFormData,

    // Actions
    updateCreateFormData,
    resetCreateFormData,
    calculateSalePrice,
  }
}
