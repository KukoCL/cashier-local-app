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
          <strong>Code:</strong> {{ product.barCode || 'No code' }}
        </span>
        <span class="info-item">
          <strong>Stock:</strong> {{ product.stock }} {{ product.unitType }}
        </span>
        <span class="info-item">
          <strong>Category:</strong> {{ product.productType }}
        </span>
      </div>
    </div>

    <div class="product-actions">
      <button class="edit-btn" @click="$emit('edit', product)">
        ✏️ Edit
      </button>
      <button class="delete-btn" @click="showDeleteConfirmation = true">
        🗑️ Delete
      </button>
    </div>

    <ConfirmationDialog
      :is-open="showDeleteConfirmation"
      title="Delete Product"
      :message="`Are you sure you want to delete the product '${product.name}'?`"
      details="This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      variant="danger"
      :loading="isDeleting"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirmation = false"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../../types/interfaces'
import { useCurrencyFormatter } from '../../composables/useCurrencyFormatter'
import BaseCard from '../BaseCard.vue'
import ConfirmationDialog from '../ConfirmationDialog.vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [product: Product]
  delete: [product: Product]
}>()

const { formatCLP } = useCurrencyFormatter()

const showDeleteConfirmation = ref(false)
const isDeleting = ref(false)

const handleDeleteConfirm = async () => {
  isDeleting.value = true
  try {
    emit('delete', props.product)
    showDeleteConfirmation.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>
