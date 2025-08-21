<template>
  <BaseCard variant="product">
    <div class="product-header">
      <h3 class="product-name">{{ product.name }}</h3>
      <span class="product-price">{{ formatCLP(product.price) }}</span>
    </div>

    <div class="product-details">
      <p v-if="product.description" class="product-description">
        {{ product.description }}
      </p>
      <div class="product-info">
        <span class="info-item">
          <strong>Código:</strong> {{ product.barCode || 'Sin código' }}
        </span>
        <span class="info-item">
          <strong>Stock:</strong> {{ product.stock }} {{ product.unitType }}
        </span>
        <span class="info-item">
          <strong>Categoría:</strong> {{ product.productType }}
        </span>
      </div>
    </div>

    <div class="product-actions">
      <button class="edit-btn" @click="$emit('edit', product)">
        ✏️ Editar
      </button>
      <button class="delete-btn" @click="$emit('delete', product)">
        🗑️ Eliminar
      </button>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Product } from '../../types/interfaces'
import { useCurrencyFormatter } from '../../composables/useCurrencyFormatter'
import BaseCard from '../BaseCard.vue'

interface Props {
  product: Product
}

defineProps<Props>()

defineEmits<{
  edit: [product: Product]
  delete: [product: Product]
}>()

const { formatCLP } = useCurrencyFormatter()
</script>
