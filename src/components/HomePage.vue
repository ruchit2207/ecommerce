<template>
  <v-container class="bg-surface-variant">
    <h1>p r o d u c t s</h1>
    <v-row no-gutters>
      <v-col cols="12" sm="8" lg="4" v-for="product in products" :key="product.id">
        <v-sheet class="ma-2 pa-2">
          <v-img height="250" :src="product.thumbnail" cover></v-img>
          <v-card-item>
            <v-card-title>{{ product.brand }}</v-card-title>

            <v-card-subtitle>
              <span class="me-1">$ {{ product.price }}</span>

              <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-progress-linear
                bg-color="#92aed9"
                buffer-color="#6a3e0b"
                buffer-opacity="1"
                :buffer-value="product.rating"
                color="#12512a"
                height="12"
                max="9"
                min="0"
                :model-value="2"
                rounded
              ></v-progress-linear>

              <div class="ms-4 text-h6">{{ product.rating }} / 5</div>
            </v-row>
            <br />
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <div class="my-4 text-subtitle-1">Category : {{ product.category }}</div>

          <!-- <div>
            {{ product.description }}
          </div> -->
          <v-card-actions>
            <v-btn
              color="deep-purple-lighten-2"
              text="Add To Cart"
              block
              border:2
              @click="goToProductsPage(product.id)"
            ></v-btn>
          </v-card-actions>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()

const products = ref([])

const router = useRouter()

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
