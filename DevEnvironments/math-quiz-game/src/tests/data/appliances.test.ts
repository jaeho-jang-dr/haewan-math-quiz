import { describe, it, expect } from 'vitest'
import { appliances } from '@/data/appliances'

describe('appliances data', () => {
  it('contains all required appliance categories', () => {
    const categories = new Set(Object.values(appliances).map(a => a.category))
    
    expect(categories).toContain('fan')
    expect(categories).toContain('kitchen')
    expect(categories).toContain('cooling')
    expect(categories).toContain('cleaning')
    expect(categories).toContain('climate')
    expect(categories).toContain('smart')
    expect(categories).toContain('lifestyle')
  })

  it('has all required properties for each appliance', () => {
    Object.entries(appliances).forEach(([, appliance]) => {
      expect(appliance).toHaveProperty('name')
      expect(appliance).toHaveProperty('icon')
      expect(appliance).toHaveProperty('image')
      expect(appliance).toHaveProperty('description')
      expect(appliance).toHaveProperty('requirement')
      expect(appliance).toHaveProperty('color')
      expect(appliance).toHaveProperty('category')
      expect(appliance).toHaveProperty('rarity')

      expect(typeof appliance.name).toBe('string')
      expect(typeof appliance.icon).toBe('string')
      expect(typeof appliance.image).toBe('string')
      expect(typeof appliance.description).toBe('string')
      expect(typeof appliance.requirement).toBe('string')
      expect(typeof appliance.color).toBe('string')
      expect(typeof appliance.category).toBe('string')
      expect(typeof appliance.rarity).toBe('string')
    })
  })

  it('has valid rarity values', () => {
    const validRarities = ['common', 'rare', 'epic', 'legendary']
    
    Object.values(appliances).forEach(appliance => {
      expect(validRarities).toContain(appliance.rarity)
    })
  })

  it('has valid color gradient classes', () => {
    Object.values(appliances).forEach(appliance => {
      expect(appliance.color).toMatch(/^from-\w+-\d+\s+to-\w+-\d+$/)
    })
  })

  it('contains expected fan series appliances', () => {
    const fanAppliances = Object.keys(appliances).filter(key => 
      appliances[key].category === 'fan'
    )

    expect(fanAppliances).toContain('fan1')
    expect(fanAppliances).toContain('fan2')
    expect(fanAppliances).toContain('fan3')
    expect(fanAppliances).toContain('fan4')
    expect(fanAppliances).toContain('mini_fan')
    expect(fanAppliances).toContain('industrial_fan')
  })

  it('contains expected kitchen appliances', () => {
    const kitchenAppliances = Object.keys(appliances).filter(key => 
      appliances[key].category === 'kitchen'
    )

    expect(kitchenAppliances).toContain('blender')
    expect(kitchenAppliances).toContain('coffee')
    expect(kitchenAppliances).toContain('toaster')
    expect(kitchenAppliances).toContain('microwave')
    expect(kitchenAppliances).toContain('rice_cooker')
  })

  it('has meaningful descriptions', () => {
    Object.values(appliances).forEach(appliance => {
      expect(appliance.description.length).toBeGreaterThan(5)
      expect(appliance.name.length).toBeGreaterThan(2)
    })
  })

  it('has unique names', () => {
    const names = Object.values(appliances).map(a => a.name)
    const uniqueNames = new Set(names)
    
    expect(uniqueNames.size).toBe(names.length)
  })

  it('has appropriate icons and images', () => {
    Object.values(appliances).forEach(appliance => {
      // Icons and images should be emoji characters (length 1-2 typically)
      expect(appliance.icon.length).toBeGreaterThan(0)
      expect(appliance.icon.length).toBeLessThan(5)
      expect(appliance.image.length).toBeGreaterThan(0)
      expect(appliance.image.length).toBeLessThan(5)
    })
  })

  it('contains expected number of appliances per category', () => {
    const categoryCounts = Object.values(appliances).reduce((acc, appliance) => {
      acc[appliance.category] = (acc[appliance.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Verify we have substantial collections in each category
    expect(categoryCounts.fan).toBeGreaterThanOrEqual(6)
    expect(categoryCounts.kitchen).toBeGreaterThanOrEqual(8)
    expect(categoryCounts.cooling).toBeGreaterThanOrEqual(5)
    expect(categoryCounts.cleaning).toBeGreaterThanOrEqual(6)
    expect(categoryCounts.climate).toBeGreaterThanOrEqual(4)
    expect(categoryCounts.smart).toBeGreaterThanOrEqual(4)
    expect(categoryCounts.lifestyle).toBeGreaterThanOrEqual(3)
  })

  it('has appropriate rarity distribution', () => {
    const rarities = Object.values(appliances).map(a => a.rarity)
    const rarityCounts = rarities.reduce((acc, rarity) => {
      acc[rarity] = (acc[rarity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Should have more common items than rare/epic
    expect(rarityCounts.common).toBeGreaterThan(rarityCounts.rare || 0)
    expect(rarityCounts.common).toBeGreaterThan(rarityCounts.epic || 0)
  })
})