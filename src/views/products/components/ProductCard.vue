<template>
  <div class="product-card">
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
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../../../types/interfaces'
import { useCurrencyFormatter } from '../../../composables/useCurrencyFormatter'

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

<style scoped>
.product-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-name {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
  flex: 1;
  margin-right: 1rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #27ae60;
}

.product-details {
  margin-bottom: 1.5rem;
}

.product-description {
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  font-style: italic;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  font-size: 0.9rem;
  color: #34495e;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
