import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import ProductsDetails from '@/components/ProductsDetails.vue'
import CartPage from '@/components/CartPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import PageNotFound from '@/components/PageNotFound.vue'

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
    },
    {
      name: 'LoginPage',
      path: '/login',
      component: LoginPage
    },
    {
      name: 'RegisterPage',
      path: '/register',
      component: RegisterPage
    },
    {
      name: 'PageNotFound',
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

export default router
