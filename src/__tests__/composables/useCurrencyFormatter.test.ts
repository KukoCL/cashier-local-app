import { describe, it, expect } from 'vitest'
import { useCurrencyFormatter } from '../../composables/useCurrencyFormatter'

describe('useCurrencyFormatter', () => {
  const { formatCLP, formatNumber } = useCurrencyFormatter()

  describe('formatCLP', () => {
    it('should format positive numbers correctly', () => {
      expect(formatCLP(1200)).toBe('$1.200')
      expect(formatCLP(1000000)).toBe('$1.000.000')
      expect(formatCLP(500)).toBe('$500')
    })

    it('should handle zero correctly', () => {
      expect(formatCLP(0)).toBe('$0')
    })

    it('should handle negative numbers correctly', () => {
      expect(formatCLP(-1200)).toBe('$-1.200')
    })

    it('should handle invalid inputs', () => {
      expect(formatCLP(NaN)).toBe('$0')
      expect(formatCLP(Infinity)).toBe('$∞')
      expect(formatCLP(-Infinity)).toBe('$-∞')
    })

    it('should handle non-number inputs by returning $0', () => {
      // @ts-expect-error Testing runtime behavior
      expect(formatCLP('invalid')).toBe('$0')
      // @ts-expect-error Testing runtime behavior
      expect(formatCLP(null)).toBe('$0')
      // @ts-expect-error Testing runtime behavior
      expect(formatCLP(undefined)).toBe('$0')
    })
  })

  describe('formatNumber', () => {
    it('should format positive numbers correctly', () => {
      expect(formatNumber(1200)).toBe('1.200')
      expect(formatNumber(1000000)).toBe('1.000.000')
      expect(formatNumber(500)).toBe('500')
    })

    it('should handle zero correctly', () => {
      expect(formatNumber(0)).toBe('0')
    })

    it('should handle negative numbers correctly', () => {
      expect(formatNumber(-1200)).toBe('-1.200')
    })

    it('should handle invalid inputs', () => {
      expect(formatNumber(NaN)).toBe('0')
      expect(formatNumber(Infinity)).toBe('∞')
      expect(formatNumber(-Infinity)).toBe('-∞')
    })

    it('should handle non-number inputs by returning 0', () => {
      // @ts-expect-error Testing runtime behavior
      expect(formatNumber('invalid')).toBe('0')
      // @ts-expect-error Testing runtime behavior
      expect(formatNumber(null)).toBe('0')
      // @ts-expect-error Testing runtime behavior
      expect(formatNumber(undefined)).toBe('0')
    })
  })
})
