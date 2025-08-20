<template>
  <nav class="top-bar">
    <div class="nav-brand">
      <h2>Cashier App</h2>
    </div>
    <div class="nav-links">
      <button
        class="nav-button"
        :class="{ active: currentSection === 'home' }"
        @click="$emit('navigate', 'home')"
      >
        🏠 Inicio
      </button>
      <button
        class="nav-button"
        :class="{ active: currentSection === 'productos' }"
        @click="$emit('navigate', 'productos')"
      >
        📦 Productos
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits<{
  navigate: [section: string]
}>()

const route = useRoute()

const currentSection = computed(() => {
  const pathSegments = route.path.split('/').filter(segment => segment)
  return pathSegments.length > 0 ? pathSegments[0] : 'home'
})
</script>

<style scoped>
.top-bar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand h2 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-button {
  background: transparent;
  border: 2px solid transparent;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.nav-button.active {
  background-color: #3498db;
  border-color: #3498db;
}
</style>
