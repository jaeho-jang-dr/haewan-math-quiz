import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  createAudioContext, 
  resumeAudioContext, 
  createOscillatorSound,
  playCorrectSound,
  playWrongSound,
  playFanfareSound
} from '@/utils/audio'

// Mock AudioContext
const mockOscillator = {
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  frequency: {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn()
  },
  type: 'sine'
}

const mockGainNode = {
  connect: vi.fn(),
  gain: {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn()
  }
}

const mockAudioContext = {
  createOscillator: vi.fn(() => mockOscillator),
  createGain: vi.fn(() => mockGainNode),
  destination: {},
  currentTime: 0,
  state: 'running',
  resume: vi.fn().mockResolvedValue(undefined)
}

beforeEach(() => {
  vi.clearAllMocks()
  
  // Reset AudioContext mock
  Object.defineProperty(window, 'AudioContext', {
    writable: true,
    value: vi.fn(() => mockAudioContext)
  })
})

describe('audio utils', () => {
  describe('createAudioContext', () => {
    it('should create audio context when AudioContext is available', () => {
      const context = createAudioContext()
      expect(context).toBeTruthy()
      expect(window.AudioContext).toHaveBeenCalled()
    })

    it('should return null when AudioContext is not available', () => {
      Object.defineProperty(window, 'AudioContext', {
        value: undefined
      });
      (window as any).webkitAudioContext = undefined

      const context = createAudioContext()
      expect(context).toBeNull()
    })

    it('should use webkitAudioContext as fallback', () => {
      Object.defineProperty(window, 'AudioContext', {
        value: undefined
      });
      (window as any).webkitAudioContext = vi.fn(() => mockAudioContext)

      const context = createAudioContext()
      expect(context).toBeTruthy()
      expect((window as any).webkitAudioContext).toHaveBeenCalled()
    })
  })

  describe('resumeAudioContext', () => {
    it('should resume suspended audio context', async () => {
      const suspendedContext = {
        ...mockAudioContext,
        state: 'suspended'
      }

      await resumeAudioContext(suspendedContext as any)
      expect(suspendedContext.resume).toHaveBeenCalled()
    })

    it('should not resume running audio context', async () => {
      await resumeAudioContext(mockAudioContext as any)
      expect(mockAudioContext.resume).not.toHaveBeenCalled()
    })
  })

  describe('createOscillatorSound', () => {
    it('should create and configure oscillator', () => {
      createOscillatorSound(mockAudioContext as any, 440, 880, 0.5, 0.2, 'sine')

      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      expect(mockAudioContext.createGain).toHaveBeenCalled()
      expect(mockOscillator.connect).toHaveBeenCalledWith(mockGainNode)
      expect(mockGainNode.connect).toHaveBeenCalledWith(mockAudioContext.destination)
      expect(mockOscillator.start).toHaveBeenCalled()
      expect(mockOscillator.stop).toHaveBeenCalled()
    })

    it('should set frequency ramp', () => {
      createOscillatorSound(mockAudioContext as any, 440, 880, 0.5, 0.2, 'sine')

      expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(440, 0)
      expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(880, 0.2)
    })

    it('should set gain envelope', () => {
      createOscillatorSound(mockAudioContext as any, 440, 880, 0.5, 0.2, 'sine')

      expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalledWith(0.5, 0)
      expect(mockGainNode.gain.exponentialRampToValueAtTime).toHaveBeenCalledWith(0.001, 0.2)
    })
  })

  describe('sound functions', () => {
    it('should call playCorrectSound without errors', () => {
      expect(() => playCorrectSound()).not.toThrow()
    })

    it('should call playWrongSound without errors', () => {
      expect(() => playWrongSound()).not.toThrow()
    })

    it('should call playFanfareSound without errors', () => {
      expect(() => playFanfareSound()).not.toThrow()
    })

    it('should handle audio context creation failure gracefully', () => {
      Object.defineProperty(window, 'AudioContext', {
        value: undefined
      });
      (window as any).webkitAudioContext = undefined

      expect(() => playCorrectSound()).not.toThrow()
      expect(() => playWrongSound()).not.toThrow()
      expect(() => playFanfareSound()).not.toThrow()
    })
  })
})