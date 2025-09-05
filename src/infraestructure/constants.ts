import type { CreateProductRequest } from '../types/interfaces'

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_TYPES: '/api/producttypes',
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const

// Application Constants
export const APP_CONFIG = {
  // MESSAGE_MIN_LENGTH: 1,
  DEBOUNCE_DELAY: 300,
} as const

//TODO: Obtener valores desde BD.
// Product Types
export const PRODUCT_TYPES = {
  ARTICULOS_DE_ASEO: 'Articulos de aseo',
  ALIMENTOS: 'Alimentos',
  BEBIDAS: 'Bebidas',
  BEBESTIBLES: 'Bebestibles',
  EMBUTIDOS: 'Embutidos',
} as const

export const PRODUCT_TYPES_ARRAY = Object.values(PRODUCT_TYPES)

//TODO: Obtener valores desde BD.
// Unit Types
export const UNIT_TYPES = {
  UNIT: 'Unidad',
  BOX: 'Caja',
  GRAMS: 'Gramos',
} as const

export const UNIT_TYPES_ARRAY = Object.values(UNIT_TYPES)

// Form Initial Data
export const INITIAL_CREATE_FORM_DATA: CreateProductRequest = {
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
}

export default {
  API_ENDPOINTS,
  HTTP_STATUS,
  APP_CONFIG,
  PRODUCT_TYPES,
  UNIT_TYPES,
  INITIAL_CREATE_FORM_DATA,
}
