<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div v-if="currentSection === 'productos'" class="sidebar-section">
        <h3>Productos</h3>
        <ul class="sidebar-menu">
          <li>
            <button
              class="sidebar-button"
              :class="{ active: isCurrentView('list') }"
              @click="$emit('navigate', 'list')"
            >
              📋 Lista de Productos
            </button>
          </li>
          <li>
            <button
              class="sidebar-button"
              :class="{ active: isCurrentView('create') }"
              @click="$emit('navigate', 'create')"
            >
              ➕ Crear Producto
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

interface Props {
  currentSection: string
}

defineProps<Props>()

defineEmits<{
  navigate: [view: string]
}>()

const route = useRoute()

const currentView = computed(() => {
  const pathSegments = route.path.split('/').filter(segment => segment)
  return pathSegments.length > 1 ? pathSegments[1] : 'list'
})

const isCurrentView = (view: string): boolean => {
  return currentView.value === view
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
