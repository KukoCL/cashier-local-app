import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsListView from '../views/products/ProductsListView.vue'
import ProductsCreateView from '../views/products/ProductsCreateView.vue'
import ActivationView from '../views/ActivationView.vue'
import { useActivationStore } from '../stores/activation'

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
router.beforeEach((to, _from, next) => {
  const activationStore = useActivationStore()
  
  // Check if route requires activation
  if (to.meta.requiresActivation) {
    // Load current activation status
    activationStore.loadActivationStatus()
    
    if (!activationStore.activationStatus.isActivated) {
      // Redirect to activation page if not activated
      next('/activation')
      return
    }
  }
  
  // If going to activation page but already activated, redirect to home
  if (to.name === 'Activation' && activationStore.activationStatus.isActivated) {
    next('/')
    return
  }
  
  next()
})

export default router
