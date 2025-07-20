import { CelebrationParticle, Firework, FireworkParticle } from '@/types'

// Create confetti particles
export const createConfetti = (count: number = 100): CelebrationParticle[] => {
  const confetti: CelebrationParticle[] = []
  
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB6C1', '#87CEEB'][Math.floor(Math.random() * 9)],
      rotation: Math.random() * 360,
      speed: Math.random() * 4 + 2,
      size: Math.random() * 15 + 10,
      shape: ['🎉', '🎊', '⭐', '🌟', '💫', '✨', '🎈', '🎆'][Math.floor(Math.random() * 8)]
    })
  }
  
  return confetti
}

// Create mini confetti for small celebrations
export const createMiniConfetti = (count: number = 20): CelebrationParticle[] => {
  const confetti: CelebrationParticle[] = []
  
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
      speed: Math.random() * 3 + 2,
      size: Math.random() * 10 + 8,
      shape: ['🎉', '⭐', '✨', '💫'][Math.floor(Math.random() * 4)]
    })
  }
  
  return confetti
}

// Create firework with particles
export const createFirework = (x: number, y: number): Firework => {
  const firework: Firework = {
    id: Date.now() + Math.random(),
    x,
    y,
    color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FF8C94', '#A8E6CF'][Math.floor(Math.random() * 9)],
    size: Math.random() * 100 + 50,
    particles: []
  }

  // Create firework particles
  for (let j = 0; j < 20; j++) {
    firework.particles.push({
      id: j,
      angle: (j * 18) * Math.PI / 180,
      speed: Math.random() * 120 + 80,
      life: 100
    })
  }

  return firework
}

// Create multiple fireworks
export const createFireworks = (count: number = 12): Firework[] => {
  const fireworks: Firework[] = []
  
  for (let i = 0; i < count; i++) {
    const firework = createFirework(
      Math.random() * (window.innerWidth - 200) + 100,
      Math.random() * 300 + 100
    )
    fireworks.push(firework)
  }
  
  return fireworks
}

// Create mini fireworks for small celebrations
export const createMiniFireworks = (count: number = 3): Firework[] => {
  const fireworks: Firework[] = []
  
  for (let i = 0; i < count; i++) {
    const firework = createFirework(
      Math.random() * (window.innerWidth - 100) + 50,
      Math.random() * 200 + 50
    )
    
    // Smaller particle count for mini fireworks
    firework.particles = []
    for (let j = 0; j < 8; j++) {
      firework.particles.push({
        id: j,
        angle: (j * 45) * Math.PI / 180,
        speed: Math.random() * 60 + 40,
        life: 50
      })
    }
    
    fireworks.push(firework)
  }
  
  return fireworks
}

// Update confetti animation
export const updateConfetti = (confetti: CelebrationParticle[]): CelebrationParticle[] => {
  return confetti
    .map(particle => ({
      ...particle,
      y: particle.y + particle.speed,
      x: particle.x + Math.sin(particle.y * 0.01) * 3,
      rotation: particle.rotation + 8
    }))
    .filter(particle => particle.y < window.innerHeight + 50)
}

// Update firework animation
export const updateFireworks = (fireworks: Firework[]): Firework[] => {
  return fireworks
    .map(firework => ({
      ...firework,
      particles: firework.particles
        .map(particle => ({
          ...particle,
          life: particle.life - 2
        }))
        .filter(particle => particle.life > 0)
    }))
    .filter(firework => firework.particles.length > 0)
}

// Get firework particle position
export const getFireworkParticlePosition = (firework: Firework, particle: FireworkParticle) => {
  const progress = (100 - particle.life) / 100
  return {
    x: firework.x + Math.cos(particle.angle) * (particle.speed * progress),
    y: firework.y + Math.sin(particle.angle) * (particle.speed * progress)
  }
}