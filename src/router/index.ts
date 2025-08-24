import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsListView from '../views/products/ProductsListView.vue'
import ProductsCreateView from '../views/products/ProductsCreateView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/products',
    redirect: '/products/list',
  },
  {
    path: '/products/list',
    name: 'ProductsList',
    component: ProductsListView,
  },
  {
    path: '/products/create',
    name: 'ProductsCreate',
    component: ProductsCreateView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
