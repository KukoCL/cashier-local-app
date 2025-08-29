<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal d-block" tabindex="-1" @click="handleOverlayClick" style="background: rgba(0,0,0,.5)">
      <div class="modal-dialog" @click.stop>
        <div class="modal-content">
          <div class="modal-header" v-if="$slots.header || title || showCloseButton">
            <slot name="header">
              <h5 class="modal-title mb-0">{{ title }}</h5>
            </slot>
            <button v-if="showCloseButton" type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
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

