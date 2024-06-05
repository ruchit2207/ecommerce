<template>
  <h1>Home page</h1>
  <div v-for="product in products" :key="product.id">
    <div class="card" v-on:click="goToProductsPage(product.id)">
      <img :src="product.thumbnail" />
      <h2>Brand : {{ product.brand }}</h2>
      <h4 style="color: slategrey">Category : {{ product.category }}</h4>
      <h2>Price : ${{ product.price }}</h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()

// const router = useRouter()

const products = ref([])

const router = useRouter()

//using pinia

onMounted(async () => {
  const result = await fetch('https://dummyjson.com/products')
  const data = await result.json()
  store.addProducts(data.products)
  products.value = store?.allProducts
})
const goToProductsPage = (id) => {
  router.push({ name: 'ProductsPage', params: { id } })
}
</script>

<style scoped>
.card {
  width: 300px;
  height: 400px;
}
</style>
