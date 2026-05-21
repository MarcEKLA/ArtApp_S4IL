import { describe, it, expect } from 'vitest'
import { oeuvreSchema } from './oeuvre.schema'
 
describe('oeuvreSchema', () => {
 
  it('accepte des données valides', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'Les Nymphéas',
      technique: 'Huile sur toile',
      prix: 100,
      nbTirage: 3,
      artisteId: 1,
      anneeCreation: 1920,  
    })
    expect(result.success).toBe(true)
  })
 
  it('rejette un prix négatif', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'Test',
      technique: 'Aquarelle',
      prix: -10,            
      nbTirage: 5,
      artisteId: 1,
      anneeCreation: 2000,
    })
    expect(result.success).toBe(false)
  })
 
  it('rejette une anneeCreation invalide (< 1000)', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'Test',
      technique: 'Aquarelle',
      prix: 25,
      nbTirage: 10,
      artisteId: 1,
      anneeCreation: 500,   
    })
    expect(result.success).toBe(false)
  })
 
  it('rejette une anneeCreation invalide (> 2100)', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'Test',
      technique: 'Aquarelle',
      prix: 25,
      nbTirage: 10,
      artisteId: 1,
      anneeCreation: 2200,  
    })
    expect(result.success).toBe(false)
  })
 
  it('rejette un titre trop court', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'A',           
      technique: 'Aquarelle',
      prix: 25,
      nbTirage: 10,
      artisteId: 1,
      anneeCreation: 2000,
    })
    expect(result.success).toBe(false)
  })
 
  it('rejette nbTirage = 0', () => {
    const result = oeuvreSchema.safeParse({
      titre: 'Test',
      technique: 'Aquarelle',
      prix: 25,
      nbTirage: 0,          
      artisteId: 1,
      anneeCreation: 2000,
    })
    expect(result.success).toBe(false)
  })
})