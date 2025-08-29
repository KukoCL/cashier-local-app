<template>
  <aside class="border-end bg-light flex-shrink-0 flex-grow-0 sidebar" style="width: 270px; min-height: calc(100vh - 56px)">
    <div class="p-3 sidebar-content">
      <div v-for="section in sections" :key="section.id" class="mb-4 sidebar-section">
        <h6 class="text-uppercase text-muted fw-bold small mb-2">{{ section.title }}</h6>
        <div class="list-group">
          <button
            v-for="item in section.items"
            :key="item.id"
            type="button"
            class="list-group-item list-group-item-action d-flex align-items-center sidebar-button"
            :class="{ active: isActiveItem(item) }"
            @click="handleItemClick(item)"
          >
            <span>{{ `${item.icon} ${item.label}` }}</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { SidebarItem, SidebarSection } from '../../types/interfaces'

interface Props {
  sections: SidebarSection[]
}

defineProps<Props>()

const emit = defineEmits<{
  navigate: [action: string]
  itemClick: [item: SidebarItem]
}>()

const route = useRoute()

const currentPath = computed(() => route.path)

const isActiveItem = (item: SidebarItem): boolean => {
  // Check if item has custom isActive logic
  if (item.isActive !== undefined) {
    return item.isActive
  }

  // Default logic: check if the action matches current route
  if (typeof item.action === 'string') {
    return currentPath.value.includes(item.action)
  }

  return false
}

const handleItemClick = (item: SidebarItem) => {
  if (typeof item.action === 'string') {
    // Emit navigate for string actions (routes)
    emit('navigate', item.action)
  } else if (typeof item.action === 'function') {
    // Execute function actions directly
    item.action()
  }

  // Always emit itemClick for parent to handle
  emit('itemClick', item)
}
</script>

