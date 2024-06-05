<template>
  <button v-on:click="router.push({ name: 'HomePage' })">Back to Products Page !!</button>
  <div>
    <h1>Cart</h1>
    <div v-if="!store.cart.length">Cart is empty!!</div>
    <div v-else>
      <div v-for="item in store.cart" :key="item.id">
        <div>
          <img :src="item.thumbnail" />
          <span>Brand: {{ item.brand }}</span>
          <span>Category: {{ item.category }}</span>
          <span>Price: ${{ item.price }}</span>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()

const router = useRouter()

console.log(store.cart)

const removeFromCart = (id) => {
  store.removeFromCart(id)
}
</script>

<style lang="scss" scoped></style>
