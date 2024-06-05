import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import ProductsDetails from '@/components/ProductsDetails.vue'
import CartPage from '@/components/CartPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/products/:id',
      name: 'ProductsPage',
      component: ProductsDetails
    },
    {
      name: 'CartPage',
      path: '/cart',
      component: CartPage
    }
  ]
})

export default router
