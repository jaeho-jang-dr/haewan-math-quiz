export type GameState = 'playerSetup' | 'menu' | 'playing' | 'result' | 'collection' | 'scoreboard'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type Category = 'fan' | 'kitchen' | 'cooling' | 'cleaning' | 'climate' | 'smart' | 'lifestyle'

export interface Appliance {
  name: string
  icon: string
  image: string
  description: string
  requirement: string
  color: string
  category: Category
  rarity: Rarity
}

export interface Question {
  text: string
  options: number[]
  correctAnswer: number
}

export interface PlayerScore {
  total: number
  level1: number
  level2: number
  level3: number
}

export interface PlayerData {
  name: string
  scores: PlayerScore
  collections: string[]
}

export interface GameProgress {
  currentPlayer: number
  currentQuestion: number
  score: number
  streak: number
  level: number
}

export interface CelebrationParticle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  speed: number
  size: number
  shape: string
}

export interface FireworkParticle {
  id: number
  angle: number
  speed: number
  life: number
}

export interface Firework {
  id: number
  x: number
  y: number
  color: string
  size: number
  particles: FireworkParticle[]
}

export interface AudioContextType {
  createOscillator(): OscillatorNode
  createGain(): GainNode
  destination: AudioDestinationNode
  currentTime: number
  state: AudioContextState
  resume(): Promise<void>
}