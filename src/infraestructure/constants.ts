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

export default {
  API_ENDPOINTS,
  HTTP_STATUS,
  APP_CONFIG,
}
