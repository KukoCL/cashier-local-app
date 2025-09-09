import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores'

export function useProducts() {
  const store = useProductsStore()

  const {
    products,
    loading,
    error,
    activeProducts,
    getProductById,
    getProductByBarcode,
    productCount,
    activeProductCount,
  } = storeToRefs(store)

  const {
    loadProducts,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
    clearError,
    resetStore,
    refreshFromDatabase,
  } = store

  const findProductById = (id: string) => {
    return getProductById.value(id)
  }

  const findProductByBarcode = (barcode: string) => {
    return getProductByBarcode.value(barcode)
  }

  const fetchProductById = async (id: string) => {
    return await store.fetchProductById(id)
  }

  const fetchProductByBarcode = async (barcode: string) => {
    return await store.fetchProductByBarcode(barcode)
  }

  return {
    products,
    loading,
    error,
    activeProducts,
    productCount,
    activeProductCount,
    findProductById,
    findProductByBarcode,
    loadProducts,
    fetchProductById,
    fetchProductByBarcode,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
    clearError,
    resetStore,
    refreshFromDatabase,
  }
}
