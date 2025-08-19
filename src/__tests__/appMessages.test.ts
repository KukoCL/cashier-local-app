import { describe, it, expect } from 'vitest'
import appMessages from '../infraestructure/appMessages'

describe('App Messages', () => {
  describe('messageForm messages', () => {
    it('should have form-related messages', () => {
      expect(appMessages.messageForm.placeholder).toBe('Type your hello world message here...')
      expect(appMessages.messageForm.buttonSave).toBe('Save Message to Database')
      expect(appMessages.messageForm.successMessage).toBe('Message saved successfully! ✅')
      expect(appMessages.messageForm.errorPrefix).toBe('Error saving message: ')
    })

    it('should have all required properties', () => {
      expect(appMessages.messageForm).toHaveProperty('label')
      expect(appMessages.messageForm).toHaveProperty('placeholder')
      expect(appMessages.messageForm).toHaveProperty('buttonSave')
      expect(appMessages.messageForm).toHaveProperty('buttonSaving')
      expect(appMessages.messageForm).toHaveProperty('successMessage')
      expect(appMessages.messageForm).toHaveProperty('errorPrefix')
    })
  })

  describe('messageList messages', () => {
    it('should have list-related messages', () => {
      expect(appMessages.messageList.title).toBe('📝 Saved Messages (from LiteDB)')
      expect(appMessages.messageList.buttonRefresh).toBe('Refresh Messages')
      expect(appMessages.messageList.emptyMessage).toBe('No messages found. Add your first message above!')
    })

    it('should have all required properties', () => {
      expect(appMessages.messageList).toHaveProperty('title')
      expect(appMessages.messageList).toHaveProperty('buttonRefresh')
      expect(appMessages.messageList).toHaveProperty('buttonLoading')
      expect(appMessages.messageList).toHaveProperty('loadingMessage')
      expect(appMessages.messageList).toHaveProperty('emptyMessage')
      expect(appMessages.messageList).toHaveProperty('timestampPrefix')
    })
  })

  describe('app general messages', () => {
    it('should have general application messages', () => {
      expect(appMessages.app.title).toBe('🚀 Electron.NET + Vue 3 + TypeScript + Vite + LiteDB')
    })

    it('should have all required properties', () => {
      expect(appMessages.app).toHaveProperty('title')
    })
  })

  describe('common messages', () => {
    it('should have common utility messages', () => {
      expect(appMessages.common.loading).toBe('Loading...')
      expect(appMessages.common.error).toBe('Error: ')
    })
  })
})
