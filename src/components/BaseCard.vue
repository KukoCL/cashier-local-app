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

const cardClasses = computed(() => {
  const classes: string[] = ['card', 'shadow-sm']
  // Preserve old test hooks
  classes.push(`card--${props.variant}`)
  if (props.hover) classes.push('card--hover')

  // content padding wrappers by variant
  if (props.variant === 'stat' || props.variant === 'product' || props.variant === 'default') {
    classes.push('p-3')
  }
  return classes
})
</script>

<!-- Component name will be BaseCard when imported -->
