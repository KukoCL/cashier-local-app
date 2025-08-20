export function useCurrencyFormatter() {
  /**
   * Formats a number to Chilean Peso (CLP) currency format
   * @param amount - Amount in pesos (integer)
   * @returns Formatted string like "$1.200"
   */
  const formatCLP = (amount: number): string => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '$0'
    }

    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  /**
   * Formats a number with thousand separators (no currency symbol)
   * @param amount - Amount in pesos (integer)
   * @returns Formatted string like "1.200"
   */
  const formatNumber = (amount: number): string => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '0'
    }

    return new Intl.NumberFormat('es-CL').format(amount)
  }

  return {
    formatCLP,
    formatNumber,
  }
}
