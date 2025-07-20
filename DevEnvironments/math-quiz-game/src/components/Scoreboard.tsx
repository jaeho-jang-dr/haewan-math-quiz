import React, { useState, useEffect } from 'react'
import { Trophy, Medal, Star, Users, Target } from 'lucide-react'
import { getGameService, ScoreboardEntry, PlayerStats } from '../services/gameService'

interface ScoreboardProps {
  onBack: () => void
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'rankings' | 'players'>('rankings')
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(undefined)
  const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([])
  const [loading, setLoading] = useState(true)

  const gameService = getGameService()

  useEffect(() => {
    loadScoreboardData()
  }, [selectedLevel])

  const loadScoreboardData = async () => {
    setLoading(true)
    try {
      const rankings = await gameService.getScoreboard(selectedLevel, 50)
      setScoreboard(rankings)

      if (activeTab === 'players') {
        const players = await gameService.getAllPlayers()
        const stats = await Promise.all(
          players.map(player => gameService.getPlayerStats(player.name))
        )
        setPlayerStats(stats.filter(Boolean) as PlayerStats[])
      }
    } catch (error) {
      console.error('Failed to load scoreboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-blue-600">#{rank}</span>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-bold text-gray-800">Scoreboard</h1>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Back to Menu
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'rankings'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Target className="w-5 h-5 inline mr-2" />
              High Scores
            </button>
            <button
              onClick={() => {
                setActiveTab('players')
                loadScoreboardData()
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'players'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Player Stats
            </button>
          </div>

          {/* Level Filter */}
          {activeTab === 'rankings' && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedLevel(undefined)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedLevel === undefined
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Levels
              </button>
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedLevel === level
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Level {level}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading scoreboard data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {activeTab === 'rankings' ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  High Scores {selectedLevel ? `- Level ${selectedLevel}` : ''}
                </h2>
                {scoreboard.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No scores yet!</p>
                    <p className="text-gray-400">Play some games to see rankings appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scoreboard.map((entry, index) => (
                      <div
                        key={`${entry.playerName}-${entry.playedAt}`}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                          index < 3
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {getRankIcon(entry.rank)}
                          <div>
                            <p className="font-semibold text-gray-800">{entry.playerName}</p>
                            <p className="text-sm text-gray-600">
                              Level {entry.level} • {formatDate(entry.playedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{entry.score}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {entry.applianceCount} items
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Player Statistics</h2>
                {playerStats.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No players yet!</p>
                    <p className="text-gray-400">Create players to see their stats here.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {playerStats.map((stats) => (
                      <div
                        key={stats.player.id}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {stats.player.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{stats.player.name}</h3>
                            <p className="text-sm text-gray-600">
                              Joined {formatDate(stats.player.created_at)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Games Played:</span>
                            <span className="font-semibold">{stats.totalGames}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Best Score:</span>
                            <span className="font-semibold text-green-600">{stats.bestScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Average Score:</span>
                            <span className="font-semibold text-blue-600">{stats.averageScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Collection:</span>
                            <span className="font-semibold text-purple-600">
                              {stats.applianceCount} items
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Achievements:</span>
                            <span className="font-semibold text-yellow-600">
                              {stats.achievements.length}
                            </span>
                          </div>
                        </div>

                        {stats.recentSessions.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Recent Games:</p>
                            <div className="space-y-1">
                              {stats.recentSessions.slice(0, 3).map((session) => (
                                <div key={session.id} className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Level {session.level}
                                  </span>
                                  <span className="font-semibold">{session.score}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Scoreboard