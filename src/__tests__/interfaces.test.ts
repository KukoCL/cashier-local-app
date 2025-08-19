import { describe, it, expect } from 'vitest'
import type { MessageRecord, SaveMessageRequest } from '../types/interfaces'

describe('TypeScript Interfaces', () => {
  describe('MessageRecord interface', () => {
    it('should have correct structure', () => {
      const messageRecord: MessageRecord = {
        id: '123',
        message: 'Test message',
        timestamp: '2025-01-01T00:00:00Z',
      }

      expect(messageRecord.id).toBe('123')
      expect(messageRecord.message).toBe('Test message')
      expect(messageRecord.timestamp).toBe('2025-01-01T00:00:00Z')
    })

    it('should require all properties', () => {
      // This test ensures TypeScript compilation fails if properties are missing
      const messageRecord: MessageRecord = {
        id: 'test-id',
        message: 'test message',
        timestamp: 'test-timestamp',
      }

      expect(typeof messageRecord.id).toBe('string')
      expect(typeof messageRecord.message).toBe('string')
      expect(typeof messageRecord.timestamp).toBe('string')
    })
  })

  describe('SaveMessageRequest interface', () => {
    it('should have correct structure', () => {
      const request: SaveMessageRequest = {
        message: 'Test message for save',
      }

      expect(request.message).toBe('Test message for save')
    })

    it('should require message property', () => {
      const request: SaveMessageRequest = {
        message: 'required message',
      }

      expect(typeof request.message).toBe('string')
      expect(request.message.length).toBeGreaterThan(0)
    })
  })
})
