import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsListView from '../views/products/ProductsListView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/productos',
    redirect: '/productos/list',
  },
  {
    path: '/productos/list',
    name: 'ProductsList',
    component: ProductsListView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
