import React, { useState, useEffect } from 'react'
import { Home } from 'lucide-react'
import { Question } from '@/types'
import { generateQuestion } from '@/utils/gameLogic'
import { playCorrectSound, playWrongSound } from '@/utils/audio'
import { encourageHaewan, speakKorean } from '@/utils/speech'

interface GamePlayProps {
  level: number
  players: string[]
  currentPlayer: number
  onAnswer: (correct: boolean, score: number, streak: number) => void
  onGameComplete: (finalScore: number, finalStreak: number, questionsCorrect: number, completionTime: number) => void
  onBackToMenu: () => void
}

export const GamePlay: React.FC<GamePlayProps> = ({
  level,
  players,
  currentPlayer,
  onAnswer,
  onGameComplete,
  onBackToMenu
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [questionsCorrect, setQuestionsCorrect] = useState(0)
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [startTime] = useState(Date.now())

  // Initialize first question
  useEffect(() => {
    setQuestion(generateQuestion(level))
  }, [level])

  const selectAnswer = (answer: number) => {
    if (showResult || !question) return

    setSelectedAnswer(answer)
    const isCorrect = answer === question.correctAnswer

    if (isCorrect) {
      setScore(prev => prev + 10)
      setStreak(prev => {
        const newStreak = prev + 1
        setMaxStreak(current => Math.max(current, newStreak))
        
        // 혜완이 격려 음성 (연속 맞출 때)
        if (newStreak === 3 || newStreak === 5) {
          setTimeout(() => encourageHaewan(), 2000)
        }
        
        return newStreak
      })
      setQuestionsCorrect(prev => prev + 1)
      playCorrectSound()
    } else {
      setStreak(0)
      playWrongSound()
      
      // 틀렸을 때 격려
      if (Math.random() < 0.3) { // 30% 확률로
        setTimeout(() => speakKorean("괜찮아! 혜완이는 할 수 있어!", 0.95, 1.6), 2000)
      }
    }

    setShowResult(true)
    onAnswer(isCorrect, score + (isCorrect ? 10 : 0), isCorrect ? streak + 1 : 0)

    setTimeout(() => {
      setShowResult(false)
      setSelectedAnswer(null)

      if (currentQuestion < 9) {
        setCurrentQuestion(prev => prev + 1)
        setQuestion(generateQuestion(level))
      } else {
        // Game complete
        const finalScore = score + (isCorrect ? 10 : 0)
        const finalMaxStreak = Math.max(maxStreak, isCorrect ? streak + 1 : 0)
        const finalQuestionsCorrect = questionsCorrect + (isCorrect ? 1 : 0)
        const completionTime = Math.floor((Date.now() - startTime) / 1000)
        onGameComplete(finalScore, finalMaxStreak, finalQuestionsCorrect, completionTime)
      }
    }, 1500)
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col">
      {/* Safe Area for iPhone */}
      <div className="safe-area-inset-top"></div>
      
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl mx-4 mt-4 p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
          >
            <Home className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">메뉴</span>
          </button>
          
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">레벨 {level}</div>
            {players.length > 0 && (
              <div className="text-base text-blue-600 font-medium">{players[currentPlayer]}</div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">점수: {score}</div>
            <div className="text-sm text-orange-600">연속: {streak}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-2">
          <div className="flex justify-between mb-2">
            <span className="text-base font-bold text-gray-700">문제 {currentQuestion + 1}/10</span>
            <span className="text-base font-bold text-yellow-600">⭐ {Math.floor(score / 20)}/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl w-full max-w-sm">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-purple-700 mb-4">
            {question.text}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(option)}
              disabled={showResult}
              className={`py-6 px-4 rounded-2xl text-3xl font-bold transition-all duration-300 shadow-lg ${
                showResult
                  ? option === question.correctAnswer
                    ? 'bg-green-500 text-white transform scale-110 shadow-green-300'
                    : option === selectedAnswer
                    ? 'bg-red-500 text-white shadow-red-300'
                    : 'bg-gray-300 text-gray-500'
                  : 'bg-white/95 backdrop-blur-sm text-purple-700 hover:bg-purple-100 active:scale-95 hover:shadow-xl'
              }`}
              style={{
                minHeight: '80px',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result Display - 더 선명하게 */}
        {showResult && (
          <div className="mt-8 text-center">
            {selectedAnswer === question.correctAnswer ? (
              <div className="space-y-3 animate-bounce">
                <div className="bg-green-500 text-white px-6 py-4 rounded-3xl shadow-2xl">
                  <span className="text-3xl font-black drop-shadow-lg">🐦 정답! 잘했어요! 🐦</span>
                </div>
                <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-2xl shadow-xl">
                  <span className="text-xl font-bold">🎵 짹짹짹! 🎵</span>
                </div>
              </div>
            ) : (
              <div className="animate-bounce">
                <div className="bg-red-500 text-white px-6 py-4 rounded-3xl shadow-2xl">
                  <span className="text-3xl font-black drop-shadow-lg">😅 다시 한번!</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Safe Area for iPhone */}
      <div className="safe-area-inset-bottom"></div>
    </div>
  )
}