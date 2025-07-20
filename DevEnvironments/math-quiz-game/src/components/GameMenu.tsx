import React from 'react'
import { PlayerScore } from '@/types'

interface GameMenuProps {
  players: string[]
  currentPlayer: number
  playerScores: Record<string, PlayerScore>
  playerCollections: Record<string, string[]>
  onStartGame: (level: number) => void
  onSelectPlayer: (index: number) => void
  onViewCollection: () => void
  onViewScoreboard: () => void
  onBackToSetup: () => void
}

export const GameMenu: React.FC<GameMenuProps> = ({
  players,
  currentPlayer,
  playerScores,
  playerCollections,
  onStartGame,
  onSelectPlayer,
  onViewCollection,
  onViewScoreboard,
  onBackToSetup
}) => {
  const currentPlayerName = players[currentPlayer]
  const currentPlayerScore = playerScores[currentPlayerName]?.total || 0
  const currentPlayerCollection = playerCollections[currentPlayerName] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col">
      {/* iPhone Safe Area */}
      <div className="safe-area-inset-top"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 text-center max-w-lg w-full mx-4">
          {/* Current Player Display */}
          {players.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl border-2 border-yellow-400">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">
                🎯 {currentPlayerName === '김해완' ? '해완이의 차례' : `${currentPlayerName}님의 차례`}
              </h2>
              <div className="text-base text-gray-700 font-semibold">
                현재 총점: {currentPlayerScore}점 ⭐
              </div>
              <div className="text-sm text-gray-600 mt-1">
                수집품: {currentPlayerCollection.length}개 🏆
              </div>
            </div>
          )}

          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            🔢 해완이의 수학 게임
          </h1>
          <h2 className="text-xl font-bold text-purple-700 mb-6">가전제품을 모아보자! 🎮</h2>

          {/* Level Selection */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">난이도를 선택하세요!</h3>
            <button
              onClick={() => onStartGame(1)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-6 rounded-3xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg ios-touch-target"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              🌟 레벨 1 - 쉬워요!
              <div className="text-sm font-normal mt-1">덧셈/뺄셈 (1~10)</div>
            </button>
            <button
              onClick={() => onStartGame(2)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-6 rounded-3xl text-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg ios-touch-target"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              💫 레벨 2 - 보통이에요!
              <div className="text-sm font-normal mt-1">덧셈/뺄셈 (5~20)</div>
            </button>
            <button
              onClick={() => onStartGame(3)}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-6 px-6 rounded-3xl text-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg ios-touch-target"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              🚀 레벨 3 - 어려워요!
              <div className="text-sm font-normal mt-1">곱셈 구구단</div>
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={onViewCollection}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl text-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg ios-touch-target"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              🏆 내 가전제품 보기 ({currentPlayerCollection.length}개)
            </button>
            <button
              onClick={onViewScoreboard}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-2xl text-lg font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg ios-touch-target"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              📊 순위표 보기
            </button>
          </div>

          {/* Player Selection */}
          {players.length > 1 && (
            <div className="mb-6 p-4 bg-gray-100/80 rounded-2xl">
              <h3 className="text-base font-bold text-gray-700 mb-3 text-center">👥 플레이어 바꾸기</h3>
              <div className="grid grid-cols-2 gap-2">
                {players.map((player, index) => (
                  <button
                    key={player}
                    onClick={() => onSelectPlayer(index)}
                    className={`py-3 px-3 rounded-xl text-sm font-bold transition-all duration-200 ios-touch-target ${
                      index === currentPlayer
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-100'
                    }`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {index === currentPlayer ? '👑' : '👤'} {player}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onBackToSetup}
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            🔧 플레이어 다시 설정하기
          </button>
        </div>
      </div>
      
      {/* iPhone Safe Area */}
      <div className="safe-area-inset-bottom"></div>
    </div>
  )
}