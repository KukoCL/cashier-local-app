<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    :close-on-overlay-click="closeOnOverlayClick"
    :showCloseButton="showCloseButton"
    @close="handleCancel"
  >
    <div class="confirmation-content">
      <div class="confirmation-icon">
        <span class="icon" :class="iconClass">{{ icon }}</span>
      </div>
      <div class="confirmation-message">
        <p>{{ message }}</p>
        <p v-if="details" class="confirmation-details">{{ details }}</p>
      </div>
    </div>

    <template #footer>
      <button
        class="cancel-btn"
        @click="handleCancel"
        :disabled="loading"
      >
        {{ cancelText }}
      </button>
      <button
        class="confirm-btn"
        :class="confirmButtonClass"
        @click="handleConfirm"
        :disabled="loading"
      >
        <span v-if="loading" class="loading-spinner">⏳</span>
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

const iconClass = computed(() => {
  return `icon-${props.variant}`
})

const confirmButtonClass = computed(() => {
  return `btn-${props.variant}`
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.confirmation-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.confirmation-icon {
  flex-shrink: 0;
}

.icon {
  font-size: 2rem;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 50%;
}

.icon-danger {
  background-color: #fef2f2;
  color: #dc2626;
}

.icon-warning {
  background-color: #fffbeb;
  color: #d97706;
}

.icon-success {
  background-color: #f0fdf4;
  color: #16a34a;
}

.icon-info {
  background-color: #eff6ff;
  color: #2563eb;
}

.confirmation-message {
  flex: 1;
}

.confirmation-message p {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #374151;
}

.confirmation-message p:last-child {
  margin-bottom: 0;
}

.confirmation-details {
  font-size: 0.875rem;
  color: #6b7280;
}

.cancel-btn,
.confirm-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.cancel-btn {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.confirm-btn {
  color: white;
}

.btn-danger {
  background-color: #dc2626;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b91c1c;
}

.btn-warning {
  background-color: #d97706;
}

.btn-warning:hover:not(:disabled) {
  background-color: #b45309;
}

.btn-success {
  background-color: #16a34a;
}

.btn-success:hover:not(:disabled) {
  background-color: #15803d;
}

.btn-info {
  background-color: #2563eb;
}

.btn-info:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.cancel-btn:disabled,
.confirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
