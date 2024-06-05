<script setup>
import { RouterView } from 'vue-router'
import { productsStore } from './stores/products'

const store = productsStore()
</script>
<template>
  <header>
    <p>Items to Cart : {{ store.cart.length }}</p>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped></style>
