import { ref } from 'vue'
import axios from 'axios'

export const useComputerFingerprint = () => {
  const isGenerating = ref(false)
  const error = ref<string | null>(null)

  const generateFingerprint = async (): Promise<string | null> => {
    try {
      isGenerating.value = true
      error.value = null

      // Get system-specific fingerprint from backend
      const response = await axios.get('/api/fingerprint')
      return response.data.fingerprint

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error generating fingerprint'
      return null
    } finally {
      isGenerating.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isGenerating,
    error,
    generateFingerprint,
    clearError,
  }
}