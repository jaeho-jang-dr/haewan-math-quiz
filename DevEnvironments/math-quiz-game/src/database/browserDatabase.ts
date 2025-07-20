// Browser-compatible database using localStorage
import { Player, GameSession, PlayerElectronics, Achievement, DailyStats } from './database'

class BrowserDatabase {
  private getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      // Check if localStorage is available (Safari private mode issue)
      if (typeof Storage === 'undefined' || !window.localStorage) {
        console.warn('localStorage not available, using memory storage')
        return defaultValue
      }
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
      return defaultValue
    }
  }

  private saveToStorage<T>(key: string, value: T): void {
    try {
      // Check if localStorage is available (Safari private mode issue)
      if (typeof Storage === 'undefined' || !window.localStorage) {
        console.warn('localStorage not available, cannot save data')
        return
      }
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage (may be in private mode):', error)
    }
  }

  private generateId(): number {
    return Date.now() + Math.random()
  }

  // Player operations
  createPlayer(name: string): Player {
    const players = this.getAllPlayers()
    const existingPlayer = players.find(p => p.name === name)
    if (existingPlayer) {
      throw new Error('Player already exists')
    }

    const newPlayer: Player = {
      id: this.generateId(),
      name,
      created_at: new Date().toISOString(),
      last_played: new Date().toISOString(),
      total_games: 0,
      total_score: 0
    }

    players.push(newPlayer)
    this.saveToStorage('players', players)
    return newPlayer
  }

  getPlayer(id: number): Player | undefined {
    const players = this.getAllPlayers()
    return players.find(p => p.id === id)
  }

  getPlayerByName(name: string): Player | undefined {
    const players = this.getAllPlayers()
    return players.find(p => p.name === name)
  }

  getAllPlayers(): Player[] {
    return this.getFromStorage('players', [])
  }

  updatePlayerStats(playerId: number): void {
    const players = this.getAllPlayers()
    const sessions = this.getPlayerSessions(playerId, 1000)
    
    const playerIndex = players.findIndex(p => p.id === playerId)
    if (playerIndex !== -1) {
      players[playerIndex].total_games = sessions.length
      players[playerIndex].total_score = sessions.reduce((sum, s) => sum + s.score, 0)
      players[playerIndex].last_played = new Date().toISOString()
      this.saveToStorage('players', players)
    }
  }

  // Game session operations
  createGameSession(session: Omit<GameSession, 'id' | 'played_at'>): GameSession {
    const sessions = this.getFromStorage<GameSession[]>('game_sessions', [])
    
    const newSession: GameSession = {
      ...session,
      id: this.generateId(),
      played_at: new Date().toISOString()
    }

    sessions.push(newSession)
    this.saveToStorage('game_sessions', sessions)
    
    // Update player stats
    this.updatePlayerStats(session.player_id)
    
    return newSession
  }

  getGameSession(id: number): GameSession | undefined {
    const sessions = this.getFromStorage<GameSession[]>('game_sessions', [])
    return sessions.find(s => s.id === id)
  }

  getPlayerSessions(playerId: number, limit: number = 50): GameSession[] {
    const sessions = this.getFromStorage<GameSession[]>('game_sessions', [])
    return sessions
      .filter(s => s.player_id === playerId)
      .sort((a, b) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
      .slice(0, limit)
  }

  getTopScores(level?: number, limit: number = 10): (GameSession & { player_name: string })[] {
    const sessions = this.getFromStorage<GameSession[]>('game_sessions', [])
    const players = this.getAllPlayers()
    
    let filteredSessions = sessions
    if (level) {
      filteredSessions = sessions.filter(s => s.level === level)
    }

    return filteredSessions
      .map(session => {
        const player = players.find(p => p.id === session.player_id)
        return {
          ...session,
          player_name: player?.name || 'Unknown'
        }
      })
      .sort((a, b) => b.score - a.score || new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
      .slice(0, limit)
  }

  // Electronics collection operations
  unlockAppliance(playerId: number, applianceId: string, reason: string): PlayerElectronics | null {
    const collection = this.getFromStorage<PlayerElectronics[]>('player_electronics', [])
    
    // Check if already unlocked
    const existing = collection.find(item => item.player_id === playerId && item.appliance_id === applianceId)
    if (existing) {
      return null
    }

    const newItem: PlayerElectronics = {
      id: this.generateId(),
      player_id: playerId,
      appliance_id: applianceId,
      unlocked_at: new Date().toISOString(),
      unlock_reason: reason
    }

    collection.push(newItem)
    this.saveToStorage('player_electronics', collection)
    return newItem
  }

  getPlayerElectronics(id: number): PlayerElectronics | undefined {
    const collection = this.getFromStorage<PlayerElectronics[]>('player_electronics', [])
    return collection.find(item => item.id === id)
  }

  getPlayerCollection(playerId: number): PlayerElectronics[] {
    const collection = this.getFromStorage<PlayerElectronics[]>('player_electronics', [])
    return collection
      .filter(item => item.player_id === playerId)
      .sort((a, b) => new Date(b.unlocked_at).getTime() - new Date(a.unlocked_at).getTime())
  }

  getCollectionProgress(playerId: number): { total: number; unlocked: number; percentage: number } {
    const collection = this.getPlayerCollection(playerId)
    const unlocked = collection.length
    const total = 50 // Based on our appliances data
    
    return {
      total,
      unlocked,
      percentage: Math.round((unlocked / total) * 100)
    }
  }

  getMostCollectedAppliances(limit: number = 10): { appliance_id: string; count: number }[] {
    const collection = this.getFromStorage<PlayerElectronics[]>('player_electronics', [])
    const counts = new Map<string, number>()
    
    for (const item of collection) {
      counts.set(item.appliance_id, (counts.get(item.appliance_id) || 0) + 1)
    }
    
    return Array.from(counts.entries())
      .map(([appliance_id, count]) => ({ appliance_id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  // Achievement operations
  earnAchievement(playerId: number, type: string, level: number = 1): Achievement | null {
    const achievements = this.getFromStorage<Achievement[]>('achievements', [])
    
    // Check if already earned
    const existing = achievements.find(a => 
      a.player_id === playerId && 
      a.achievement_type === type && 
      a.achievement_level === level
    )
    if (existing) {
      return null
    }

    const newAchievement: Achievement = {
      id: this.generateId(),
      player_id: playerId,
      achievement_type: type,
      achievement_level: level,
      earned_at: new Date().toISOString()
    }

    achievements.push(newAchievement)
    this.saveToStorage('achievements', achievements)
    return newAchievement
  }

  getAchievement(id: number): Achievement | undefined {
    const achievements = this.getFromStorage<Achievement[]>('achievements', [])
    return achievements.find(a => a.id === id)
  }

  getPlayerAchievements(playerId: number): Achievement[] {
    const achievements = this.getFromStorage<Achievement[]>('achievements', [])
    return achievements
      .filter(a => a.player_id === playerId)
      .sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime())
  }

  // Statistics operations
  updateDailyStats(): void {
    const today = new Date().toISOString().split('T')[0]
    const dailyStats = this.getFromStorage<DailyStats[]>('daily_stats', [])
    const sessions = this.getFromStorage<GameSession[]>('game_sessions', [])
    const electronics = this.getFromStorage<PlayerElectronics[]>('player_electronics', [])
    
    const todaySessions = sessions.filter(s => s.played_at.startsWith(today))
    const todayElectronics = electronics.filter(e => e.unlocked_at.startsWith(today))
    
    const uniquePlayers = new Set(todaySessions.map(s => s.player_id)).size
    const avgScore = todaySessions.length > 0 
      ? todaySessions.reduce((sum, s) => sum + s.score, 0) / todaySessions.length 
      : 0
    
    // Find most collected appliance today
    const applianceCounts = new Map<string, number>()
    for (const item of todayElectronics) {
      applianceCounts.set(item.appliance_id, (applianceCounts.get(item.appliance_id) || 0) + 1)
    }
    const mostCollected = Array.from(applianceCounts.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0]

    const existingIndex = dailyStats.findIndex(stat => stat.date === today)
    const newStat: DailyStats = {
      id: this.generateId(),
      date: today,
      total_games: todaySessions.length,
      total_players: uniquePlayers,
      avg_score: avgScore,
      most_collected_appliance: mostCollected
    }

    if (existingIndex !== -1) {
      dailyStats[existingIndex] = newStat
    } else {
      dailyStats.push(newStat)
    }

    this.saveToStorage('daily_stats', dailyStats)
  }

  getDailyStats(days: number = 7): DailyStats[] {
    const dailyStats = this.getFromStorage<DailyStats[]>('daily_stats', [])
    return dailyStats
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, days)
  }

  // Utility methods
  close(): void {
    // No-op for browser storage
  }

  backup(_backupPath: string): void {
    // Could implement export to JSON file
    console.log('Backup not implemented for browser storage')
  }
}

// Singleton instance
let dbInstance: BrowserDatabase | null = null

export const getBrowserDatabase = (): BrowserDatabase => {
  if (!dbInstance) {
    dbInstance = new BrowserDatabase()
  }
  return dbInstance
}

export default BrowserDatabase