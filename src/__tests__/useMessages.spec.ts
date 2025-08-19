import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMessageForm, useMessageList } from '../composables/useMessages'
import axios from 'axios'

// Mock axios
vi.mocked(axios.post).mockImplementation(() => Promise.resolve({ data: { success: true } }))
vi.mocked(axios.get).mockImplementation(() => Promise.resolve({
  data: [
    { id: '1', message: 'Test message', timestamp: '2025-01-01T00:00:00Z' },
  ],
}))

describe('useMessages Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useMessageForm', () => {
    it('should initialize with default values', () => {
      const { newMessage, loading, status } = useMessageForm()

      expect(newMessage.value).toBe('')
      expect(loading.value).toBe(false)
      expect(status.value).toEqual({ message: '', type: '' })
    })

    it('should save message successfully', async () => {
      const { newMessage, saveMessage, status } = useMessageForm()
      newMessage.value = 'Test message'

      const result = await saveMessage()

      expect(result).toBe(true)
      expect(axios.post).toHaveBeenCalledWith('/api/messages', { message: 'Test message' })
      expect(newMessage.value).toBe('')
      expect(status.value.type).toBe('success')
    })

    it('should handle save message error', async () => {
      const { newMessage, saveMessage, status } = useMessageForm()
      const mockError = new Error('Network error')
      vi.mocked(axios.post).mockRejectedValueOnce(mockError)

      newMessage.value = 'Test message'

      const result = await saveMessage()

      expect(result).toBe(false)
      expect(status.value.type).toBe('error')
      expect(status.value.message).toContain('Error saving message: ')
    })

    it('should clear status', () => {
      const { status, clearStatus } = useMessageForm()
      status.value = { message: 'Test error', type: 'error' }

      clearStatus()

      expect(status.value).toEqual({ message: '', type: '' })
    })
  })

  describe('useMessageList', () => {
    it('should initialize with default values', () => {
      const { messages, loading } = useMessageList()

      expect(messages.value).toEqual([])
      expect(loading.value).toBe(false)
    })

    it('should load messages successfully', async () => {
      const { messages, loadMessages, loading } = useMessageList()

      await loadMessages()

      expect(axios.get).toHaveBeenCalledWith('/api/messages')
      expect(messages.value).toHaveLength(1)
      expect(messages.value[0].message).toBe('Test message')
      expect(loading.value).toBe(false)
    })

    it('should handle load messages error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const mockError = new Error('Network error')
      vi.mocked(axios.get).mockRejectedValueOnce(mockError)

      const { loadMessages, loading } = useMessageList()

      await loadMessages()

      expect(consoleSpy).toHaveBeenCalledWith('Error loading messages:', mockError)
      expect(loading.value).toBe(false)

      consoleSpy.mockRestore()
    })

    it('should refresh messages', async () => {
      const { refreshMessages } = useMessageList()

      await refreshMessages()

      expect(axios.get).toHaveBeenCalledWith('/api/messages')
    })
  })
})
