import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProducts } from '../../composables/useProducts'

describe('useProducts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should expose store state and actions', () => {
    const {
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
    } = useProducts()

    // Check that all expected properties are exposed
    expect(products).toBeDefined()
    expect(loading).toBeDefined()
    expect(error).toBeDefined()
    expect(activeProducts).toBeDefined()
    expect(productCount).toBeDefined()
    expect(activeProductCount).toBeDefined()
    expect(typeof findProductById).toBe('function')
    expect(typeof findProductByBarcode).toBe('function')
    expect(typeof loadProducts).toBe('function')
    expect(typeof fetchProductById).toBe('function')
    expect(typeof fetchProductByBarcode).toBe('function')
    expect(typeof createProduct).toBe('function')
    expect(typeof updateProduct).toBe('function')
    expect(typeof updateProductStock).toBe('function')
    expect(typeof deleteProduct).toBe('function')
    expect(typeof clearError).toBe('function')
    expect(typeof resetStore).toBe('function')
    expect(typeof refreshFromDatabase).toBe('function')
  })

  it('should provide helper functions that work with store getters', () => {
    const { findProductById, findProductByBarcode } = useProducts()

    // These should be functions that call the store getters
    expect(typeof findProductById).toBe('function')
    expect(typeof findProductByBarcode).toBe('function')

    // Since no products exist initially, should return undefined
    expect(findProductById('1')).toBeUndefined()
    expect(findProductByBarcode('123')).toBeUndefined()
  })

  it('should provide async fetch functions', async () => {
    const { fetchProductById, fetchProductByBarcode } = useProducts()

    // These should be async functions
    expect(typeof fetchProductById).toBe('function')
    expect(typeof fetchProductByBarcode).toBe('function')

    // Test that they return promises (they will be null due to mocked axios)
    const result1 = await fetchProductById('1')
    const result2 = await fetchProductByBarcode('123')

    expect(result1).toBeNull()
    expect(result2).toBeNull()
  })
})
