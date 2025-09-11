import { ref } from 'vue'
import axios from 'axios'
import type { ActivationRequest, ActivationResponse } from '../types/interfaces'
import { AWS_CONFIG } from '../infraestructure/constants'
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
      const activationRequest: ActivationRequest = {
        activationKey: activationKey.trim(),
        computerFingerprint: fingerprint.hash,
      }

      // Send to AWS Lambda
      const response = await axios.post<ActivationResponse>(
        AWS_CONFIG.LAMBDA_ENDPOINT,
        activationRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 seconds timeout
        }
      )

      if (response.data.success) {
        // Store activation status locally
        activationStore.setActivationStatus({
          isActivated: true,
          activationKey: activationKey.trim(),
          activatedAt: response.data.activatedAt || new Date().toISOString(),
          computerFingerprint: fingerprint.hash,
        })

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
      // First check local storage
      activationStore.loadActivationStatus()
      
      if (activationStore.activationStatus.isActivated) {
        // Could add server-side validation here if needed
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