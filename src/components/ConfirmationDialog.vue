<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    :close-on-overlay-click="closeOnOverlayClick"
    :showCloseButton="showCloseButton"
    @close="handleCancel"
  >
    <div class="d-flex gap-3 align-items-start">
      <div class="flex-shrink-0">
        <span class="fs-3">{{ icon }}</span>
      </div>
      <div class="flex-grow-1">
        <p class="mb-1">{{ message }}</p>
        <p v-if="details" class="text-muted small mb-0">{{ details }}</p>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-outline-secondary" @click="handleCancel" :disabled="loading">{{ cancelText }}</button>
      <button :class="confirmButtonClass" @click="handleConfirm" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ loading ? 'Processing...' : confirmText }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'

interface Props {
  isOpen: boolean
  title?: string
  message: string
  details?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info' | 'success'
  loading?: boolean
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info',
  loading: false,
  closeOnOverlayClick: true,
  showCloseButton: true,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const icon = computed(() => {
  switch (props.variant) {
  case 'danger':
    return '⚠️'
  case 'warning':
    return '⚠️'
  case 'success':
    return '✅'
  default:
    return 'ℹ️'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.variant) {
  case 'danger':
    return 'btn btn-danger'
  case 'warning':
    return 'btn btn-warning'
  case 'success':
    return 'btn btn-success'
  default:
    return 'btn btn-primary'
  }
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

