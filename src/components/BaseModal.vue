<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <div class="modal-header" v-if="$slots.header || title || showCloseButton">
          <div class="modal-header-content">
            <slot name="header">
              <h3 class="modal-title">{{ title }}</h3>
            </slot>
          </div>
          <button
            v-if="showCloseButton"
            class="modal-close-btn"
            @click="$emit('close')"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'

interface Props {
  isOpen: boolean
  title?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  closeOnOverlayClick: true,
})

const emit = defineEmits<{
  close: []
}>()

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    emit('close')
  }
}

// Handle body scroll when modal is open
watch(() => props.isOpen, async (isOpen) => {
  await nextTick()
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup when component unmounts
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalEnter 0.2s ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  position: relative;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header-content {
  padding-right: 2rem;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.4;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.modal-close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-close-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
}
</style>
