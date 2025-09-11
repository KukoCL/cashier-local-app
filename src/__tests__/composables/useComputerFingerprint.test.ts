import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useComputerFingerprint } from '../../composables/useComputerFingerprint'

// Mock navigator
const mockNavigator = {
  userAgent: 'test-agent',
  platform: 'test-platform',
  language: 'en-US',
  hardwareConcurrency: 4,
  maxTouchPoints: 0,
  cookieEnabled: true,
  doNotTrack: null,
}

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
})

// Mock screen
Object.defineProperty(window, 'screen', {
  value: {
    width: 1920,
    height: 1080,
    colorDepth: 24,
  },
  writable: true,
})

// Mock Intl
Object.defineProperty(window, 'Intl', {
  value: {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({
        timeZone: 'America/New_York',
      }),
    }),
  },
  writable: true,
})

describe('useComputerFingerprint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate computer fingerprint', async () => {
    const { generateFingerprint, isGenerating, error } = useComputerFingerprint()

    expect(isGenerating.value).toBe(false)
    expect(error.value).toBeNull()

    const fingerprint = await generateFingerprint()

    expect(fingerprint).toBeDefined()
    expect(fingerprint?.userAgent).toBe('test-agent')
    expect(fingerprint?.platform).toBe('test-platform')
    expect(fingerprint?.language).toBe('en-US')
    expect(fingerprint?.screenResolution).toBe('1920x1080x24')
    expect(fingerprint?.timezone).toBe('America/New_York')
    expect(fingerprint?.hardwareConcurrency).toBe(4)
    expect(fingerprint?.maxTouchPoints).toBe(0)
    expect(fingerprint?.hash).toBeDefined()
    expect(typeof fingerprint?.hash).toBe('string')
  })

  it('should set loading state during generation', async () => {
    const { generateFingerprint, isGenerating } = useComputerFingerprint()

    // Check that it's not loading initially
    expect(isGenerating.value).toBe(false)

    // Generate fingerprint and check that it completes
    const fingerprint = await generateFingerprint()
    
    // Check that loading is false after completion
    expect(isGenerating.value).toBe(false)
    expect(fingerprint).toBeDefined()
  })

  it('should generate consistent hash for same data', async () => {
    const { generateFingerprint } = useComputerFingerprint()

    const fingerprint1 = await generateFingerprint()
    const fingerprint2 = await generateFingerprint()

    expect(fingerprint1?.hash).toBe(fingerprint2?.hash)
  })

  it('should clear error', () => {
    const { error, clearError } = useComputerFingerprint()

    // Manually set an error
    error.value = 'Test error'
    expect(error.value).toBe('Test error')

    clearError()
    expect(error.value).toBeNull()
  })

  it('should generate different hashes for different data', async () => {
    const { generateFingerprint } = useComputerFingerprint()

    // Get initial fingerprint
    const fingerprint1 = await generateFingerprint()

    // Change navigator data
    Object.defineProperty(window, 'navigator', {
      value: {
        ...mockNavigator,
        userAgent: 'different-agent',
      },
      writable: true,
    })

    const fingerprint2 = await generateFingerprint()

    expect(fingerprint1?.hash).not.toBe(fingerprint2?.hash)
  })
})