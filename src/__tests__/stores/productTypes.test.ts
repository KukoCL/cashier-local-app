import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductTypesStore } from '../../stores/productTypes'

describe('productTypes store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should clear error', () => {
    const store = useProductTypesStore()
    
    // Set an error first
    store.error = 'Test error'
    expect(store.error).toBe('Test error')
    
    // Clear the error
    store.clearError()
    expect(store.error).toBe('')
  })
})
