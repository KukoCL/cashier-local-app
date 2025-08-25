// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
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

export default {
  API_ENDPOINTS,
  HTTP_STATUS,
  APP_CONFIG,
  PRODUCT_TYPES,
  UNIT_TYPES,
}
