import { ref, computed, onMounted, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Product } from '../types/interfaces'
import { useProductTypesStore } from '../stores/productTypes'

export const useProductListForm = (products: Ref<Product[]>) => {
  // Store
  const productTypesStore = useProductTypesStore()
  const { productTypes } = storeToRefs(productTypesStore)

  // Filter state
  const searchQuery = ref('')
  const sortBy = ref('alphabetical')
  const selectedCategory = ref('')

  // Search debouncing
  let searchTimeout: number | null = null
  const debouncedSearchQuery = ref('')

  // Computed filtered products
  const filteredProducts = computed(() => {
    if (!products.value) return []
    
    let filtered = [...products.value]

    // Filter by search query
    if (debouncedSearchQuery.value.trim()) {
      const query = debouncedSearchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(product => product.productType === selectedCategory.value)
    }

    // Sort products
    switch (sortBy.value) {
    case 'price-desc':
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
      break
    case 'price-asc':
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
      break
    case 'alphabetical':
    default:
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      break
    }

    return filtered
  })

  // Search methods
  const onSearchInput = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = searchQuery.value
    }, 300) as unknown as number
  }

  const resetFilters = () => {
    searchQuery.value = ''
    debouncedSearchQuery.value = ''
    sortBy.value = 'alphabetical'
    selectedCategory.value = ''
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
  }

  // Initialize
  onMounted(() => {
    productTypesStore.loadProductTypes()
  })

  return {
    // State
    searchQuery,
    sortBy,
    selectedCategory,
    productTypes,
    filteredProducts,
    
    // Methods
    onSearchInput,
    resetFilters,
    loadProductTypes: productTypesStore.loadProductTypes,
  }
}
