import { describe, it, expect } from 'vitest'
import { useUnitTypeMapper } from '../../composables/useUnitTypeMapper'

describe('useUnitTypeMapper', () => {
  it('should map unit types to Spanish with correct pluralization', () => {
    const { mapUnitTypeToSpanish } = useUnitTypeMapper()
    
    // Test singular
    expect(mapUnitTypeToSpanish('Unit', 1)).toBe('Unidad')
    expect(mapUnitTypeToSpanish('Box', 1)).toBe('Caja')
    
    // Test plural
    expect(mapUnitTypeToSpanish('Unit', 5)).toBe('Unidades')
    expect(mapUnitTypeToSpanish('Box', 10)).toBe('Cajas')
    
    // Test null/undefined
    expect(mapUnitTypeToSpanish(null, 1)).toBe('Unidad')
    expect(mapUnitTypeToSpanish(null, 5)).toBe('Unidades')
  })

  it('should return Spanish unit types list', () => {
    const { getSpanishUnitTypes } = useUnitTypeMapper()
    
    const unitTypes = getSpanishUnitTypes()
    expect(unitTypes).toContain('Unidades')
    expect(unitTypes).toContain('Cajas')
    expect(unitTypes.length).toBeGreaterThan(0)
  })

  it('should create reactive Spanish unit type', () => {
    const { createSpanishUnitType } = useUnitTypeMapper()
    
    const spanishUnitType = createSpanishUnitType('Unit', 1)
    expect(spanishUnitType.value).toBe('Unidad')
  })
})
