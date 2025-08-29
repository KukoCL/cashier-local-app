<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ appMessages.app.name }}</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#topbarNav"
        aria-controls="topbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="topbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      <li class="nav-item">
            <button
        class="btn btn-link nav-link home-btn"
              :class="{ active: currentSection === 'home' }"
              @click="$emit('navigate', 'home')"
            >
              🏠 {{ appMessages.navigation.home }}
            </button>
            <span class="d-none" aria-hidden="true"></span>
          </li>
          <li class="nav-item">
            <button
        class="btn btn-link nav-link products-btn"
              :class="{ active: isProductsActive }"
              @click="$emit('navigate', 'products')"
            >
              📦 {{ appMessages.navigation.products }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { appMessages } from '../../infraestructure/appMessages'

defineEmits<{
  navigate: [section: string]
}>()

const route = useRoute()

const currentSection = computed(() => {
  const pathSegments = route.path.split('/').filter(segment => segment)
  return pathSegments.length > 0 ? pathSegments[0] : 'home'
})

const isProductsActive = computed(() => {
  return currentSection.value === 'products'
})
</script>
