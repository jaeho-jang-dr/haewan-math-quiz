import { useState, useEffect, useCallback } from 'react'
import { CelebrationParticle, Firework } from '@/types'
import { 
  createConfetti, 
  createMiniConfetti, 
  createFireworks, 
  createMiniFireworks,
  updateConfetti,
  updateFireworks
} from '@/utils/celebrations'
import { playFanfareSound, playMiniFanfareSound, playFireworkSound } from '@/utils/audio'

export interface UseCelebrationReturn {
  // State
  showCelebration: boolean
  celebrationStage: number
  confetti: CelebrationParticle[]
  fireworks: Firework[]
  
  // Actions
  startCelebration: () => void
  startMiniCelebration: () => void
  stopCelebration: () => void
}

export const useCelebration = (): UseCelebrationReturn => {
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationStage, setCelebrationStage] = useState(0)
  const [confetti, setConfetti] = useState<CelebrationParticle[]>([])
  const [fireworks, setFireworks] = useState<Firework[]>([])

  // Animation loop for particles
  useEffect(() => {
    if (!showCelebration) return

    const interval = setInterval(() => {
      setConfetti(updateConfetti)
      setFireworks(updateFireworks)
    }, 50)

    return () => clearInterval(interval)
  }, [showCelebration])

  const startCelebration = useCallback(() => {
    setCelebrationStage(0)
    setShowCelebration(true)
    
    // Play fanfare sound
    playFanfareSound()

    // Stage 1: Screen flash
    setTimeout(() => {
      setCelebrationStage(1)
      // Create fireworks and play sounds
      const newFireworks = createFireworks(12)
      setFireworks(newFireworks)
      newFireworks.forEach((_, index) => {
        setTimeout(() => playFireworkSound(), index * 200)
      })
    }, 500)

    // Stage 2: Confetti
    setTimeout(() => {
      setCelebrationStage(2)
      setConfetti(createConfetti(100))
    }, 1500)

    // Stage 3: Appliance reveal
    setTimeout(() => {
      setCelebrationStage(3)
    }, 2500)

    // End celebration
    setTimeout(() => {
      setShowCelebration(false)
      setCelebrationStage(0)
      setConfetti([])
      setFireworks([])
    }, 8000)
  }, [])

  const startMiniCelebration = useCallback(() => {
    // Play mini fanfare
    playMiniFanfareSound()

    // Create mini effects
    const miniFireworks = createMiniFireworks(3)
    setFireworks(prev => [...prev, ...miniFireworks])
    
    const miniConfettiParticles = createMiniConfetti(20)
    setConfetti(prev => [...prev, ...miniConfettiParticles])

    // Play firework sounds
    miniFireworks.forEach((_, index) => {
      setTimeout(() => playFireworkSound(), index * 100)
    })

    // Clean up mini effects after 1.5 seconds
    setTimeout(() => {
      const cutoffTime = Date.now() - 1000
      setFireworks(prev => prev.filter(fw => fw.id < cutoffTime))
      setConfetti(prev => prev.filter(cf => cf.id < cutoffTime))
    }, 1500)
  }, [])

  const stopCelebration = useCallback(() => {
    setShowCelebration(false)
    setCelebrationStage(0)
    setConfetti([])
    setFireworks([])
  }, [])

  return {
    showCelebration,
    celebrationStage,
    confetti,
    fireworks,
    startCelebration,
    startMiniCelebration,
    stopCelebration
  }
}