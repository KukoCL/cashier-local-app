import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsListView from '../views/products/ProductsListView.vue'
import ProductsCreateView from '../views/products/ProductsCreateView.vue'
import ActivationView from '../views/ActivationView.vue'
import { useActivation } from '../composables/useActivation'

const routes = [
  {
    path: '/activation',
    name: 'Activation',
    component: ActivationView,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresActivation: true },
  },
  {
    path: '/products',
    redirect: '/products/list',
    meta: { requiresActivation: true },
  },
  {
    path: '/products/list',
    name: 'ProductsList',
    component: ProductsListView,
    meta: { requiresActivation: true },
  },
  {
    path: '/products/create',
    name: 'ProductsCreate',
    component: ProductsCreateView,
    meta: { requiresActivation: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Navigation guard to check activation status
router.beforeEach(async (to, _from, next) => {
  const { checkActivationStatus } = useActivation()
  
  // Check if route requires activation
  if (to.meta.requiresActivation) {
    // Check current activation status from backend (license file)
    const isActivated = await checkActivationStatus()
    
    if (!isActivated) {
      // Redirect to activation page if not activated
      next('/activation')
      return
    }
  }
  
  // If going to activation page, check if already activated
  if (to.name === 'Activation') {
    const isActivated = await checkActivationStatus()
    if (isActivated) {
      next('/')
      return
    }
  }
  
  next()
})

export default router
