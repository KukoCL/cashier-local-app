<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div v-for="section in sections" :key="section.id" class="sidebar-section">
        <h3>{{ section.title }}</h3>
        <ul class="sidebar-menu">
          <li v-for="item in section.items" :key="item.id">
            <button
              class="sidebar-button"
              :class="{ active: isActiveItem(item) }"
              @click="handleItemClick(item)"
            >
              {{ item.icon }} {{ item.label }}
            </button>
          </li>
        </ul>
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

<style scoped>
.sidebar {
  width: 250px;
  background-color: #ecf0f1;
  border-right: 1px solid #bdc3c7;
  min-height: calc(100vh - 80px);
}

.sidebar-content {
  padding: 1rem;
}

.sidebar-section h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 0.5rem;
}

.sidebar-button {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.sidebar-button:hover {
  background-color: #d5dbdb;
}

.sidebar-button.active {
  background-color: #3498db;
  color: white;
}
</style>
