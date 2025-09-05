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
              :placeholder="appMessages.products.list.search.placeholder"
              v-model="searchQuery"
              @input="onSearchInput"
            />
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <label class="form-label">{{ appMessages.products.list.filters.sortBy.label }}</label>
        <select class="form-select" v-model="sortBy">
          <option value="alphabetical">{{ appMessages.products.list.filters.sortBy.options.alphabetical }}</option>
          <option value="price-desc">{{ appMessages.products.list.filters.sortBy.options.priceDesc }}</option>
          <option value="price-asc">{{ appMessages.products.list.filters.sortBy.options.priceAsc }}</option>
        </select>
      </div>
      
      <div class="col-md-3">
        <label class="form-label">{{ appMessages.products.list.filters.category.label }}</label>
        <select class="form-select" v-model="selectedCategory">
          <option value="">{{ appMessages.products.list.filters.category.all }}</option>
          <option v-for="category in productTypes" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info" role="alert">
      {{ appMessages.products.list.messages.noProducts }}
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
      :title="appMessages.products.list.deleteDialog.title"
      :message="`${appMessages.products.list.deleteDialog.message} '${productToDelete?.name}'?`"
      :details="appMessages.products.list.deleteDialog.details"
      :confirm-text="appMessages.products.list.deleteDialog.confirm"
      :cancel-text="appMessages.products.list.deleteDialog.cancel"
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
import { useProductListForm } from '../../composables/useProductListForm'
import { appMessages } from '../../infraestructure/appMessages'

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
} = useProductListForm(toRef(props, 'products'))

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
