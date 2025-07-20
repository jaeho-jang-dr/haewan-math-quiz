import React, { useEffect, useState } from 'react'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { PlayerInput } from './PlayerInput'
import { greetHaewan, stopSpeech } from '../utils/speech'

interface PlayerSetupProps {
  players: string[]
  onAddPlayer: (name: string) => void
  onRemovePlayer: (name: string) => void
  onStart: () => void
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStart
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    // 자동으로 해완이 추가
    if (players.length === 0) {
      onAddPlayer('김해완')
    }
  }, [])

  useEffect(() => {
    // 음성 인사말
    if (soundEnabled && players.length > 0) {
      setTimeout(() => {
        greetHaewan()
      }, 1000)
    }

    // 반짝이 효과
    setShowSparkles(true)
    const timer = setTimeout(() => setShowSparkles(false), 3000)
    return () => clearTimeout(timer)
  }, [soundEnabled, players.length])

  const handleSoundToggle = () => {
    if (soundEnabled) {
      stopSpeech()
    }
    setSoundEnabled(!soundEnabled)
  }

  const handleManualGreeting = () => {
    if (soundEnabled) {
      greetHaewan()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* iPhone Safe Area */}
      <div className="safe-area-inset-top"></div>
      
      {/* Sparkles Animation */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-300 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            />
          ))}
        </div>
      )}

      {/* Sound Control */}
      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={handleSoundToggle}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/30 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : (
            <VolumeX className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center max-w-lg w-full mx-4">
        {/* 해완이 전용 환영 메시지 */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">👋</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            안녕 해완! 
          </h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            게임을 시작해 볼까? 🎮
          </h2>
          
          {/* 음성 메시지 버튼 */}
          <button
            onClick={handleManualGreeting}
            disabled={!soundEnabled}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-2xl mb-6 hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg disabled:opacity-50"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            🔊 인사말 듣기
          </button>
        </div>

        {/* 플레이어 추가 옵션 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">친구도 함께할까요?</h3>
          {players.length < 4 && (
            <div className="mb-4">
              <PlayerInput onAddPlayer={onAddPlayer} disabled={players.length >= 4} />
            </div>
          )}
        </div>

        {/* Player List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">🌟 플레이어</h3>
          {players.length === 0 ? (
            <p className="text-gray-500 text-lg">잠깐만요...</p>
          ) : (
            <div className="space-y-3">
              {players.map((player, index) => (
                <div
                  key={player}
                  className={`rounded-2xl p-4 flex items-center justify-between transition-all duration-300 ${
                    player === '김해완' 
                      ? 'bg-gradient-to-r from-yellow-200 to-orange-200 border-2 border-yellow-400' 
                      : 'bg-gradient-to-r from-blue-100 to-purple-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">
                      {player === '김해완' ? '👑' : index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                    <span className={`text-lg font-bold ${
                      player === '김해완' ? 'text-orange-800' : 'text-gray-800'
                    }`}>
                      {player}
                      {player === '김해완' && <span className="ml-2">⭐</span>}
                    </span>
                  </div>
                  {player !== '김해완' && (
                    <button
                      onClick={() => onRemovePlayer(player)}
                      className="text-red-500 hover:text-red-700 text-xl font-bold"
                      aria-label={`${player} 제거`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Start Button */}
        {players.length > 0 && (
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl font-bold py-6 px-8 rounded-3xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl w-full"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            🚀 해완이의 수학 모험 시작! 
          </button>
        )}
      </div>
      
      {/* iPhone Safe Area */}
      <div className="safe-area-inset-bottom"></div>
    </div>
  )
}