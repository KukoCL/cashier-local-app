<template>
  <BaseCard variant="product" class="h-100 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h3 class="h5 m-0">{{ product.name }}</h3>
      <span class="badge text-bg-success">{{ formatCLP(product.price) }}</span>
    </div>

    <div class="mb-3 flex-grow-1 d-flex flex-column">
      <p v-if="product.description" class="text-muted fst-italic mb-2 product-description">
        {{ product.description }}
      </p>
      <div class="small d-flex flex-column gap-1 mt-auto">
        <span>
          <strong>{{ appMessages.common.code }}:</strong> {{ product.barCode || 'Sin código' }}
        </span>
        <span>
          <strong>{{ appMessages.common.stock }}:</strong> {{ product.stock }} {{ product.unitType }}
        </span>
        <span>
          <strong>{{ appMessages.common.category }}:</strong> {{ product.productType }}
        </span>
      </div>
    </div>

    <div class="d-flex flex-column gap-2 mt-auto">
      <button class="btn btn-sm btn-warning w-100 modify-stock-btn" @click="$emit('modifyStock', product)">
        {{ appMessages.products.list.actions.modifyStock }}
      </button>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary flex-fill edit-btn" @click="$emit('edit', product)">
          ✏️ {{ appMessages.common.edit }}
        </button>
        <button class="btn btn-sm btn-danger flex-fill delete-btn" @click="showDeleteConfirmation = true">
          🗑️ {{ appMessages.common.delete }}
        </button>
      </div>
    </div>

    <ConfirmationDialog
      :is-open="showDeleteConfirmation"
      :title="deleteDialog.title"
      :message="`${deleteDialog.message} '${product.name}'?`"
      :details="deleteDialog.details"
      :confirm-text="deleteDialog.confirm"
      :cancel-text="deleteDialog.cancel"
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
import { appMessages } from '../../infraestructure/appMessages'

const deleteDialog = appMessages.products.list.deleteDialog

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [product: Product]
  delete: [product: Product]
  modifyStock: [product: Product]
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
