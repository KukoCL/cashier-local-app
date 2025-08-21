<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'product' | 'stat'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: true,
})

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
  {
    'card--hover': props.hover,
  },
])
</script>

<!-- Component name will be BaseCard when imported -->
