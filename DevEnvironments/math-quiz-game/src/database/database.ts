// Import browser database for web compatibility
import { getBrowserDatabase } from './browserDatabase'

export interface Player {
  id: number
  name: string
  created_at: string
  last_played: string
  total_games: number
  total_score: number
}

export interface GameSession {
  id: number
  player_id: number
  level: number
  score: number
  questions_correct: number
  questions_total: number
  max_streak: number
  completion_time?: number
  played_at: string
}

export interface PlayerElectronics {
  id: number
  player_id: number
  appliance_id: string
  unlocked_at: string
  unlock_reason: string
}

export interface Achievement {
  id: number
  player_id: number
  achievement_type: string
  achievement_level: number
  earned_at: string
}

export interface DailyStats {
  id: number
  date: string
  total_games: number
  total_players: number
  avg_score: number
  most_collected_appliance?: string
}

class GameDatabase {
  private db = getBrowserDatabase()

  constructor(_dbPath?: string) {
    // Browser database doesn't need initialization
  }

  // Player operations
  createPlayer(name: string): Player {
    return this.db.createPlayer(name)
  }

  getPlayer(id: number): Player | undefined {
    return this.db.getPlayer(id)
  }

  getPlayerByName(name: string): Player | undefined {
    return this.db.getPlayerByName(name)
  }

  getAllPlayers(): Player[] {
    return this.db.getAllPlayers()
  }

  updatePlayerStats(playerId: number): void {
    this.db.updatePlayerStats(playerId)
  }

  // Game session operations
  createGameSession(session: Omit<GameSession, 'id' | 'played_at'>): GameSession {
    return this.db.createGameSession(session)
  }

  getGameSession(id: number): GameSession | undefined {
    return this.db.getGameSession(id)
  }

  getPlayerSessions(playerId: number, limit: number = 50): GameSession[] {
    return this.db.getPlayerSessions(playerId, limit)
  }

  getTopScores(level?: number, limit: number = 10): (GameSession & { player_name: string })[] {
    return this.db.getTopScores(level, limit)
  }

  // Electronics collection operations
  unlockAppliance(playerId: number, applianceId: string, reason: string): PlayerElectronics | null {
    return this.db.unlockAppliance(playerId, applianceId, reason)
  }

  getPlayerElectronics(id: number): PlayerElectronics | undefined {
    return this.db.getPlayerElectronics(id)
  }

  getPlayerCollection(playerId: number): PlayerElectronics[] {
    return this.db.getPlayerCollection(playerId)
  }

  getCollectionProgress(playerId: number): { total: number; unlocked: number; percentage: number } {
    return this.db.getCollectionProgress(playerId)
  }

  getMostCollectedAppliances(limit: number = 10): { appliance_id: string; count: number }[] {
    return this.db.getMostCollectedAppliances(limit)
  }

  // Achievement operations
  earnAchievement(playerId: number, type: string, level: number = 1): Achievement | null {
    return this.db.earnAchievement(playerId, type, level)
  }

  getAchievement(id: number): Achievement | undefined {
    return this.db.getAchievement(id)
  }

  getPlayerAchievements(playerId: number): Achievement[] {
    return this.db.getPlayerAchievements(playerId)
  }

  // Statistics operations
  updateDailyStats(): void {
    this.db.updateDailyStats()
  }

  getDailyStats(days: number = 7): DailyStats[] {
    return this.db.getDailyStats(days)
  }

  // Utility methods
  close(): void {
    this.db.close()
  }

  backup(backupPath: string): void {
    this.db.backup(backupPath)
  }
}

// Singleton instance
let dbInstance: GameDatabase | null = null

export const getDatabase = (): GameDatabase => {
  if (!dbInstance) {
    dbInstance = new GameDatabase()
  }
  return dbInstance
}

export default GameDatabase