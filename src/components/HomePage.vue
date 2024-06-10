<template>
  <v-container style="width: 1200px; border-radius: 16px" v-if="products.length > 0">
    <h1>p r o d u c t s</h1>
    <v-row no-gutters>
      <v-col cols="12" sm="3" lg="4" v-for="product in products" :key="product.id">
        <v-sheet
          class="ma-1 pa-3 cursor-pointer"
          style="border-radius: 0.6rem"
          :elevation="24"
          @click="goToProductsPage(product.id)"
        >
          <v-img
            height="250"
            :src="product.thumbnail"
            cover
            style="border-radius: 0.6rem; background-color: rgb(195 182 182)"
          ></v-img>
          <v-card-item>
            <v-card-title>{{ product.brand }}</v-card-title>

            <v-card-subtitle>
              <span class="me-1">$ {{ product.price }}</span>

              <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :model-value="product?.rating"
                color="amber"
                density="compact"
                size="large"
                half-increments
                readonly
              ></v-rating>

              <div class="text-grey ms-4 bg-pinky on-pinky">{{ product?.rating }}</div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <div class="my-4 text-subtitle-1">Category : {{ product.category }}</div>

          <v-card-actions>
            <v-hover v-slot="{ isHovering, props }" open-delay="200">
              <v-btn
                :class="{ 'on-hover': isHovering }"
                :elevation="isHovering ? 16 : 2"
                v-bind="props"
                color="deep-purple"
                text="See Deatiled Info"
                block
                border
                @click="goToProductsPage(product.id)"
                style="background-color: #e5dada"
              ></v-btn>
            </v-hover>
          </v-card-actions>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <div v-else>
    <v-card rounded="lg" theme="dark">
      <v-container>
        <v-row>
          <v-col v-for="n in 30" :key="n" cols="12" lg="4" md="6">
            <v-skeleton-loader :loading="loading" height="350" type="image, list-item-three-line">
              <v-responsive>
                <v-img :src="src" class="rounded-lg mb-2" height="284" cover></v-img>

                <v-list-item :subtitle="subtitle" :title="title" class="px-0"></v-list-item>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>

        <br />
      </v-container>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const store = productsStore()

const products = ref([])

const loading = ref(true)

const router = useRouter()

onMounted(async () => {
  const result = await fetch('https://dummyjson.com/products')
  const data = await result.json()
  store.addProducts(data.products)
  products.value = store?.allProducts
  loading.value = false
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

<style>
.custom-class {
  background: rgb(var(--v-theme-something));
  color: rgba(var(--v-theme-on-something), 0.9);
}
</style>
