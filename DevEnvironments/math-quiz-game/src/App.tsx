import { useState, useCallback } from 'react'
import { PlayerSetup } from './components/PlayerSetup'
import { GameMenu } from './components/GameMenu'
import { GamePlay } from './components/GamePlay'
import { GameResult } from './components/GameResult'
import { Scoreboard } from './components/Scoreboard'
import { Collection } from './components/Collection'
import { useGameState } from './hooks/useGameState'
import { useCelebration } from './hooks/useCelebration'
import { appliances } from './data/appliances'
import { checkRewards } from './utils/gameLogic'
import { getGameService } from './services/gameService'

function App() {
  const {
    gameState,
    setGameState,
    players,
    currentPlayer,
    playerScores,
    playerCollections,
    collectedItems,
    addPlayer,
    removePlayer,
    selectPlayer,
    updateScore,
    updateCollection
  } = useGameState()

  const {
    showCelebration,
    celebrationStage,
    confetti,
    fireworks,
    startCelebration,
    startMiniCelebration,
    stopCelebration
  } = useCelebration()

  const [gameLevel, setGameLevel] = useState(1)
  const [finalScore, setFinalScore] = useState(0)
  const [finalStreak, setFinalStreak] = useState(0)
  const [newReward, setNewReward] = useState<string | null>(null)

  // Start game with players
  const startGameWithPlayers = useCallback(() => {
    if (players.length > 0) {
      selectPlayer(0)
      setGameState('menu')
    }
  }, [players, selectPlayer, setGameState])

  // Start specific level
  const startGame = useCallback((level: number) => {
    setGameLevel(level)
    setGameState('playing')
  }, [setGameState])

  // Handle answer feedback
  const handleAnswer = useCallback((correct: boolean, _score: number, _streak: number) => {
    if (correct) {
      startMiniCelebration()
    }
  }, [startMiniCelebration])

  // Handle game completion
  const handleGameComplete = useCallback(async (score: number, streak: number, questionsCorrect: number, completionTime: number) => {
    setFinalScore(score)
    setFinalStreak(streak)

    // Save game result to database
    try {
      const gameService = getGameService()
      const currentPlayerName = players[currentPlayer]
      
      if (currentPlayerName) {
        const gameResult = await gameService.saveGameResult(
          currentPlayerName,
          gameLevel,
          score,
          questionsCorrect,
          streak,
          completionTime
        )

        // Check for new rewards from database
        if (gameResult.newAppliances.length > 0) {
          setNewReward(gameResult.newAppliances[0].appliance_id)
          startCelebration()
        }
      }
    } catch (error) {
      console.error('Failed to save game result:', error)
    }

    // Still update local state for immediate UI feedback
    const rewards = checkRewards(score, streak, gameLevel, collectedItems)
    if (rewards.length > 0) {
      const updatedItems = [...collectedItems, ...rewards]
      updateCollection(updatedItems)
      if (!newReward) {
        setNewReward(rewards[0])
        startCelebration()
      }
    }

    // Update player score
    updateScore(score, gameLevel)
    
    setTimeout(() => {
      setGameState('result')
    }, 100)
  }, [gameLevel, collectedItems, updateCollection, updateScore, startCelebration, setGameState, players, currentPlayer, newReward])

  // Navigation handlers
  const handleBackToMenu = useCallback(() => {
    setGameState('menu')
    setNewReward(null)
    stopCelebration()
  }, [setGameState, stopCelebration])

  const handleViewScoreboard = useCallback(() => {
    setGameState('scoreboard')
    setNewReward(null)
    stopCelebration()
  }, [setGameState, stopCelebration])

  const handleViewCollection = useCallback(() => {
    setGameState('collection')
  }, [setGameState])

  const handleBackToSetup = useCallback(() => {
    setGameState('playerSetup')
  }, [setGameState])

  // Render current game state
  switch (gameState) {
    case 'playerSetup':
      return (
        <PlayerSetup
          players={players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onStart={startGameWithPlayers}
        />
      )

    case 'menu':
      return (
        <GameMenu
          players={players}
          currentPlayer={currentPlayer}
          playerScores={playerScores}
          playerCollections={playerCollections}
          onStartGame={startGame}
          onSelectPlayer={selectPlayer}
          onViewCollection={handleViewCollection}
          onViewScoreboard={handleViewScoreboard}
          onBackToSetup={handleBackToSetup}
        />
      )

    case 'playing':
      return (
        <GamePlay
          level={gameLevel}
          players={players}
          currentPlayer={currentPlayer}
          onAnswer={handleAnswer}
          onGameComplete={handleGameComplete}
          onBackToMenu={handleBackToMenu}
        />
      )

    case 'result':
      return (
        <GameResult
          score={finalScore}
          streak={finalStreak}
          level={gameLevel}
          players={players}
          currentPlayer={currentPlayer}
          newReward={newReward}
          appliance={newReward ? appliances[newReward] : null}
          showCelebration={showCelebration}
          celebrationStage={celebrationStage}
          confetti={confetti}
          fireworks={fireworks}
          onBackToMenu={handleBackToMenu}
          onViewScoreboard={handleViewScoreboard}
        />
      )

    case 'collection':
      return (
        <Collection
          onBack={handleBackToMenu}
          currentPlayer={players[currentPlayer]}
        />
      )

    case 'scoreboard':
      return (
        <Scoreboard
          onBack={handleBackToMenu}
        />
      )

    default:
      return null
  }
}

export default App