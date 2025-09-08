import { computed } from 'vue'

// Unit type mappings from English to Spanish (singular and plural)
const UNIT_TYPE_MAPPINGS: Record<string, { singular: string; plural: string }> = {
  // English to Spanish mappings
  'Unit': { singular: 'Unidad', plural: 'Unidades' },
  'Box': { singular: 'Caja', plural: 'Cajas' },
  'Grams': { singular: 'Gramo', plural: 'Gramos' },
  'Kg': { singular: 'Kilogramo', plural: 'Kilogramos' },
  'Liters': { singular: 'Litro', plural: 'Litros' },
  'Pieces': { singular: 'Pieza', plural: 'Piezas' },
  'Meters': { singular: 'Metro', plural: 'Metros' },
  
  // Already Spanish values (pass through)
  'Unidad': { singular: 'Unidad', plural: 'Unidades' },
  'Caja': { singular: 'Caja', plural: 'Cajas' },
  'Gramo': { singular: 'Gramo', plural: 'Gramos' },
  'Gramos': { singular: 'Gramo', plural: 'Gramos' },
  'Kilogramo': { singular: 'Kilogramo', plural: 'Kilogramos' },
  'Kilogramos': { singular: 'Kilogramo', plural: 'Kilogramos' },
  'Litro': { singular: 'Litro', plural: 'Litros' },
  'Litros': { singular: 'Litro', plural: 'Litros' },
  'Pieza': { singular: 'Pieza', plural: 'Piezas' },
  'Piezas': { singular: 'Pieza', plural: 'Piezas' },
  'Metro': { singular: 'Metro', plural: 'Metros' },
  'Metros': { singular: 'Metro', plural: 'Metros' },
}

export function useUnitTypeMapper() {
  /**
   * Maps a unit type to its Spanish equivalent with proper pluralization
   * @param unitType - The unit type to map
   * @param amount - The amount to determine if singular or plural should be used
   * @returns The Spanish translation of the unit type with proper pluralization
   */
  const mapUnitTypeToSpanish = (unitType: string | null | undefined, amount: number = 1): string => {
    if (!unitType) {
      return amount === 1 ? 'Unidad' : 'Unidades' // Default fallback
    }
    
    const mapping = UNIT_TYPE_MAPPINGS[unitType]
    if (mapping) {
      return amount === 1 ? mapping.singular : mapping.plural
    }
    
    // If no mapping exists, return the original value
    return unitType
  }

  /**
   * Creates a computed property that maps a unit type to Spanish with pluralization
   * @param unitType - Reactive reference to the unit type
   * @param amount - Reactive reference to the amount
   * @returns Computed property with the Spanish unit type
   */
  const createSpanishUnitType = (unitType: string | null | undefined, amount: number = 1) => {
    return computed(() => mapUnitTypeToSpanish(unitType, amount))
  }

  /**
   * Gets all available unit types in Spanish (plural form)
   * @returns Array of Spanish unit types
   */
  const getSpanishUnitTypes = (): string[] => {
    return [
      'Unidades',
      'Cajas', 
      'Gramos',
      'Kilogramos',
      'Litros',
      'Piezas',
      'Metros',
    ]
  }

  return {
    mapUnitTypeToSpanish,
    createSpanishUnitType,
    getSpanishUnitTypes,
  }
}
