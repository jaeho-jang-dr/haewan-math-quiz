import { useState, useCallback } from 'react'
import { GameState, PlayerScore, GameProgress } from '@/types'

export interface UseGameStateReturn {
  // Game state
  gameState: GameState
  setGameState: (state: GameState) => void
  
  // Players
  players: string[]
  currentPlayer: number
  playerScores: Record<string, PlayerScore>
  playerCollections: Record<string, string[]>
  
  // Game progress
  gameProgress: GameProgress
  collectedItems: string[]
  
  // Actions
  addPlayer: (name: string) => void
  removePlayer: (name: string) => void
  selectPlayer: (index: number) => void
  updateScore: (score: number, level: number) => void
  updateCollection: (items: string[]) => void
  resetGame: () => void
}

export const useGameState = (): UseGameStateReturn => {
  const [gameState, setGameState] = useState<GameState>('playerSetup')
  const [players, setPlayers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [playerScores, setPlayerScores] = useState<Record<string, PlayerScore>>({})
  const [playerCollections, setPlayerCollections] = useState<Record<string, string[]>>({})
  const [collectedItems, setCollectedItems] = useState<string[]>([])
  
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentPlayer: 0,
    currentQuestion: 0,
    score: 0,
    streak: 0,
    level: 1
  })

  const addPlayer = useCallback((name: string) => {
    if (players.length < 4 && name.trim() && !players.includes(name.trim())) {
      const newPlayers = [...players, name.trim()]
      setPlayers(newPlayers)
      
      setPlayerScores(prev => ({
        ...prev,
        [name.trim()]: { total: 0, level1: 0, level2: 0, level3: 0 }
      }))
      
      setPlayerCollections(prev => ({
        ...prev,
        [name.trim()]: []
      }))
    }
  }, [players])

  const removePlayer = useCallback((name: string) => {
    setPlayers(players.filter(p => p !== name))
    
    const newScores = { ...playerScores }
    const newCollections = { ...playerCollections }
    delete newScores[name]
    delete newCollections[name]
    
    setPlayerScores(newScores)
    setPlayerCollections(newCollections)
  }, [players, playerScores, playerCollections])

  const selectPlayer = useCallback((index: number) => {
    setCurrentPlayer(index)
    setGameProgress(prev => ({ ...prev, currentPlayer: index }))
    
    // Load player's collection
    if (players[index]) {
      const playerItems = playerCollections[players[index]] || []
      setCollectedItems([...playerItems])
    }
    
    // Reset game progress
    setGameProgress(prev => ({
      ...prev,
      currentPlayer: index,
      currentQuestion: 0,
      score: 0,
      streak: 0
    }))
  }, [players, playerCollections])

  const updateScore = useCallback((score: number, level: number) => {
    if (players.length > 0) {
      const playerName = players[currentPlayer]
      
      setPlayerScores(prev => {
        const newScores = { ...prev }
        if (!newScores[playerName]) {
          newScores[playerName] = { total: 0, level1: 0, level2: 0, level3: 0 }
        }
        
        // Update level score (keep highest)
        const levelKey = `level${level}` as keyof PlayerScore
        const currentLevelScore = newScores[playerName][levelKey] || 0
        newScores[playerName][levelKey] = Math.max(currentLevelScore, score)
        
        // Recalculate total
        newScores[playerName].total = 
          (newScores[playerName].level1 || 0) + 
          (newScores[playerName].level2 || 0) + 
          (newScores[playerName].level3 || 0)
        
        return newScores
      })
    }
  }, [players, currentPlayer])

  const updateCollection = useCallback((items: string[]) => {
    setCollectedItems([...items])
    
    if (players.length > 0) {
      const playerName = players[currentPlayer]
      setPlayerCollections(prev => ({
        ...prev,
        [playerName]: [...items]
      }))
    }
  }, [players, currentPlayer])

  const resetGame = useCallback(() => {
    setGameState('playerSetup')
    setPlayers([])
    setCurrentPlayer(0)
    setPlayerScores({})
    setPlayerCollections({})
    setCollectedItems([])
    setGameProgress({
      currentPlayer: 0,
      currentQuestion: 0,
      score: 0,
      streak: 0,
      level: 1
    })
  }, [])

  return {
    gameState,
    setGameState,
    players,
    currentPlayer,
    playerScores,
    playerCollections,
    gameProgress,
    collectedItems,
    addPlayer,
    removePlayer,
    selectPlayer,
    updateScore,
    updateCollection,
    resetGame
  }
}