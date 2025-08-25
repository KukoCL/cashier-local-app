export interface Product {
  id: string
  creationDate: string
  lastUpdateDate: string
  barCode: string
  name: string
  description: string
  price: number
  stock: number
  productType: string
  unitType: string
  isActive: boolean
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  barCode: string
  stock: number
  productType: string
  unitType: string
  isActive: boolean
  category: string
  quantity: number
  purchasePrice: number
  profitPercentage: number
  salePrice: number
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string
}

// Sidebar interfaces
export interface SidebarItem {
  id: string
  label: string
  icon: string
  action: string | (() => void)
  isActive?: boolean
}

export interface SidebarSection {
  id: string
  title: string
  items: SidebarItem[]
}
