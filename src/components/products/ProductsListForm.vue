<template>
  <div>
    <!-- Search and Filters Row -->
    <div class="row g-3 mb-4">
      <div class="col-lg-3">
        <div class="d-flex flex-column h-100">
          <label class="form-label">&nbsp;</label>
          <div class="input-group">
            <span class="input-group-text">📋</span>
            <input
              type="text"
              class="form-control"
              :placeholder="messages.barcodeSearch.placeholder"
              v-model="barcodeSearchQuery"
              @input="onBarcodeSearchInput"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="d-flex flex-column h-100">
          <label class="form-label">&nbsp;</label>
          <div class="input-group">
            <span class="input-group-text">🔍</span>
            <input
              type="text"
              class="form-control"
              :placeholder="messages.search.placeholder"
              v-model="searchQuery"
              @input="onSearchInput"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <label class="form-label">{{ messages.filters.sortBy.label }}</label>
        <select class="form-select" v-model="sortBy">
          <option value="alphabetical">{{ messages.filters.sortBy.options.alphabetical }}</option>
          <option value="price-desc">{{ messages.filters.sortBy.options.priceDesc }}</option>
          <option value="price-asc">{{ messages.filters.sortBy.options.priceAsc }}</option>
        </select>
      </div>
      
      <div class="col-lg-3">
        <label class="form-label">{{ messages.filters.category.label }}</label>
        <select class="form-select" v-model="selectedCategory">
          <option value="">{{ messages.filters.category.all }}</option>
          <option v-for="category in productTypes" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length === 0" class="alert alert-info" role="alert">
      {{ messages.messages.noProducts }}
    </div>

    <div v-else class="row g-3">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in filteredProducts" :key="product.id">
        <ProductCard
          :product="product"
          @edit="handleEdit"
          @delete="handleDelete"
          @modify-stock="handleModifyStock"
        />
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :is-open="showDeleteDialog"
      :title="messages.deleteDialog.title"
      :message="`${messages.deleteDialog.message} '${productToDelete?.name}'?`"
      :details="messages.deleteDialog.details"
      :confirm-text="messages.deleteDialog.confirm"
      :cancel-text="messages.deleteDialog.cancel"
      variant="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <!-- Edit Stock Modal -->
    <EditStock
      :is-open="showEditStockModal"
      :product="productToEditStock"
      :is-loading="stockLoading"
      @close="closeEditStockModal"
      @confirm="confirmStockUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import ProductCard from './ProductCard.vue'
import ConfirmationDialog from '../ConfirmationDialog.vue'
import EditStock from './EditStock.vue'
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

const messages = appMessages.products.list;
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Use the product list composable
const {
  searchQuery,
  barcodeSearchQuery,
  sortBy,
  selectedCategory,
  productTypes,
  filteredProducts,
  onSearchInput,
  onBarcodeSearchInput,
} = useProductListForm(toRef(props, 'products'))

// Delete dialog state
const showDeleteDialog = ref(false)
const productToDelete = ref<Product | null>(null)
const deleteLoading = ref(false)

// Edit stock modal state
const showEditStockModal = ref(false)
const productToEditStock = ref<Product | null>(null)
const stockLoading = ref(false)

const handleEdit = (product: Product) => {
  emit('edit', product)
}

const handleDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteDialog.value = true
}

const handleModifyStock = (product: Product) => {
  productToEditStock.value = product
  showEditStockModal.value = true
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

const closeEditStockModal = () => {
  showEditStockModal.value = false
  productToEditStock.value = null
}

const confirmStockUpdate = async (data: {
  productId: string
  operationType: 'update' | 'add'
  quantity: number
  newTotal: number
}) => {
  stockLoading.value = true
  try {
    // Here you would call your API to update the stock
    console.log('Stock update data:', data)
    
    // For now, just close the modal
    // TODO: Implement actual stock update logic
    closeEditStockModal()
  } finally {
    stockLoading.value = false
  }
}
</script>
