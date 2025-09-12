import { ref } from 'vue'
import axios from 'axios'
import { useActivationStore } from '../stores/activation'
import { useComputerFingerprint } from './useComputerFingerprint'
import appMessages from '../infraestructure/appMessages'

export const useActivation = () => {
  const activationStore = useActivationStore()
  const { generateFingerprint } = useComputerFingerprint()
  
  const isActivating = ref(false)
  const error = ref<string | null>(null)

  const activateApplication = async (activationKey: string): Promise<boolean> => {
    try {
      isActivating.value = true
      error.value = null
      activationStore.setLoading(true)
      activationStore.clearError()

      // Generate computer fingerprint
      const fingerprint = await generateFingerprint()
      if (!fingerprint) {
        throw new Error('No se pudo generar la huella digital del equipo')
      }

      // Prepare activation request
      const activationRequest = {
        activationKey: activationKey.trim(),
        computerFingerprint: fingerprint,
      }

      // Send to backend for activation (which will save license file)
      const response = await axios.post('/api/activation/activate', activationRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
      })

      if (response.data.success) {
        // License is now saved on the backend, no need to store in frontend store
        return true
      } else {
        throw new Error(response.data.message || appMessages.activation.messages.invalidKey)
      }
    } catch (err) {
      console.error('Activation error:', err)
      
      let errorMessage = appMessages.activation.messages.error
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
          errorMessage = appMessages.activation.messages.networkError
        } else if (err.response?.status === 400 || err.response?.status === 401) {
          errorMessage = appMessages.activation.messages.invalidKey
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      error.value = errorMessage
      activationStore.setError(errorMessage)
      return false
    } finally {
      isActivating.value = false
      activationStore.setLoading(false)
    }
  }

  const checkActivationStatus = async (): Promise<boolean> => {
    try {
      // Check activation status from backend (which reads the license file)
      const response = await axios.get('/api/activation/status')
      
      if (response.data.isActivated) {
        // Update the store for UI purposes, but the real validation is on the backend
        activationStore.setActivationStatus({
          isActivated: true,
          activationKey: response.data.activationKey,
          activatedAt: response.data.activatedAt,
          computerFingerprint: response.data.computerFingerprint,
        })
        return true
      }
      
      return false
    } catch (err) {
      console.error('Error checking activation status:', err)
      return false
    }
  }

  const clearError = () => {
    error.value = null
    activationStore.clearError()
  }

  return {
    isActivating,
    error,
    activateApplication,
    checkActivationStatus,
    clearError,
  }
}