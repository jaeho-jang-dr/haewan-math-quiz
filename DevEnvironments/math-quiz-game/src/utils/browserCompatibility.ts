// Browser compatibility utilities for Safari/Edge support

// Feature detection for better compatibility
export const isFeatureSupported = {
  // Check if localStorage is available (Safari private mode)
  localStorage: (() => {
    try {
      if (typeof Storage === 'undefined' || !window.localStorage) {
        return false
      }
      const test = '__test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  })(),

  // Check if AudioContext is supported
  audioContext: (() => {
    try {
      return !!(window.AudioContext || 
               (window as any).webkitAudioContext || 
               (window as any).mozAudioContext ||
               (window as any).msAudioContext)
    } catch {
      return false
    }
  })(),

  // Check if touch events are supported
  touch: (() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })(),

  // Check if service worker is supported
  serviceWorker: (() => {
    return 'serviceWorker' in navigator
  })()
}

// Safe object access without optional chaining for older browsers
export const safeGet = <T>(obj: any, path: string, defaultValue: T): T => {
  try {
    const keys = path.split('.')
    let current = obj
    for (const key of keys) {
      if (current === null || current === undefined) {
        return defaultValue
      }
      current = current[key]
    }
    return current !== undefined ? current : defaultValue
  } catch {
    return defaultValue
  }
}

// iOS Safari detection
export const isIOSSafari = (): boolean => {
  const ua = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua)
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua)
  return isIOS && isSafari
}

// Edge detection
export const isEdge = (): boolean => {
  return navigator.userAgent.includes('Edg/') || navigator.userAgent.includes('Edge/')
}

// Safe audio context creation for Safari
export const createSafeAudioContext = (): AudioContext | null => {
  if (!isFeatureSupported.audioContext) {
    return null
  }

  try {
    const AudioContextClass = window.AudioContext || 
                             (window as any).webkitAudioContext || 
                             (window as any).mozAudioContext ||
                             (window as any).msAudioContext

    const ctx = new AudioContextClass()
    
    // iOS Safari requires user interaction
    if (isIOSSafari() && ctx.state === 'suspended') {
      console.log('Audio context suspended - will resume on user interaction')
    }
    
    return ctx
  } catch (error) {
    console.warn('Failed to create audio context:', error)
    return null
  }
}

// Safe localStorage wrapper
export const safeStorage = {
  getItem: (key: string): string | null => {
    if (!isFeatureSupported.localStorage) {
      return null
    }
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    if (!isFeatureSupported.localStorage) {
      return false
    }
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  },

  removeItem: (key: string): boolean => {
    if (!isFeatureSupported.localStorage) {
      return false
    }
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// Polyfill for requestAnimationFrame
export const safeRequestAnimationFrame = (callback: FrameRequestCallback): number => {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame(callback)
  }
  // Fallback for older browsers
  return window.setTimeout(callback, 16) // ~60fps
}

// Console warning for unsupported features
export const warnUnsupportedFeature = (feature: string): void => {
  console.warn(`Feature not supported in this browser: ${feature}`)
}