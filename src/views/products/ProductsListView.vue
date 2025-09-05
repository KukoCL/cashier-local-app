<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 m-0">{{ appMessages.products.list.title }}</h1>
      <button class="btn btn-primary" @click="navigateToStock">
        📦 Modificar stock de Productos
      </button>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="loading && products.length === 0" class="text-center text-muted py-5">
      {{ appMessages.common.loading }}
    </div>

    <ProductList
      v-else
      :products="products"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../../composables/useProducts'
import ProductList from '../../components/products/ProductList.vue'
import type { Product } from '../../types/interfaces'
import { appMessages } from '../../infraestructure/appMessages'

// Composables
const router = useRouter()
const { products, loading, error, loadProducts, deleteProduct } = useProducts()

// Navigation methods
const navigateToStock = () => {
  router.push('/products/stock')
}

// Product management methods
const handleEdit = (product: Product) => {
  router.push(`/products/edit/${product.id}`)
}

const handleDelete = async (product: Product) => {
  const success = await deleteProduct(product.id)
  if (success) {
    console.log('Product deleted successfully')
    await loadProducts() // Refresh the products list
  }
}

onMounted(() => {
  loadProducts()
})
</script>

