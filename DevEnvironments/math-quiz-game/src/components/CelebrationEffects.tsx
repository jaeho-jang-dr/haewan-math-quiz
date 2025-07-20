import React from 'react'
import { CelebrationParticle, Firework } from '@/types'
import { getFireworkParticlePosition } from '@/utils/celebrations'

interface CelebrationEffectsProps {
  showCelebration: boolean
  celebrationStage: number
  confetti: CelebrationParticle[]
  fireworks: Firework[]
}

export const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({
  showCelebration,
  celebrationStage,
  confetti,
  fireworks
}) => {
  if (!showCelebration) return null

  return (
    <>
      {/* Screen flash effect */}
      {celebrationStage === 0 && (
        <div className="absolute inset-0 bg-white animate-pulse opacity-50 z-50" />
      )}

      {/* Fanfare text */}
      {celebrationStage >= 1 && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="text-8xl font-bold text-white drop-shadow-2xl animate-bounce">
            🎺 팡파레! 🎺
          </div>
          <div className="text-4xl font-bold text-yellow-300 text-center mt-2 animate-pulse">
            ♪♫♪ 따라라라라~ ♪♫♪
          </div>
        </div>
      )}

      {/* Fireworks */}
      {celebrationStage >= 1 &&
        fireworks.map((firework) => (
          <div key={firework.id} className="absolute pointer-events-none z-40">
            {/* Firework center */}
            <div
              className="absolute w-8 h-8 rounded-full animate-ping"
              style={{
                left: firework.x,
                top: firework.y,
                backgroundColor: firework.color,
                boxShadow: `0 0 30px ${firework.color}`
              }}
            />
            {/* Firework particles */}
            {firework.particles.map((particle) => {
              const position = getFireworkParticlePosition(firework, particle)
              return (
                <div
                  key={particle.id}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    left: position.x,
                    top: position.y,
                    backgroundColor: firework.color,
                    opacity: particle.life / 100,
                    boxShadow: `0 0 20px ${firework.color}`,
                    transform: `scale(${particle.life / 100})`
                  }}
                />
              )
            })}
          </div>
        ))}

      {/* Confetti */}
      {celebrationStage >= 2 &&
        confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute pointer-events-none z-30"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `rotate(${particle.rotation}deg) scale(${particle.size / 15})`,
              color: particle.color,
              fontSize: `${particle.size}px`,
              textShadow: `0 0 10px ${particle.color}`
            }}
          >
            {particle.shape}
          </div>
        ))}
    </>
  )
}