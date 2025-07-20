import { getDatabase, Player, GameSession, PlayerElectronics, Achievement } from '@/database/database'
import { checkRewards } from '@/utils/gameLogic'
import { appliances } from '@/data/appliances'

export interface GameResult {
  session: GameSession
  newAppliances: PlayerElectronics[]
  newAchievements: Achievement[]
}

export interface ScoreboardEntry {
  rank: number
  playerName: string
  score: number
  level: number
  playedAt: string
  applianceCount: number
}

export interface PlayerStats {
  player: Player
  totalGames: number
  bestScore: number
  averageScore: number
  applianceCount: number
  achievements: Achievement[]
  recentSessions: GameSession[]
}

class GameService {
  private db = getDatabase()

  // Player management
  async createOrGetPlayer(name: string): Promise<Player> {
    let player = this.db.getPlayerByName(name)
    if (!player) {
      player = this.db.createPlayer(name)
      
      // Award welcome achievement
      this.db.earnAchievement(player.id, 'first_player', 1)
    }
    return player
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.db.getAllPlayers()
  }

  // Game session management
  async saveGameResult(
    playerName: string, 
    level: number, 
    score: number, 
    questionsCorrect: number, 
    maxStreak: number,
    completionTime?: number
  ): Promise<GameResult> {
    const player = await this.createOrGetPlayer(playerName)
    
    // Create game session
    const session = this.db.createGameSession({
      player_id: player.id,
      level,
      score,
      questions_correct: questionsCorrect,
      questions_total: 10,
      max_streak: maxStreak,
      completion_time: completionTime
    })

    // Get current collection
    const currentCollection = this.db.getPlayerCollection(player.id)
    const currentApplianceIds = currentCollection.map(item => item.appliance_id)

    // Check for new appliances
    const rewardIds = checkRewards(score, maxStreak, level, currentApplianceIds)
    const newAppliances: PlayerElectronics[] = []

    for (const applianceId of rewardIds) {
      const unlocked = this.db.unlockAppliance(player.id, applianceId, this.getUnlockReason(score, maxStreak, level))
      if (unlocked) {
        newAppliances.push(unlocked)
      }
    }

    // Check for achievements
    const newAchievements = await this.checkAndAwardAchievements(player.id, session, newAppliances)

    // Update daily stats
    this.db.updateDailyStats()

    return {
      session,
      newAppliances,
      newAchievements
    }
  }

  private getUnlockReason(score: number, streak: number, level: number): string {
    if (score === 100) return 'perfect_score'
    if (score >= 90) return 'excellent_score'
    if (streak >= 8) return 'streak_master'
    if (streak >= 5) return 'streak_bonus'
    return `level_${level}_completion`
  }

  // Scoreboard
  async getScoreboard(level?: number, limit: number = 50): Promise<ScoreboardEntry[]> {
    const topScores = this.db.getTopScores(level, limit)
    
    const entries: ScoreboardEntry[] = []
    let currentRank = 1
    let lastScore = -1

    for (let i = 0; i < topScores.length; i++) {
      const entry = topScores[i]
      
      // Handle ties
      if (entry.score !== lastScore) {
        currentRank = i + 1
      }
      lastScore = entry.score

      // Get appliance count for this player
      const collection = this.db.getPlayerCollection(entry.player_id)
      
      entries.push({
        rank: currentRank,
        playerName: entry.player_name,
        score: entry.score,
        level: entry.level,
        playedAt: entry.played_at,
        applianceCount: collection.length
      })
    }

    return entries
  }

  async getPlayerStats(playerName: string): Promise<PlayerStats | null> {
    const player = this.db.getPlayerByName(playerName)
    if (!player) return null

    const sessions = this.db.getPlayerSessions(player.id, 10)
    const collection = this.db.getPlayerCollection(player.id)
    const achievements = this.db.getPlayerAchievements(player.id)

    const scores = sessions.map(s => s.score)
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

    return {
      player,
      totalGames: sessions.length,
      bestScore,
      averageScore,
      applianceCount: collection.length,
      achievements,
      recentSessions: sessions.slice(0, 5)
    }
  }

  // Electronics collection
  async getPlayerCollection(playerName: string): Promise<PlayerElectronics[]> {
    const player = this.db.getPlayerByName(playerName)
    if (!player) return []
    
    return this.db.getPlayerCollection(player.id)
  }

  async getCollectionProgress(playerName: string): Promise<{ total: number; unlocked: number; percentage: number }> {
    const player = this.db.getPlayerByName(playerName)
    if (!player) return { total: 50, unlocked: 0, percentage: 0 }
    
    return this.db.getCollectionProgress(player.id)
  }

  async getCollectionByCategory(playerName: string): Promise<Record<string, PlayerElectronics[]>> {
    const collection = await this.getPlayerCollection(playerName)
    const categoryMap: Record<string, PlayerElectronics[]> = {}

    for (const item of collection) {
      const appliance = appliances[item.appliance_id]
      if (appliance) {
        if (!categoryMap[appliance.category]) {
          categoryMap[appliance.category] = []
        }
        categoryMap[appliance.category].push(item)
      }
    }

    return categoryMap
  }

  async getMostPopularAppliances(limit: number = 10): Promise<Array<{ applianceId: string; name: string; count: number }>> {
    const popular = this.db.getMostCollectedAppliances(limit)
    
    return popular.map(item => ({
      applianceId: item.appliance_id,
      name: appliances[item.appliance_id]?.name || 'Unknown Appliance',
      count: item.count
    }))
  }

  // Achievements
  private async checkAndAwardAchievements(playerId: number, session: GameSession, _newAppliances: PlayerElectronics[]): Promise<Achievement[]> {
    const achievements: Achievement[] = []
    
    // Score-based achievements
    if (session.score === 100) {
      const perfect = this.db.earnAchievement(playerId, 'perfect_score', session.level)
      if (perfect) achievements.push(perfect)
    }
    
    if (session.score >= 90) {
      const excellent = this.db.earnAchievement(playerId, 'excellent_score', session.level)
      if (excellent) achievements.push(excellent)
    }

    // Streak achievements
    if (session.max_streak >= 10) {
      const streakMaster = this.db.earnAchievement(playerId, 'streak_master', Math.floor(session.max_streak / 5))
      if (streakMaster) achievements.push(streakMaster)
    }

    // Level completion achievements
    const levelComplete = this.db.earnAchievement(playerId, 'level_complete', session.level)
    if (levelComplete) achievements.push(levelComplete)

    // Collection achievements
    const collectionProgress = this.db.getCollectionProgress(playerId)
    if (collectionProgress.unlocked >= 10) {
      const collector = this.db.earnAchievement(playerId, 'collector', Math.floor(collectionProgress.unlocked / 10))
      if (collector) achievements.push(collector)
    }

    // Category master achievements
    const collection = this.db.getPlayerCollection(playerId)
    const categoryCount: Record<string, number> = {}
    
    for (const item of collection) {
      const appliance = appliances[item.appliance_id]
      if (appliance) {
        categoryCount[appliance.category] = (categoryCount[appliance.category] || 0) + 1
      }
    }

    for (const [category, count] of Object.entries(categoryCount)) {
      if (count >= 5) {
        const categoryMaster = this.db.earnAchievement(playerId, `${category}_master`, Math.floor(count / 5))
        if (categoryMaster) achievements.push(categoryMaster)
      }
    }

    // Gaming achievements
    const playerStats = this.db.getPlayer(playerId)
    if (playerStats) {
      if (playerStats.total_games >= 10) {
        const veteran = this.db.earnAchievement(playerId, 'veteran_player', Math.floor(playerStats.total_games / 10))
        if (veteran) achievements.push(veteran)
      }
    }

    return achievements
  }

  // Statistics
  async getDailyStats(days: number = 7) {
    return this.db.getDailyStats(days)
  }

  async getGlobalStats(): Promise<{
    totalPlayers: number
    totalGames: number
    totalAppliances: number
    averageScore: number
    mostPopularAppliance: string
  }> {
    const players = this.db.getAllPlayers()
    const totalPlayers = players.length
    const totalGames = players.reduce((sum, p) => sum + p.total_games, 0)
    const averageScore = totalGames > 0 
      ? Math.round(players.reduce((sum, p) => sum + p.total_score, 0) / totalGames) 
      : 0

    const totalAppliances = this.db.getPlayerCollection(0).length // This will need adjustment
    const popularAppliances = await this.getMostPopularAppliances(1)
    const mostPopularAppliance = popularAppliances[0]?.name || 'None'

    return {
      totalPlayers,
      totalGames,
      totalAppliances,
      averageScore,
      mostPopularAppliance
    }
  }

  // Utility
  async resetPlayerData(playerName: string): Promise<boolean> {
    const player = this.db.getPlayerByName(playerName)
    if (!player) return false

    // This would require implementing delete operations in the database class
    // For now, we'll return false to indicate it's not implemented
    return false
  }

  async exportPlayerData(playerName: string): Promise<any> {
    const player = this.db.getPlayerByName(playerName)
    if (!player) return null

    const sessions = this.db.getPlayerSessions(player.id, 1000)
    const collection = this.db.getPlayerCollection(player.id)
    const achievements = this.db.getPlayerAchievements(player.id)

    return {
      player,
      sessions,
      collection,
      achievements,
      exportedAt: new Date().toISOString()
    }
  }
}

// Singleton instance
let serviceInstance: GameService | null = null

export const getGameService = (): GameService => {
  if (!serviceInstance) {
    serviceInstance = new GameService()
  }
  return serviceInstance
}

export default GameService