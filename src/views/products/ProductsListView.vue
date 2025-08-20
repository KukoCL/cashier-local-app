<template>
  <div class="products-list-view">
    <div class="view-header">
      <h1>Lista de Productos</h1>
      <button class="refresh-btn" @click="refreshProducts" :disabled="loading">
        {{ loading ? 'Cargando...' : '🔄 Actualizar' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="loading && products.length === 0" class="loading-message">
      Cargando productos...
    </div>

    <div v-else-if="products.length === 0" class="empty-message">
      No hay productos registrados
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../../composables/useProducts'
import ProductCard from './components/ProductCard.vue'
import type { Product } from '../../types/interfaces'

const router = useRouter()
const { products, loading, error, loadProducts, deleteProduct } = useProducts()

const refreshProducts = async () => {
  await loadProducts()
}

const handleEdit = (product: Product) => {
  router.push(`/productos/edit/${product.id}`)
}

const handleDelete = async (product: Product) => {
  if (confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
    const success = await deleteProduct(product.id)
    if (success) {
      console.log('Product deleted successfully')
    }
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.products-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-header h1 {
  margin: 0;
  color: #2c3e50;
}

.refresh-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.refresh-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  background-color: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.loading-message,
.empty-message {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
