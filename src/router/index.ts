import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MessagesView from '../views/MessagesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: MessagesView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
