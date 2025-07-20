import { Question } from '@/types'

// Generate math questions based on level
export const generateQuestion = (level: number): Question => {
  let num1: number, num2: number, operation: string, answer: number, options: number[]

  if (level === 1) {
    // Level 1: Addition/Subtraction 1-10
    num1 = Math.floor(Math.random() * 10) + 1
    num2 = Math.floor(Math.random() * 10) + 1
    operation = Math.random() > 0.5 ? '+' : '-'
    
    if (operation === '-' && num1 < num2) {
      [num1, num2] = [num2, num1]
    }
    
    answer = operation === '+' ? num1 + num2 : num1 - num2
  } else if (level === 2) {
    // Level 2: Addition/Subtraction 5-20
    num1 = Math.floor(Math.random() * 15) + 5
    num2 = Math.floor(Math.random() * 15) + 5
    operation = Math.random() > 0.5 ? '+' : '-'
    
    if (operation === '-' && num1 < num2) {
      [num1, num2] = [num2, num1]
    }
    
    answer = operation === '+' ? num1 + num2 : num1 - num2
  } else {
    // Level 3: Multiplication 2-9
    num1 = Math.floor(Math.random() * 8) + 2
    num2 = Math.floor(Math.random() * 8) + 2
    operation = '×'
    answer = num1 * num2
  }

  // Generate multiple choice options
  options = [answer]
  while (options.length < 4) {
    let wrongAnswer = answer + Math.floor(Math.random() * 10) - 5
    if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer)
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5)

  return {
    text: `${num1} ${operation} ${num2} = ?`,
    options,
    correctAnswer: answer
  }
}

// Check if player should receive rewards
export const checkRewards = (
  score: number,
  streak: number,
  level: number,
  collectedItems: string[]
): string[] => {
  const newRewards: string[] = []

  // Level completion rewards (score based)
  if (score >= 80) {
    if (level === 1 && !collectedItems.includes('fan1')) {
      newRewards.push('fan1')
    } else if (level === 2 && !collectedItems.includes('fan2')) {
      newRewards.push('fan2')
    } else if (level === 3 && !collectedItems.includes('fan3')) {
      newRewards.push('fan3')
    }
  }

  // Perfect score rewards (100 points = all correct)
  if (score === 100) {
    if (!collectedItems.includes('fan4')) {
      newRewards.push('fan4')
    }
    if (level >= 2 && !collectedItems.includes('coffee')) {
      newRewards.push('coffee')
    }
  }

  // Streak rewards (avoid duplicates)
  if (streak >= 5 && !collectedItems.includes('mini_fan')) {
    newRewards.push('mini_fan')
  }

  // Category mastery rewards
  const fanCount = collectedItems.filter(item => 
    ['fan1', 'fan2', 'fan3', 'fan4', 'mini_fan'].includes(item)
  ).length + newRewards.filter(item => 
    ['fan1', 'fan2', 'fan3', 'fan4', 'mini_fan'].includes(item)
  ).length

  if (fanCount >= 3 && !collectedItems.includes('industrial_fan')) {
    newRewards.push('industrial_fan')
  }

  const kitchenCount = collectedItems.filter(item => 
    ['blender', 'coffee', 'toaster', 'microwave'].includes(item)
  ).length + newRewards.filter(item => 
    ['blender', 'coffee', 'toaster', 'microwave'].includes(item)
  ).length

  if (kitchenCount >= 3 && !collectedItems.includes('rice_cooker')) {
    newRewards.push('rice_cooker')
  }

  // High score bonus (90+ points, 30% chance)
  if (score >= 90 && Math.random() < 0.3) {
    const availableAppliances = [
      'blender', 'toaster', 'vacuum_cleaner', 'heater', 'smart_light'
    ].filter(item => !collectedItems.includes(item) && !newRewards.includes(item))
    
    if (availableAppliances.length > 0) {
      const randomAppliance = availableAppliances[Math.floor(Math.random() * availableAppliances.length)]
      newRewards.push(randomAppliance)
    }
  }

  return newRewards
}

// Calculate grade based on score
export const getGrade = (score: number): string => {
  if (score >= 90) return '🏆'
  if (score >= 70) return '🥇'
  if (score >= 50) return '🥈'
  return '🥉'
}

// Calculate accuracy percentage
export const getAccuracy = (score: number): number => {
  return Math.round((score / 100) * 100)
}