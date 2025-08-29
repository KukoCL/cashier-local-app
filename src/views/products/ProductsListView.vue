<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 m-0">{{ appMessages.products.list.title }}</h1>
      <button class="btn btn-primary" @click="refreshProducts" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ loading ? appMessages.common.loading : `🔄 ${appMessages.products.list.actions.refresh}` }}
      </button>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="loading && products.length === 0" class="text-center text-muted py-5">
      {{ appMessages.common.loading }}
    </div>

    <div v-else-if="products.length === 0" class="alert alert-info" role="alert">
      No hay productos registrados
    </div>

    <div v-else class="row g-3">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../../composables/useProducts'
import ProductCard from '../../components/products/ProductCard.vue'
import type { Product } from '../../types/interfaces'
import { appMessages } from '../../infraestructure/appMessages'

const router = useRouter()
const { products, loading, error, loadProducts, deleteProduct } = useProducts()

const refreshProducts = async () => {
  await loadProducts()
}

const handleEdit = (product: Product) => {
  router.push(`/products/edit/${product.id}`)
}

const handleDelete = async (product: Product) => {
  const success = await deleteProduct(product.id)
  if (success) {
    console.log('Product deleted successfully')
  }
}

onMounted(() => {
  loadProducts()
})
</script>

