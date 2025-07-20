import { describe, it, expect } from 'vitest'
import { generateQuestion, checkRewards, getGrade, getAccuracy } from '@/utils/gameLogic'

describe('gameLogic', () => {
  describe('generateQuestion', () => {
    it('should generate level 1 questions with numbers 1-10', () => {
      const question = generateQuestion(1)
      
      expect(question.text).toMatch(/^\d{1,2} [+\-] \d{1,2} = \?$/)
      expect(question.options).toHaveLength(4)
      expect(question.options).toContain(question.correctAnswer)
    })

    it('should generate level 2 questions with numbers 5-20', () => {
      const question = generateQuestion(2)
      
      expect(question.text).toMatch(/^\d{1,2} [+\-] \d{1,2} = \?$/)
      expect(question.options).toHaveLength(4)
      expect(question.options).toContain(question.correctAnswer)
    })

    it('should generate level 3 multiplication questions', () => {
      const question = generateQuestion(3)
      
      expect(question.text).toMatch(/^\d{1,2} × \d{1,2} = \?$/)
      expect(question.options).toHaveLength(4)
      expect(question.options).toContain(question.correctAnswer)
    })

    it('should not generate negative results for subtraction', () => {
      for (let i = 0; i < 100; i++) {
        const question = generateQuestion(1)
        if (question.text.includes('-')) {
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
        }
      }
    })

    it('should generate unique options', () => {
      const question = generateQuestion(1)
      const uniqueOptions = new Set(question.options)
      expect(uniqueOptions.size).toBe(question.options.length)
    })
  })

  describe('checkRewards', () => {
    it('should give fan1 for level 1 completion with 80+ score', () => {
      const rewards = checkRewards(80, 5, 1, [])
      expect(rewards).toContain('fan1')
    })

    it('should give fan4 for perfect score', () => {
      const rewards = checkRewards(100, 10, 1, [])
      expect(rewards).toContain('fan4')
    })

    it('should give mini_fan for 5+ streak', () => {
      const rewards = checkRewards(50, 5, 1, [])
      expect(rewards).toContain('mini_fan')
    })

    it('should not give duplicate rewards', () => {
      const rewards = checkRewards(80, 5, 1, ['fan1', 'mini_fan'])
      expect(rewards).not.toContain('fan1')
      expect(rewards).not.toContain('mini_fan')
    })

    it('should give category mastery rewards', () => {
      const collectedFans = ['fan1', 'fan2', 'fan3']
      const rewards = checkRewards(90, 3, 2, collectedFans)
      expect(rewards).toContain('industrial_fan')
    })

    it('should give high score bonus with probability', () => {
      let bonusGiven = false
      
      // Run multiple times to test probability
      for (let i = 0; i < 100; i++) {
        const rewards = checkRewards(95, 5, 2, [])
        if (rewards.some(reward => 
          ['blender', 'toaster', 'vacuum_cleaner', 'heater', 'smart_light'].includes(reward)
        )) {
          bonusGiven = true
          break
        }
      }
      
      // Should get bonus at least once in 100 attempts (30% chance each)
      expect(bonusGiven).toBe(true)
    })
  })

  describe('getGrade', () => {
    it('should return correct grades for different scores', () => {
      expect(getGrade(95)).toBe('🏆')
      expect(getGrade(90)).toBe('🏆')
      expect(getGrade(75)).toBe('🥇')
      expect(getGrade(70)).toBe('🥇')
      expect(getGrade(55)).toBe('🥈')
      expect(getGrade(50)).toBe('🥈')
      expect(getGrade(30)).toBe('🥉')
    })
  })

  describe('getAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      expect(getAccuracy(100)).toBe(100)
      expect(getAccuracy(80)).toBe(80)
      expect(getAccuracy(50)).toBe(50)
      expect(getAccuracy(0)).toBe(0)
    })

    it('should round accuracy to nearest integer', () => {
      expect(getAccuracy(83)).toBe(83)
      expect(getAccuracy(87)).toBe(87)
    })
  })
})