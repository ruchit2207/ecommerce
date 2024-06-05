<template>
  <div>
    <h1>product details</h1>
    <div>
      <img :src="selectedProduct?.thumbnail" alt="" />
      <p>Brand: {{ selectedProduct?.brand }}</p>
      <p>Description: {{ selectedProduct?.description }}</p>
      <h2>Price: ${{ selectedProduct?.price }}</h2>
      <button v-on:click="handleAddToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
const store = productsStore()

const route = useRoute()

const router = useRouter()

const selectedProduct = computed(() => {
  return store.allProducts.find((item) => item.id === Number(route.params.id))
})

const handleAddToCart = () => {
  store.addToCart(selectedProduct.value)
  router.push({ name: 'CartPage' })
}

console.log('selected product = ', selectedProduct.value)
</script>

<style lang="scss" scoped></style>
