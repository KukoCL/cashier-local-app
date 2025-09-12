import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ActivationStatus } from '../types/interfaces'

export const useActivationStore = defineStore('activation', () => {
  // State
  const activationStatus = ref<ActivationStatus>({
    isActivated: false,
    activationKey: undefined,
    activatedAt: undefined,
    computerFingerprint: undefined,
  })
  
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const setActivationStatus = (status: ActivationStatus) => {
    activationStatus.value = status
    // Persist to localStorage
    localStorage.setItem('activation_status', JSON.stringify(status))
  }

  const loadActivationStatus = () => {
    try {
      const stored = localStorage.getItem('activation_status')
      if (stored) {
        const parsed = JSON.parse(stored) as ActivationStatus
        activationStatus.value = parsed
      }
    } catch (error) {
      console.error('Error loading activation status:', error)
      // Reset to default if corrupted
      activationStatus.value = {
        isActivated: false,
        activationKey: undefined,
        activatedAt: undefined,
        computerFingerprint: undefined,
      }
    }
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const resetActivation = () => {
    activationStatus.value = {
      isActivated: false,
      activationKey: undefined,
      activatedAt: undefined,
      computerFingerprint: undefined,
    }
    localStorage.removeItem('activation_status')
  }

  // Initialize store
  loadActivationStatus()

  return {
    // State
    activationStatus,
    isLoading,
    error,
    
    // Actions
    setActivationStatus,
    loadActivationStatus,
    setLoading,
    setError,
    clearError,
    resetActivation,
  }
})