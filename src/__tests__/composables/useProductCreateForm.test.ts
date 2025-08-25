import { describe, it, expect, beforeEach } from 'vitest'
import { useProductCreateForm } from '../../composables/useProductCreateForm'

describe('useProductCreateForm', () => {
  let formComposable: ReturnType<typeof useProductCreateForm>

  beforeEach(() => {
    formComposable = useProductCreateForm()
  })

  describe('createFormData', () => {
    it('should initialize with default values', () => {
      const { createFormData } = formComposable

      expect(createFormData.value).toEqual({
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
    })
  })

  describe('updateCreateFormData', () => {
    it('should update specific form field', () => {
      const { createFormData, updateCreateFormData } = formComposable

      updateCreateFormData('name', 'Test Product')
      expect(createFormData.value.name).toBe('Test Product')

      updateCreateFormData('price', 1500)
      expect(createFormData.value.price).toBe(1500)

      updateCreateFormData('isActive', false)
      expect(createFormData.value.isActive).toBe(false)
    })

    it('should update multiple fields independently', () => {
      const { createFormData, updateCreateFormData } = formComposable

      updateCreateFormData('barCode', '123456789')
      updateCreateFormData('description', 'Test description')
      updateCreateFormData('stock', 50)

      expect(createFormData.value.barCode).toBe('123456789')
      expect(createFormData.value.description).toBe('Test description')
      expect(createFormData.value.stock).toBe(50)
    })
  })

  describe('resetCreateFormData', () => {
    it('should reset form to initial values', () => {
      const { createFormData, updateCreateFormData, resetCreateFormData } = formComposable

      // Modify some values
      updateCreateFormData('name', 'Modified Product')
      updateCreateFormData('price', 2000)
      updateCreateFormData('isActive', false)

      // Reset form
      resetCreateFormData()

      expect(createFormData.value).toEqual({
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
    })
  })

  describe('calculateSalePrice', () => {
    it('should calculate sale price based on purchase price and profit percentage', () => {
      const { createFormData, updateCreateFormData, calculateSalePrice } = formComposable

      updateCreateFormData('purchasePrice', 1000)
      updateCreateFormData('profitPercentage', 20)

      calculateSalePrice()

      expect(createFormData.value.price).toBe(1200) // 1000 + (1000 * 20 / 100)
    })

    it('should round sale price to nearest integer', () => {
      const { createFormData, updateCreateFormData, calculateSalePrice } = formComposable

      updateCreateFormData('purchasePrice', 1000)
      updateCreateFormData('profitPercentage', 15.5)

      calculateSalePrice()

      expect(createFormData.value.price).toBe(1155) // 1000 + (1000 * 15.5 / 100) = 1155
    })

    it('should set price to 0 when purchase price is 0', () => {
      const { createFormData, updateCreateFormData, calculateSalePrice } = formComposable

      updateCreateFormData('purchasePrice', 0)
      updateCreateFormData('profitPercentage', 20)

      calculateSalePrice()

      expect(createFormData.value.price).toBe(0)
    })

    it('should set price to 0 when profit percentage is 0', () => {
      const { createFormData, updateCreateFormData, calculateSalePrice } = formComposable

      updateCreateFormData('purchasePrice', 1000)
      updateCreateFormData('profitPercentage', 0)

      calculateSalePrice()

      expect(createFormData.value.price).toBe(0)
    })

    it('should set price to 0 when both purchase price and profit percentage are missing', () => {
      const { createFormData, calculateSalePrice } = formComposable

      calculateSalePrice()

      expect(createFormData.value.price).toBe(0)
    })
  })
})
