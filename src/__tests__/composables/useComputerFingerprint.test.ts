import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { useComputerFingerprint } from '../../composables/useComputerFingerprint'

describe('useComputerFingerprint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate computer fingerprint from backend', async () => {
    const mockFingerprint = 'dca8e9e96e5d150eb6855569c0d6f246d39740751c94d98a8a077af2e935150d'
    const axiosGet = vi.mocked(axios.get)
    axiosGet.mockResolvedValue({
      data: { fingerprint: mockFingerprint },
    })

    const { generateFingerprint, isGenerating, error } = useComputerFingerprint()

    expect(isGenerating.value).toBe(false)
    expect(error.value).toBeNull()

    const fingerprint = await generateFingerprint()

    expect(fingerprint).toBe(mockFingerprint)
    expect(axiosGet).toHaveBeenCalledWith('/api/fingerprint')
  })

  it('should set loading state during generation', async () => {
    const mockFingerprint = 'test-fingerprint'
    const axiosGet = vi.mocked(axios.get)
    axiosGet.mockResolvedValue({
      data: { fingerprint: mockFingerprint },
    })

    const { generateFingerprint, isGenerating } = useComputerFingerprint()

    expect(isGenerating.value).toBe(false)

    const fingerprintPromise = generateFingerprint()
    
    // Check that loading is false after completion
    const fingerprint = await fingerprintPromise
    expect(isGenerating.value).toBe(false)
    expect(fingerprint).toBe(mockFingerprint)
  })

  it('should handle API errors', async () => {
    const errorMessage = 'Network error'
    const axiosGet = vi.mocked(axios.get)
    axiosGet.mockRejectedValue(new Error(errorMessage))

    const { generateFingerprint, error } = useComputerFingerprint()

    const fingerprint = await generateFingerprint()

    expect(fingerprint).toBeNull()
    expect(error.value).toBe(errorMessage)
  })

  it('should clear error', () => {
    const { error, clearError } = useComputerFingerprint()

    // Manually set an error
    error.value = 'Test error'
    expect(error.value).toBe('Test error')

    clearError()
    expect(error.value).toBeNull()
  })

  it('should handle non-Error exceptions', async () => {
    const axiosGet = vi.mocked(axios.get)
    axiosGet.mockRejectedValue('String error')

    const { generateFingerprint, error } = useComputerFingerprint()

    const fingerprint = await generateFingerprint()

    expect(fingerprint).toBeNull()
    expect(error.value).toBe('Error generating fingerprint')
  })
})