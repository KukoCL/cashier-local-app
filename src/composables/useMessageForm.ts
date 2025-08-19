import { ref } from 'vue'
import axios from 'axios'
import type { MessageRecord, SaveMessageRequest, ApiResponse } from '../types/interfaces'
import { API_ENDPOINTS } from '../infraestructure/constants'
import appMessages from '../infraestructure/appMessages'

export function useMessageForm() {
  const newMessage = ref('')
  const loading = ref(false)
  const status = ref<{
    message: string
    type: 'success' | 'error' | ''
  }>({
    message: '',
    type: ''
  })

  const saveMessage = async (): Promise<boolean> => {
    if (!newMessage.value.trim()) return false
    
    loading.value = true
    status.value = { message: '', type: '' }
    
    try {
      const request: SaveMessageRequest = {
        message: newMessage.value
      }
      
      await axios.post<ApiResponse>(API_ENDPOINTS.MESSAGES, request)
      
      status.value = {
        message: appMessages.messageForm.successMessage,
        type: 'success'
      }
      
      newMessage.value = ''
      return true
      
    } catch (error: any) {
      status.value = {
        message: `${appMessages.messageForm.errorPrefix}${error.response?.data?.error || error.message}`,
        type: 'error'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  const clearStatus = () => {
    status.value = { message: '', type: '' }
  }

  const resetForm = () => {
    newMessage.value = ''
    clearStatus()
  }

  return {
    // State
    newMessage,
    loading,
    status,
    
    // Actions
    saveMessage,
    clearStatus,
    resetForm
  }
}

export function useMessageList() {
  const messages = ref<MessageRecord[]>([])
  const loading = ref(false)

  const loadMessages = async (): Promise<void> => {
    loading.value = true
    
    try {
      const response = await axios.get<MessageRecord[]>(API_ENDPOINTS.MESSAGES)
      messages.value = response.data
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      loading.value = false
    }
  }

  const refreshMessages = async (): Promise<void> => {
    await loadMessages()
  }

  return {
    // State
    messages,
    loading,
    
    // Actions
    loadMessages,
    refreshMessages
  }
}
