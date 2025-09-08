<template>
  <BaseModal
    :is-open="isOpen"
    :close-on-overlay-click="false"
    :title="modalTitle"
    @close="$emit('close')"
  >
    <template #default>
      <div v-if="product">
        <!-- Product Information -->
        <div class="mb-4">
          <h5 class="mb-3">{{ product.name }}</h5>
          <div class="row g-3">
            <div class="col-12">
              <p v-if="product.description" class="text-muted fst-italic mb-2">
                {{ product.description }}
              </p>
            </div>
            <div class="col-6">
              <small class="text-muted">{{ appMessages.common.category }}:</small>
              <div class="fw-semibold">{{ product.productType }}</div>
            </div>
            <div class="col-6">
              <small class="text-muted">{{ appMessages.common.stock }} actual:</small>
              <div class="fw-semibold">{{ product.stock }} {{ spanishUnitType }}</div>
            </div>
          </div>
        </div>

        <!-- Operation Type Selection -->
        <div class="mb-3">
          <label class="form-label">{{ stockMessages.operationType.label }}</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="operationType"
                id="update"
                value="update"
                v-model="operationType"
              >
              <label class="form-check-label" for="update">
                {{ stockMessages.operationType.update }}
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="operationType"
                id="add"
                value="add"
                v-model="operationType"
              >
              <label class="form-check-label" for="add">
                {{ stockMessages.operationType.add }}
              </label>
            </div>
          </div>
        </div>

        <!-- Quantity Input -->
        <div class="mb-3">
          <label class="form-label">{{ stockMessages.quantity.label }}</label>
          <input
            type="number"
            class="form-control"
            v-model.number="quantity"
            :placeholder="stockMessages.quantity.placeholder"
            min="0"
            step="1"
          >
        </div>

        <!-- New Total Preview -->
        <div v-if="quantity > 0" class="alert alert-info">
          <strong>{{ stockMessages.newTotal.label }}:</strong>
          {{ newTotal }} {{ spanishUnitTypeForNewTotal }}
        </div>
      </div>
    </template>

    <template #footer>
      <div class="d-flex gap-2 justify-content-end">
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('close')"
        >
          {{ appMessages.common.cancel }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!isFormValid || isLoading"
          @click="handleConfirm"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
          {{ stockMessages.actions.confirm }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../../types/interfaces'
import BaseModal from '../BaseModal.vue'
import { appMessages } from '../../infraestructure/appMessages'
import { useUnitTypeMapper } from '../../composables/useUnitTypeMapper'

const stockMessages = {
  title: 'Modificar Stock',
  operationType: {
    label: 'Tipo de operación',
    update: 'Actualizar (reemplazar stock actual)',
    add: 'Agregar (sumar al stock actual)',
  },
  quantity: {
    label: 'Cantidad',
    placeholder: 'Ingrese la cantidad',
  },
  newTotal: {
    label: 'Nuevo total',
  },
  actions: {
    confirm: 'Confirmar cambios',
  },
}

interface Props {
  isOpen: boolean
  product?: Product | null
  isLoading?: boolean
}

interface Emits {
  close: []
  confirm: [data: { productId: string; operationType: 'update' | 'add'; quantity: number; newTotal: number }]
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<Emits>()

// Unit type mapper composable
const { mapUnitTypeToSpanish } = useUnitTypeMapper()

const operationType = ref<'update' | 'add'>('update')
const quantity = ref<number>(0)

const modalTitle = computed(() => {
  return props.product ? `${stockMessages.title} - ${props.product.name}` : stockMessages.title
})

const spanishUnitType = computed(() => {
  return mapUnitTypeToSpanish(props.product?.unitType, props.product?.stock || 0)
})

const spanishUnitTypeForNewTotal = computed(() => {
  return mapUnitTypeToSpanish(props.product?.unitType, newTotal.value)
})

const newTotal = computed(() => {
  if (!props.product || quantity.value <= 0) return 0
  
  if (operationType.value === 'update') {
    return quantity.value
  } else {
    return props.product.stock + quantity.value
  }
})

const isFormValid = computed(() => {
  return quantity.value > 0 && operationType.value && props.product
})

const handleConfirm = () => {
  if (!isFormValid.value || !props.product) return
  
  emit('confirm', {
    productId: props.product.id,
    operationType: operationType.value,
    quantity: quantity.value,
    newTotal: newTotal.value,
  })
  
  // Reset form
  operationType.value = 'update'
  quantity.value = 0
}
</script>
