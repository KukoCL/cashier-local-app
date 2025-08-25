import type { SidebarSection } from '../types/interfaces'
import { appMessages } from '../infraestructure/appMessages'

// Products sidebar configuration
export const useProductsSidebar = (): SidebarSection[] => {
  return [
    {
      id: 'products',
      title: 'Productos',
      items: [
        {
          id: 'products-list',
          label: appMessages.products.list.sidebar.allProducts,
          icon: '📋',
          action: 'list',
        },
        {
          id: 'products-create',
          label: appMessages.products.list.sidebar.addProduct,
          icon: '➕',
          action: 'create',
        },
      ],
    },
  ]
}

// Reports sidebar configuration
export const useReportsSidebar = (): SidebarSection[] => {
  return [
    {
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
    },
  ]
}

// Sales sidebar configuration
export const useSalesSidebar = (): SidebarSection[] => {
  return [
    {
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
    },
  ]
}

// Generic sidebar helper
export const useSidebarConfig = (context: string): SidebarSection[] => {
  switch (context) {
  case 'products':
    return useProductsSidebar()
  case 'reports':
    return useReportsSidebar()
  case 'sales':
    return useSalesSidebar()
  default:
    return []
  }
}
