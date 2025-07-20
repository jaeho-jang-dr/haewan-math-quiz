import { AudioContextType } from '@/types'

// Safe audio context creation with fallbacks for Safari/Edge
export const createAudioContext = (): AudioContextType | null => {
  try {
    if (typeof window !== 'undefined') {
      // Support both standard and webkit prefixed AudioContext
      const AudioContextClass = window.AudioContext || 
                               (window as any).webkitAudioContext || 
                               (window as any).mozAudioContext ||
                               (window as any).msAudioContext
      
      if (AudioContextClass) {
        const ctx = new AudioContextClass()
        // Safari requires user interaction before audio context can be started
        if (ctx.state === 'suspended') {
          // Will be resumed on first user interaction
        }
        return ctx
      }
    }
  } catch (error) {
    console.warn('AudioContext creation failed:', error)
  }
  return null
}

// Resume audio context for mobile compatibility
export const resumeAudioContext = async (audioContext: AudioContextType): Promise<void> => {
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }
  } catch (error) {
    console.warn('AudioContext resume failed:', error)
  }
}

// Create oscillator sound
export const createOscillatorSound = (
  audioContext: AudioContextType,
  frequency: number,
  endFrequency: number,
  volume: number,
  duration: number,
  type: OscillatorType = 'sine'
): void => {
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, audioContext.currentTime + duration)
    oscillator.type = type

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration)
  } catch (error) {
    console.warn('Oscillator sound creation failed:', error)
  }
}

// Play bird sound for correct answers
export const playCorrectSound = (): void => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  resumeAudioContext(audioContext).then(() => {
    // Three bird chirps
    setTimeout(() => createOscillatorSound(audioContext, 1500, 2000, 0.4, 0.08), 0)
    setTimeout(() => createOscillatorSound(audioContext, 1600, 2200, 0.35, 0.08), 120)
    setTimeout(() => createOscillatorSound(audioContext, 1800, 2500, 0.3, 0.1), 240)
  }).catch(console.warn)
}

// Play buzz sound for wrong answers
export const playWrongSound = (): void => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  resumeAudioContext(audioContext).then(() => {
    createOscillatorSound(audioContext, 300, 250, 0.3, 0.3, 'sine')
  }).catch(console.warn)
}

// Play fanfare for celebrations
export const playFanfareSound = (): void => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  resumeAudioContext(audioContext).then(() => {
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    fanfareNotes.forEach((freq, index) => {
      setTimeout(() => {
        createOscillatorSound(audioContext, freq, freq, 0.7, 0.5, 'square')
      }, index * 200)
    })
  }).catch(console.warn)
}

// Play mini fanfare for rewards
export const playMiniFanfareSound = (): void => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  resumeAudioContext(audioContext).then(() => {
    const notes = [659.25, 783.99] // E5, G5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        createOscillatorSound(audioContext, freq, freq, 0.5, 0.3, 'triangle')
      }, index * 100)
    })
  }).catch(console.warn)
}

// Play firework sound
export const playFireworkSound = (): void => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  resumeAudioContext(audioContext).then(() => {
    createOscillatorSound(audioContext, 800, 200, 0.8, 0.3, 'sawtooth')
  }).catch(console.warn)
}