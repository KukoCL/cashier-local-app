import { ref, computed } from 'vue'
import type { Product } from '../types/interfaces'
import { useUnitTypeMapper } from './useUnitTypeMapper'

export interface EditStockData {
  productId: string
  operationType: 'update' | 'add'
  quantity: number
  newTotal: number
}

export const useEditStock = (product: Product | null | undefined) => {
  const { mapUnitTypeToSpanish } = useUnitTypeMapper()
  
  // Reactive state
  const operationType = ref<'update' | 'add'>('update')
  const quantity = ref<number>(0)

  // Computed properties
  const spanishUnitType = computed(() => {
    return mapUnitTypeToSpanish(product?.unitType, product?.stock || 0)
  })

  const spanishUnitTypeForNewTotal = computed(() => {
    return mapUnitTypeToSpanish(product?.unitType, newTotal.value)
  })

  const newTotal = computed(() => {
    if (!product || quantity.value <= 0) return 0
    
    if (operationType.value === 'update') {
      return quantity.value
    } else {
      return product.stock + quantity.value
    }
  })

  const isFormValid = computed(() => {
    return quantity.value > 0 && !!operationType.value && !!product
  })

  // Methods
  const resetForm = () => {
    operationType.value = 'update'
    quantity.value = 0
  }

  const getEditStockData = (): EditStockData | null => {
    if (!isFormValid.value || !product) return null
    
    return {
      productId: product.id,
      operationType: operationType.value,
      quantity: quantity.value,
      newTotal: newTotal.value,
    }
  }

  const setOperationType = (type: 'update' | 'add') => {
    operationType.value = type
  }

  const setQuantity = (value: number) => {
    quantity.value = Math.max(0, value)
  }

  return {
    // State
    operationType,
    quantity,
    
    // Computed
    spanishUnitType,
    spanishUnitTypeForNewTotal,
    newTotal,
    isFormValid,
    
    // Methods
    resetForm,
    getEditStockData,
    setOperationType,
    setQuantity,
  }
}
