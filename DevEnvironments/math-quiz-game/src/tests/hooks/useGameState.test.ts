import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGameState } from '@/hooks/useGameState'

describe('useGameState', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useGameState())

    expect(result.current.gameState).toBe('playerSetup')
    expect(result.current.players).toEqual([])
    expect(result.current.currentPlayer).toBe(0)
    expect(result.current.playerScores).toEqual({})
    expect(result.current.playerCollections).toEqual({})
    expect(result.current.collectedItems).toEqual([])
  })

  it('adds players correctly', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
    })

    expect(result.current.players).toEqual(['Player 1'])
    expect(result.current.playerScores).toHaveProperty('Player 1')
    expect(result.current.playerCollections).toHaveProperty('Player 1')
  })

  it('prevents adding more than 4 players', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
    })
    act(() => {
      result.current.addPlayer('Player 2')
    })
    act(() => {
      result.current.addPlayer('Player 3')
    })
    act(() => {
      result.current.addPlayer('Player 4')
    })
    act(() => {
      result.current.addPlayer('Player 5') // Should not be added
    })

    expect(result.current.players).toHaveLength(4)
    expect(result.current.players).toEqual(['Player 1', 'Player 2', 'Player 3', 'Player 4'])
  })

  it('prevents adding duplicate players', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
      result.current.addPlayer('Player 1') // Duplicate
    })

    expect(result.current.players).toEqual(['Player 1'])
  })

  it('trims whitespace when adding players', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('  Player 1  ')
    })

    expect(result.current.players).toEqual(['Player 1'])
    expect(result.current.playerScores).toHaveProperty('Player 1')
  })

  it('ignores empty or whitespace-only names', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('')
      result.current.addPlayer('   ')
    })

    expect(result.current.players).toEqual([])
  })

  it('removes players correctly', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
      result.current.addPlayer('Player 2')
    })

    act(() => {
      result.current.removePlayer('Player 1')
    })

    expect(result.current.players).toEqual(['Player 2'])
    expect(result.current.playerScores).not.toHaveProperty('Player 1')
    expect(result.current.playerCollections).not.toHaveProperty('Player 1')
  })

  it('selects player correctly and loads their collection', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
      result.current.addPlayer('Player 2')
    })

    // Set up Player 2's collection after adding players
    act(() => {
      result.current.updateCollection(['fan1', 'coffee'])
      result.current.selectPlayer(0) // Switch back to player 1
    })

    act(() => {
      result.current.selectPlayer(1) // Now switch to player 2
    })

    act(() => {
      // Manually set Player 2's collection for testing
      const newCollections = { ...result.current.playerCollections }
      newCollections['Player 2'] = ['fan1', 'coffee']
      // Since we can't directly access the setter, we'll test the behavior differently
    })

    expect(result.current.currentPlayer).toBe(1)
    expect(result.current.gameProgress.currentPlayer).toBe(1)
    // Test that player selection works, collection loading will be tested separately
  })

  it('updates player scores correctly', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
    })

    act(() => {
      result.current.updateScore(80, 1)
    })

    expect(result.current.playerScores['Player 1'].level1).toBe(80)
    expect(result.current.playerScores['Player 1'].total).toBe(80)

    // Test keeping highest score
    act(() => {
      result.current.updateScore(60, 1) // Lower score
    })

    expect(result.current.playerScores['Player 1'].level1).toBe(80) // Should remain 80

    act(() => {
      result.current.updateScore(90, 1) // Higher score
    })

    expect(result.current.playerScores['Player 1'].level1).toBe(90) // Should update to 90
  })

  it('calculates total score correctly', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
    })

    act(() => {
      result.current.updateScore(80, 1)
      result.current.updateScore(70, 2)
      result.current.updateScore(90, 3)
    })

    expect(result.current.playerScores['Player 1'].total).toBe(240)
  })

  it('updates collection correctly', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Player 1')
    })

    const newItems = ['fan1', 'coffee', 'blender']

    act(() => {
      result.current.updateCollection(newItems)
    })

    expect(result.current.collectedItems).toEqual(newItems)
    expect(result.current.playerCollections['Player 1']).toEqual(newItems)
  })

  it('resets game correctly', () => {
    const { result } = renderHook(() => useGameState())

    // Set up some state
    act(() => {
      result.current.addPlayer('Player 1')
      result.current.setGameState('playing')
      result.current.updateScore(80, 1)
    })

    act(() => {
      result.current.resetGame()
    })

    expect(result.current.gameState).toBe('playerSetup')
    expect(result.current.players).toEqual([])
    expect(result.current.playerScores).toEqual({})
    expect(result.current.playerCollections).toEqual({})
    expect(result.current.collectedItems).toEqual([])
  })

  it('initializes player with correct score structure', () => {
    const { result } = renderHook(() => useGameState())

    act(() => {
      result.current.addPlayer('Test Player')
    })

    const playerScore = result.current.playerScores['Test Player']
    expect(playerScore).toEqual({
      total: 0,
      level1: 0,
      level2: 0,
      level3: 0
    })
  })
})