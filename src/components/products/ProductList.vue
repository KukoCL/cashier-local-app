<template>
  <div>
    <!-- Search and Filters Row -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="d-flex flex-column h-100">
          <label class="form-label">&nbsp;</label>
          <div class="input-group">
            <span class="input-group-text">🔍</span>
            <input
              type="text"
              class="form-control"
              placeholder="Búsqueda"
              v-model="searchQuery"
              @input="onSearchInput"
            />
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <label class="form-label">Ordenar por</label>
        <select class="form-select" v-model="sortBy">
          <option value="alphabetical">Orden alfabético</option>
          <option value="price-desc">Mayor a menor precio</option>
          <option value="price-asc">Menor a mayor precio</option>
        </select>
      </div>
      
      <div class="col-md-3">
        <label class="form-label">Categoría</label>
        <select class="form-select" v-model="selectedCategory">
          <option value="">Todas</option>
          <option v-for="category in productTypes" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info" role="alert">
      No hay productos que coincidan con los filtros aplicados
    </div>

    <div v-else class="row g-3">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in filteredProducts" :key="product.id">
        <ProductCard
          :product="product"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :is-open="showDeleteDialog"
      title="Eliminar Producto"
      :message="`¿Está seguro de que desea eliminar el producto '${productToDelete?.name}'?`"
      details="Esta acción no se puede deshacer."
      confirm-text="Eliminar"
      cancel-text="Cancelar"
      variant="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import ProductCard from './ProductCard.vue'
import ConfirmationDialog from '../ConfirmationDialog.vue'
import type { Product } from '../../types/interfaces'
import { useProductList } from '../../composables/useProductList'

interface Props {
  products: Product[]
}

interface Emits {
  edit: [product: Product]
  delete: [product: Product]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Use the product list composable
const {
  searchQuery,
  sortBy,
  selectedCategory,
  productTypes,
  filteredProducts,
  onSearchInput,
} = useProductList(toRef(props, 'products'))

// Delete dialog state
const showDeleteDialog = ref(false)
const productToDelete = ref<Product | null>(null)
const deleteLoading = ref(false)

const handleEdit = (product: Product) => {
  emit('edit', product)
}

const handleDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!productToDelete.value) return
  
  deleteLoading.value = true
  try {
    emit('delete', productToDelete.value)
    showDeleteDialog.value = false
    productToDelete.value = null
  } finally {
    deleteLoading.value = false
  }
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  productToDelete.value = null
}
</script>
