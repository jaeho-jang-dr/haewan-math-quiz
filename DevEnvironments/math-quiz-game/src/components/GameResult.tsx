import React from 'react'
import { Appliance } from '@/types'
import { getGrade, getAccuracy } from '@/utils/gameLogic'
import { CelebrationEffects } from './CelebrationEffects'

interface GameResultProps {
  score: number
  streak: number
  level: number
  players: string[]
  currentPlayer: number
  newReward: string | null
  appliance: Appliance | null
  showCelebration: boolean
  celebrationStage: number
  confetti: any[]
  fireworks: any[]
  onBackToMenu: () => void
  onViewScoreboard: () => void
}

export const GameResult: React.FC<GameResultProps> = ({
  score,
  streak,
  players,
  currentPlayer,
  newReward,
  appliance,
  showCelebration,
  celebrationStage,
  confetti,
  fireworks,
  onBackToMenu,
  onViewScoreboard
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Celebration Effects */}
      <CelebrationEffects
        showCelebration={showCelebration}
        celebrationStage={celebrationStage}
        confetti={confetti}
        fireworks={fireworks}
      />

      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-2xl w-full relative z-30">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">🎉 게임 완료!</h1>

        {/* Player Info */}
        {players.length > 0 && (
          <div className="text-2xl font-bold text-blue-600 mb-4">
            🏆 {players[currentPlayer]}님의 결과
          </div>
        )}

        <div className="text-6xl mb-4 animate-pulse">
          {getGrade(score)}
        </div>

        <div className="text-3xl font-bold text-green-600 mb-2">점수: {score}점 / 100점</div>
        <div className="text-xl text-gray-600 mb-2">정답률: {getAccuracy(score)}%</div>
        <div className="text-xl text-orange-600 mb-6">최고 연속: {streak}문제</div>

        {/* New Reward Display */}
        {newReward && appliance && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-2xl p-6 mb-6 relative overflow-hidden">
            {/* Sparkle effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-ping" />

            <h3 className="text-2xl font-bold text-yellow-600 mb-3">🎁 새로운 가전제품 획득!</h3>

            {/* Appliance Animation */}
            <div
              className={`relative mx-auto w-72 h-72 mb-6 transition-all duration-1500 ${
                celebrationStage >= 3
                  ? 'transform scale-100 opacity-100'
                  : 'transform scale-0 opacity-0'
              }`}
            >
              {/* Main appliance box */}
              <div
                className={`w-full h-full bg-gradient-to-br ${appliance.color} rounded-3xl shadow-2xl relative overflow-hidden border-8 border-white ${
                  celebrationStage >= 3 ? 'animate-bounce' : ''
                }`}
              >
                {/* 3D effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black opacity-30 rounded-3xl" />
                <div className="absolute top-8 left-8 w-16 h-16 bg-white opacity-60 rounded-full animate-pulse blur-sm" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white opacity-40 rounded-full animate-ping" />

                {/* Appliance image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`text-9xl transform ${
                      celebrationStage >= 3 ? 'animate-pulse scale-110' : 'scale-0'
                    } transition-transform duration-1500 delay-500 drop-shadow-2xl`}
                  >
                    {appliance.image}
                  </div>
                </div>

                {/* Icon badge */}
                <div
                  className={`absolute -top-6 -right-6 text-6xl transform ${
                    celebrationStage >= 3 ? 'animate-spin' : 'scale-0'
                  } transition-transform duration-1500 delay-1000`}
                >
                  <div className="bg-yellow-400 rounded-full p-4 shadow-2xl border-4 border-white">
                    {appliance.icon}
                  </div>
                </div>

                {/* Sparkle stars */}
                {celebrationStage >= 3 && (
                  <>
                    <div className="absolute top-4 left-16 text-4xl animate-ping delay-300">⭐</div>
                    <div className="absolute bottom-8 right-16 text-4xl animate-ping delay-500">✨</div>
                    <div className="absolute top-16 right-8 text-4xl animate-ping delay-700">🌟</div>
                    <div className="absolute bottom-16 left-8 text-4xl animate-ping delay-900">💫</div>
                    <div className="absolute top-1/2 left-4 text-3xl animate-ping delay-1100">🎆</div>
                    <div className="absolute top-1/2 right-4 text-3xl animate-ping delay-1300">🎇</div>
                    <div className="absolute bottom-4 left-1/2 text-3xl animate-ping delay-1500">🌠</div>
                    <div className="absolute top-4 left-1/2 text-3xl animate-ping delay-1700">✨</div>
                  </>
                )}

                {/* Glowing border */}
                <div className="absolute inset-0 rounded-3xl border-4 border-yellow-300 opacity-80 animate-pulse" />
                <div className="absolute inset-2 rounded-3xl border-2 border-white opacity-60 animate-ping" />
              </div>

              {/* Surrounding decoration */}
              <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full border-8 border-yellow-300 rounded-full opacity-30 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            <div
              className={`transition-all duration-1500 ${
                celebrationStage >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
              }`}
            >
              <div className="text-4xl font-bold text-gray-800 mb-3 drop-shadow-lg">{appliance.name}</div>
              <div className="text-2xl text-gray-600 mb-6 leading-relaxed">{appliance.description}</div>

              {/* Success sound effect representation */}
              <div className="text-6xl animate-pulse mb-4">🎺🎉 대성공! 🎉🎺</div>
              <div className="text-4xl animate-bounce">🔊 따-따-단! 짝짝짝! 🎵</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onBackToMenu}
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-2xl text-xl font-bold hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            🏠 메인 메뉴
          </button>
          <button
            onClick={onViewScoreboard}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl text-xl font-bold hover:bg-green-600 transition-colors transform hover:scale-105"
          >
            📊 스코어보드 보기
          </button>
        </div>
      </div>
    </div>
  )
}