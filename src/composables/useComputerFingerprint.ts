import { ref } from 'vue'
import type { ComputerFingerprint } from '../types/interfaces'

export const useComputerFingerprint = () => {
  const isGenerating = ref(false)
  const error = ref<string | null>(null)

  // Simple hash function for creating fingerprint
  const generateHash = (data: string): string => {
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
  }

  const generateFingerprint = async (): Promise<ComputerFingerprint | null> => {
    try {
      isGenerating.value = true
      error.value = null

      // Collect browser and system information
      const userAgent = navigator.userAgent
      const screenResolution = `${screen.width}x${screen.height}x${screen.colorDepth}`
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const language = navigator.language
      const platform = navigator.platform
      const hardwareConcurrency = navigator.hardwareConcurrency || 0
      const maxTouchPoints = navigator.maxTouchPoints || 0

      // Additional entropy sources
      const memoryInfo = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 'unknown'
      const cookieEnabled = navigator.cookieEnabled
      const doNotTrack = navigator.doNotTrack || 'unknown'

      // Create fingerprint data string
      const fingerprintData = [
        userAgent,
        screenResolution,
        timezone,
        language,
        platform,
        hardwareConcurrency.toString(),
        maxTouchPoints.toString(),
        memoryInfo.toString(),
        cookieEnabled.toString(),
        doNotTrack,
      ].join('|')

      // Generate hash
      const hash = generateHash(fingerprintData)

      const fingerprint: ComputerFingerprint = {
        userAgent,
        screenResolution,
        timezone,
        language,
        platform,
        hardwareConcurrency,
        maxTouchPoints,
        hash,
      }

      return fingerprint
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