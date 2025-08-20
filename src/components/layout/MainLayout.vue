<template>
  <div class="main-layout">
    <TopBar @navigate="handleNavigation" />
    <div class="layout-content">
      <SideBar
        v-if="showSideBar"
        :current-section="currentSection"
        @navigate="handleSideNavigation"
      />
      <main class="main-content" :class="{ 'with-sidebar': showSideBar }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from './TopBar.vue'
import SideBar from './SideBar.vue'

const route = useRoute()
const router = useRouter()

const currentSection = ref<string>('')

const showSideBar = computed(() => {
  return currentSection.value !== '' && currentSection.value !== 'home'
})

const updateCurrentSection = () => {
  const pathSegments = route.path.split('/').filter(segment => segment)
  if (pathSegments.length > 0) {
    currentSection.value = pathSegments[0]
  } else {
    currentSection.value = 'home'
  }
}

const handleNavigation = (section: string) => {
  currentSection.value = section

  // Navigate to the default view for each section
  switch (section) {
  case 'productos':
    router.push('/productos')
    break
  case 'home':
    router.push('/')
    break
  default:
    router.push('/')
  }
}

const handleSideNavigation = (view: string) => {
  router.push(`/${currentSection.value}/${view}`)
}

// Set current section based on route
onMounted(() => {
  updateCurrentSection()
})

// Watch for route changes and update current section
watch(() => route.path, () => {
  updateCurrentSection()
})
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.main-content.with-sidebar {
  margin-left: 0;
}
</style>
