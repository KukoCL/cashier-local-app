import { describe, it, expect } from 'vitest'
import {
  useProductsSidebar,
  useReportsSidebar,
  useSalesSidebar,
  useSidebarConfig,
} from '../../composables/useSidebar'

describe('useSidebar', () => {
  describe('useProductsSidebar', () => {
    it('should return products sidebar configuration', () => {
      const sidebar = useProductsSidebar()

      expect(sidebar).toHaveLength(1)
      expect(sidebar[0]).toEqual({
        id: 'products',
        title: 'Products',
        items: [
          {
            id: 'products-list',
            label: 'All Products',
            icon: '📋',
            action: 'list',
          },
          {
            id: 'products-create',
            label: 'Add Product',
            icon: '➕',
            action: 'create',
          },
        ],
      })
    })
  })

  describe('useReportsSidebar', () => {
    it('should return reports sidebar configuration', () => {
      const sidebar = useReportsSidebar()

      expect(sidebar).toHaveLength(1)
      expect(sidebar[0]).toEqual({
        id: 'reports',
        title: 'Reportes',
        items: [
          {
            id: 'reports-sales',
            label: 'Reporte de Ventas',
            icon: '💰',
            action: 'sales',
          },
          {
            id: 'reports-inventory',
            label: 'Reporte de Inventario',
            icon: '📦',
            action: 'inventory',
          },
          {
            id: 'reports-summary',
            label: 'Resumen General',
            icon: '📊',
            action: 'summary',
          },
        ],
      })
    })
  })

  describe('useSalesSidebar', () => {
    it('should return sales sidebar configuration', () => {
      const sidebar = useSalesSidebar()

      expect(sidebar).toHaveLength(1)
      expect(sidebar[0]).toEqual({
        id: 'sales',
        title: 'Ventas',
        items: [
          {
            id: 'sales-new',
            label: 'Nueva Venta',
            icon: '🛒',
            action: 'new',
          },
          {
            id: 'sales-history',
            label: 'Historial de Ventas',
            icon: '📋',
            action: 'history',
          },
          {
            id: 'sales-customers',
            label: 'Clientes',
            icon: '👥',
            action: 'customers',
          },
        ],
      })
    })
  })

  describe('useSidebarConfig', () => {
    it('should return products sidebar for products context', () => {
      const sidebar = useSidebarConfig('products')
      const expectedSidebar = useProductsSidebar()

      expect(sidebar).toEqual(expectedSidebar)
    })

    it('should return reports sidebar for reports context', () => {
      const sidebar = useSidebarConfig('reports')
      const expectedSidebar = useReportsSidebar()

      expect(sidebar).toEqual(expectedSidebar)
    })

    it('should return sales sidebar for sales context', () => {
      const sidebar = useSidebarConfig('sales')
      const expectedSidebar = useSalesSidebar()

      expect(sidebar).toEqual(expectedSidebar)
    })

    it('should return empty array for unknown context', () => {
      const sidebar = useSidebarConfig('unknown')

      expect(sidebar).toEqual([])
    })

    it('should handle empty string context', () => {
      const sidebar = useSidebarConfig('')

      expect(sidebar).toEqual([])
    })
  })
})
