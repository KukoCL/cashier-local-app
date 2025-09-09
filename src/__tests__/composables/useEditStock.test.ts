import { describe, it, expect, vi } from 'vitest'
import { useEditStock } from '../../composables/useEditStock'
import type { Product } from '../../types/interfaces'

// Mock the useUnitTypeMapper composable
vi.mock('../../composables/useUnitTypeMapper', () => ({
  useUnitTypeMapper: () => ({
    mapUnitTypeToSpanish: vi.fn((unitType: string | undefined, amount: number) => {
      if (!unitType) return amount === 1 ? 'Unidad' : 'Unidades'
      // Mock the pluralization logic: 0 and != 1 are plural
      return amount === 1 ? 'Unidad' : 'Unidades'
    }),
  }),
}))

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

describe('useEditStock', () => {
  describe('initial state', () => {
    it('should initialize with default values', () => {
      const { operationType, quantity, isFormValid } = useEditStock(mockProduct)
      
      expect(operationType.value).toBe('update')
      expect(quantity.value).toBe(0)
      expect(isFormValid.value).toBe(false)
    })

    it('should handle null product', () => {
      const { spanishUnitType, newTotal, isFormValid } = useEditStock(null)
      
      expect(spanishUnitType.value).toBe('Unidades') // 0 stock (plural)
      expect(newTotal.value).toBe(0)
      expect(isFormValid.value).toBe(false)
    })
  })

  describe('computed properties', () => {
    it('should calculate new total for update operation', () => {
      const { setQuantity, newTotal } = useEditStock(mockProduct)
      
      setQuantity(15)
      expect(newTotal.value).toBe(15)
    })

    it('should calculate new total for add operation', () => {
      const { setOperationType, setQuantity, newTotal } = useEditStock(mockProduct)
      
      setOperationType('add')
      setQuantity(5)
      expect(newTotal.value).toBe(15) // 10 + 5
    })

    it('should return 0 for new total when quantity is 0', () => {
      const { newTotal } = useEditStock(mockProduct)
      
      expect(newTotal.value).toBe(0)
    })

    it('should return spanish unit type for current stock', () => {
      const { spanishUnitType } = useEditStock(mockProduct)
      
      expect(spanishUnitType.value).toBe('Unidades') // 10 units (plural)
    })

    it('should return spanish unit type for new total', () => {
      const { setQuantity, spanishUnitTypeForNewTotal } = useEditStock(mockProduct)
      
      setQuantity(1)
      expect(spanishUnitTypeForNewTotal.value).toBe('Unidad') // 1 unit (singular)
    })

    it('should validate form correctly', () => {
      const { setQuantity, isFormValid } = useEditStock(mockProduct)
      
      expect(isFormValid.value).toBe(false) // quantity is 0
      
      setQuantity(5)
      expect(isFormValid.value).toBe(true) // valid form
    })

    it('should invalidate form when product is null', () => {
      const { setQuantity, isFormValid } = useEditStock(null)
      
      setQuantity(5)
      expect(isFormValid.value).toBe(false) // no product
    })
  })

  describe('methods', () => {
    it('should set operation type', () => {
      const { operationType, setOperationType } = useEditStock(mockProduct)
      
      setOperationType('add')
      expect(operationType.value).toBe('add')
      
      setOperationType('update')
      expect(operationType.value).toBe('update')
    })

    it('should set quantity with minimum value of 0', () => {
      const { quantity, setQuantity } = useEditStock(mockProduct)
      
      setQuantity(5)
      expect(quantity.value).toBe(5)
      
      setQuantity(-3)
      expect(quantity.value).toBe(0) // negative values should be 0
    })

    it('should reset form to initial state', () => {
      const { operationType, quantity, setOperationType, setQuantity, resetForm } = useEditStock(mockProduct)
      
      setOperationType('add')
      setQuantity(5)
      
      expect(operationType.value).toBe('add')
      expect(quantity.value).toBe(5)
      
      resetForm()
      
      expect(operationType.value).toBe('update')
      expect(quantity.value).toBe(0)
    })

    it('should return edit stock data when form is valid', () => {
      const { setQuantity, getEditStockData } = useEditStock(mockProduct)
      
      setQuantity(5)
      
      const data = getEditStockData()
      expect(data).toEqual({
        productId: '1',
        operationType: 'update',
        quantity: 5,
        newTotal: 5,
      })
    })

    it('should return null when form is invalid', () => {
      const { getEditStockData } = useEditStock(mockProduct)
      
      // quantity is 0, form is invalid
      const data = getEditStockData()
      expect(data).toBeNull()
    })

    it('should return null when product is null', () => {
      const { setQuantity, getEditStockData } = useEditStock(null)
      
      setQuantity(5)
      const data = getEditStockData()
      expect(data).toBeNull()
    })
  })

  describe('edge cases', () => {
    it('should handle undefined product', () => {
      const { spanishUnitType, newTotal, isFormValid } = useEditStock(undefined)
      
      expect(spanishUnitType.value).toBe('Unidades') // 0 stock (plural)
      expect(newTotal.value).toBe(0)
      expect(isFormValid.value).toBe(false)
    })

    it('should handle product with 0 stock', () => {
      const productWithZeroStock = { ...mockProduct, stock: 0 }
      const { spanishUnitType, setOperationType, setQuantity, newTotal } = useEditStock(productWithZeroStock)
      
      expect(spanishUnitType.value).toBe('Unidades') // 0 stock (plural)
      
      setOperationType('add')
      setQuantity(3)
      expect(newTotal.value).toBe(3) // 0 + 3
    })

    it('should handle product with 1 stock (singular unit)', () => {
      const productWithOneStock = { ...mockProduct, stock: 1 }
      const { spanishUnitType } = useEditStock(productWithOneStock)
      
      expect(spanishUnitType.value).toBe('Unidad') // 1 unit (singular)
    })
  })
})
