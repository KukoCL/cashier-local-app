import { describe, it, expect } from 'vitest'
import { API_ENDPOINTS, HTTP_STATUS, APP_CONFIG } from '../infraestructure/constants'

describe('Constants', () => {
  describe('API_ENDPOINTS', () => {
    it('should have correct messages endpoint', () => {
      expect(API_ENDPOINTS.MESSAGES).toBe('/api/messages')
    })

    it('should have all required endpoints', () => {
      expect(API_ENDPOINTS).toHaveProperty('MESSAGES')
    })
  })

  describe('HTTP_STATUS', () => {
    it('should have correct status codes', () => {
      expect(HTTP_STATUS.OK).toBe(200)
      expect(HTTP_STATUS.CREATED).toBe(201)
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400)
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500)
    })
  })

  describe('APP_CONFIG', () => {
    it('should have message minimum length', () => {
      expect(APP_CONFIG.MESSAGE_MIN_LENGTH).toBe(1)
    })

    it('should have debounce delay', () => {
      expect(APP_CONFIG.DEBOUNCE_DELAY).toBe(300)
    })
  })
})
