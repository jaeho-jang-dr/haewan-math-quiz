import React, { useState, useEffect } from 'react'
import { Package, Lock, Clock, Grid, List } from 'lucide-react'
import { getGameService } from '../services/gameService'
import { PlayerElectronics } from '../database/database'
import { appliances } from '../data/appliances'

interface CollectionProps {
  onBack: () => void
  currentPlayer?: string
}

interface CollectionData {
  unlocked: PlayerElectronics[]
  byCategory: Record<string, PlayerElectronics[]>
  progress: {
    total: number
    unlocked: number
    percentage: number
  }
}

export const Collection: React.FC<CollectionProps> = ({ onBack, currentPlayer }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(currentPlayer || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [collection, setCollection] = useState<CollectionData>({
    unlocked: [],
    byCategory: {},
    progress: { total: 50, unlocked: 0, percentage: 0 }
  })
  const [players, setPlayers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const gameService = getGameService()

  // Get all categories from appliances data
  const categories = ['all', ...new Set(Object.values(appliances).map(a => a.category))]

  useEffect(() => {
    loadPlayers()
  }, [])

  useEffect(() => {
    if (selectedPlayer) {
      loadPlayerCollection()
    }
  }, [selectedPlayer])

  const loadPlayers = async () => {
    try {
      const allPlayers = await gameService.getAllPlayers()
      const playerNames = allPlayers.map(p => p.name)
      setPlayers(playerNames)
      
      if (!selectedPlayer && playerNames.length > 0) {
        setSelectedPlayer(playerNames[0])
      }
    } catch (error) {
      console.error('Failed to load players:', error)
    }
  }

  const loadPlayerCollection = async () => {
    if (!selectedPlayer) return
    
    setLoading(true)
    try {
      const [unlocked, byCategory, progress] = await Promise.all([
        gameService.getPlayerCollection(selectedPlayer),
        gameService.getCollectionByCategory(selectedPlayer),
        gameService.getCollectionProgress(selectedPlayer)
      ])

      setCollection({
        unlocked,
        byCategory,
        progress
      })
    } catch (error) {
      console.error('Failed to load collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const getApplianceInfo = (applianceId: string) => {
    return appliances[applianceId] || {
      name: 'Unknown Appliance',
      category: 'Unknown',
      icon: '❓',
      rarity: 'common' as const
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500'
      case 'epic':
        return 'from-blue-500 to-purple-500'
      case 'rare':
        return 'from-green-500 to-blue-500'
      case 'uncommon':
        return 'from-yellow-500 to-green-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getUnlockReasonDisplay = (reason: string) => {
    switch (reason) {
      case 'perfect_score':
        return { text: 'Perfect Score!', icon: '🎯', color: 'text-yellow-600' }
      case 'excellent_score':
        return { text: 'Excellent Score', icon: '⭐', color: 'text-blue-600' }
      case 'streak_master':
        return { text: 'Streak Master', icon: '🔥', color: 'text-red-600' }
      case 'streak_bonus':
        return { text: 'Streak Bonus', icon: '⚡', color: 'text-orange-600' }
      default:
        if (reason.startsWith('level_')) {
          return { text: 'Level Complete', icon: '🏆', color: 'text-green-600' }
        }
        return { text: 'Unlocked', icon: '🎉', color: 'text-purple-600' }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return collection.unlocked
    }
    return collection.byCategory[selectedCategory] || []
  }

  const getLockedAppliances = () => {
    const unlockedIds = new Set(collection.unlocked.map(item => item.appliance_id))
    return Object.entries(appliances)
      .filter(([id]) => !unlockedIds.has(id))
      .map(([id, appliance]) => ({ id, ...appliance }))
  }

  if (players.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Players Found</h2>
          <p className="text-gray-600 mb-6">Play some games first to see collections!</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl font-bold text-gray-800">Electronics Collection</h1>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Back to Menu
            </button>
          </div>

          {/* Player Selection */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold text-gray-700">Player:</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {players.map(player => (
                <option key={player} value={player}>{player}</option>
              ))}
            </select>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Collection Progress</span>
              <span className="text-lg font-bold text-purple-600">
                {collection.progress.unlocked} / {collection.progress.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${collection.progress.percentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">{collection.progress.percentage}% Complete</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                  {category !== 'all' && collection.byCategory[category] && (
                    <span className="ml-2 text-xs">
                      ({collection.byCategory[category].length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Collection Content */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading collection...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Unlocked Items */}
            {getFilteredItems().length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Unlocked Items ({getFilteredItems().length})
                </h2>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {getFilteredItems().map((item) => {
                      const appliance = getApplianceInfo(item.appliance_id)
                      const unlockInfo = getUnlockReasonDisplay(item.unlock_reason)
                      
                      return (
                        <div
                          key={item.id}
                          className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 relative group"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(appliance.rarity)} opacity-10 rounded-lg`}></div>
                          
                          <div className="relative">
                            <div className="text-4xl mb-2 text-center">{appliance.icon}</div>
                            <h3 className="font-semibold text-gray-800 text-sm text-center mb-1">
                              {appliance.name}
                            </h3>
                            <p className="text-xs text-gray-600 text-center capitalize mb-2">
                              {appliance.category}
                            </p>
                            
                            <div className="text-center">
                              <span className={`text-xs ${unlockInfo.color}`}>
                                {unlockInfo.icon} {unlockInfo.text}
                              </span>
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2">
                              <span className="text-xs text-gray-500">
                                {formatDate(item.unlocked_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getFilteredItems().map((item) => {
                      const appliance = getApplianceInfo(item.appliance_id)
                      const unlockInfo = getUnlockReasonDisplay(item.unlock_reason)
                      
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-3xl">{appliance.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{appliance.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{appliance.category}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm ${unlockInfo.color} mb-1`}>
                              {unlockInfo.icon} {unlockInfo.text}
                            </div>
                            <div className="text-xs text-gray-500">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatDate(item.unlocked_at)}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Locked Items Preview */}
            {selectedCategory === 'all' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Still to Unlock ({getLockedAppliances().length})
                </h2>
                
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {getLockedAppliances().slice(0, 24).map((appliance) => (
                    <div
                      key={appliance.id}
                      className="bg-gray-100 border-2 border-gray-200 rounded-lg p-3 text-center opacity-60 hover:opacity-80 transition-opacity"
                    >
                      <div className="relative">
                        <div className="text-2xl mb-1 filter grayscale">{appliance.icon}</div>
                        <Lock className="w-4 h-4 text-gray-400 absolute top-0 right-0" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium truncate">
                        {appliance.name}
                      </p>
                    </div>
                  ))}
                  {getLockedAppliances().length > 24 && (
                    <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-3 text-center opacity-60 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg text-gray-400 mb-1">+{getLockedAppliances().length - 24}</div>
                        <p className="text-xs text-gray-600">more</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {getFilteredItems().length === 0 && selectedCategory !== 'all' && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No {selectedCategory} items yet!
                </h2>
                <p className="text-gray-600">
                  Play more games to unlock items in this category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection