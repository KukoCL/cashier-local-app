import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useActivationStore } from '../../stores/activation'
import { createPinia, setActivePinia } from 'pinia'
import type { ActivationStatus } from '../../types/interfaces'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useActivationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with default activation status', () => {
    const store = useActivationStore()
    
    expect(store.activationStatus.isActivated).toBe(false)
    expect(store.activationStatus.activationKey).toBeUndefined()
    expect(store.activationStatus.activatedAt).toBeUndefined()
    expect(store.activationStatus.computerFingerprint).toBeUndefined()
  })

  it('should load activation status from localStorage', () => {
    const mockStatus: ActivationStatus = {
      isActivated: true,
      activationKey: 'test-key',
      activatedAt: '2023-01-01T00:00:00.000Z',
      computerFingerprint: 'test-fingerprint',
    }

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockStatus))

    const store = useActivationStore()
    store.loadActivationStatus()

    expect(store.activationStatus).toEqual(mockStatus)
  })

  it('should handle corrupted localStorage data', () => {
    localStorageMock.getItem.mockReturnValue('invalid json')

    const store = useActivationStore()
    store.loadActivationStatus()

    expect(store.activationStatus.isActivated).toBe(false)
  })

  it('should set activation status and persist to localStorage', () => {
    const mockStatus: ActivationStatus = {
      isActivated: true,
      activationKey: 'test-key',
      activatedAt: '2023-01-01T00:00:00.000Z',
      computerFingerprint: 'test-fingerprint',
    }

    const store = useActivationStore()
    store.setActivationStatus(mockStatus)

    expect(store.activationStatus).toEqual(mockStatus)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'activation_status',
      JSON.stringify(mockStatus),
    )
  })

  it('should set loading state', () => {
    const store = useActivationStore()
    
    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    
    store.setLoading(false)
    expect(store.isLoading).toBe(false)
  })

  it('should set and clear errors', () => {
    const store = useActivationStore()
    const errorMessage = 'Test error'
    
    store.setError(errorMessage)
    expect(store.error).toBe(errorMessage)
    
    store.clearError()
    expect(store.error).toBeNull()
  })

  it('should reset activation and clear localStorage', () => {
    const store = useActivationStore()
    
    // First set some activation status
    const mockStatus: ActivationStatus = {
      isActivated: true,
      activationKey: 'test-key',
      activatedAt: '2023-01-01T00:00:00.000Z',
      computerFingerprint: 'test-fingerprint',
    }
    store.setActivationStatus(mockStatus)
    
    // Then reset
    store.resetActivation()
    
    expect(store.activationStatus.isActivated).toBe(false)
    expect(store.activationStatus.activationKey).toBeUndefined()
    expect(store.activationStatus.activatedAt).toBeUndefined()
    expect(store.activationStatus.computerFingerprint).toBeUndefined()
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('activation_status')
  })
})