<template>
  <v-container
    v-if="selectedProduct"
    style="
      max-width: 1200px;
      height: 695px;
      display: flex;
      justify-items: center;
      align-items: center;
      gap: 20px;
    "
  >
    <v-sheet :elevation="24" :height="600" :width="500" border rounded>
      <img
        :src="selectedProduct?.thumbnail"
        alt=""
        width="450"
        style="object-fit: cover; margin-bottom: 20px; background-color: #bb9999"
      />

      <div style="display: flex; justify-content: space-evenly">
        <div
          style="display: flex; justify-content: center; align-items: center"
          v-if="!itemAlreadyThere"
        >
          <v-snackbar :timeout="2000" color="success">
            <template v-slot:activator="{ props }">
              <v-btn
                height="52"
                min-width="164"
                style="background-color: rgb(73 161 73); color: white"
                v-on:click="handleAddToCart"
                class="ma-2"
                v-bind="props"
                >Add To Cart</v-btn
              >
            </template>

            Item Added To Cart
          </v-snackbar>
        </div>
        <div style="display: column; justify-content: center; align-items: center" v-else>
          <v-btn
            height="52"
            min-width="164"
            style="background-color: #339f33; color: wheat"
            v-on:click="carty"
            class="ma-2"
            >Go To Cart</v-btn
          >
        </div>
        <div @click="navi" style="display: flex; justify-content: center; align-items: center">
          <v-btn height="52" min-width="164" @click="navi" style="background-color: #e5dada"
            >Go Back To Home Page!
          </v-btn>
        </div>
      </div>
      <h3 v-if="itemAlreadyThere" style="text-align: center; margin-top: 8px">
        Items Already in the Cart !!
      </h3>
    </v-sheet>
    <v-sheet
      :elevation="24"
      :height="600"
      :width="800"
      border
      rounded
      style="overflow-y: scroll; padding: 20px"
    >
      <v-card-item>
        <v-card-title style="font-size: xx-large; font-weight: bold">{{
          selectedProduct?.title
        }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">
            {{ selectedProduct?.category }}
          </span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :model-value="selectedProduct?.rating"
            color="amber"
            density="compact"
            size="large"
            half-increments
            readonly
          ></v-rating>

          <div class="text-grey ms-4">{{ selectedProduct?.rating }}</div>
        </v-row>

        <h1
          v-if="selectedProduct?.discountPercentage"
          class="my-6 text-subtitle-1"
          style="font-size: 500px; font-weight: bold"
        >
          $ {{ selectedProduct?.discountPercentage }}
        </h1>

        <h2
          v-if="selectedProduct?.discountPercentage"
          class="text-subtitle-1"
          style="text-decoration: line-through; color: gray"
        >
          $ {{ selectedProduct?.price }}
        </h2>

        <span class="me-1" style="color: red">
          {{ selectedProduct?.warrantyInformation }}
        </span>

        <div>
          <h2 style="margin-bottom: 6px; margin-top: 20px">About The Product :</h2>
          {{ selectedProduct?.description }}
        </div>

        <div>
          <h2 style="margin-bottom: 6px; margin-top: 20px">Reviews By Buyers :</h2>

          <v-expansion-panels multiple v-for="review in panel" :key="review.reviewerEmail">
            <v-expansion-panel
              :text="review.comment"
              :title="review.reviewerName"
              style="background-color: #e5dada; color: #1e1919; margin-bottom: 6px"
            ></v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-text>
    </v-sheet>
  </v-container>

  <div v-else style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)">
    <v-card
      title="You Have not selected Any Items!"
      text="Go Back to Products Page,and Shop Some Items.."
      style="width: 600px; height: 165px; text-align: center"
      variant="tonal"
    >
      <div style="display: flex; justify-content: center; align-items: center">
        <v-btn height="52" min-width="164" @click="navi"> Go Back To Products Page</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
const store = productsStore()

const route = useRoute()

const router = useRouter()

let panel = ref([])

const itemAlreadyThere = ref(false)

const selectedProduct = computed(() => {
  return store.allProducts.find((item) => item.id === Number(route.params.id))
})

const navi = () => {
  router.push({ name: 'HomePage' })
}

const carty = () => {
  router.push({ name: 'CartPage' })
}

if (selectedProduct.value) {
  panel.value = selectedProduct.value?.reviews
  console.log(panel.value)
}

watchEffect(() => {
  const product = store.cart.find((item) => item.item.id === Number(route.params.id))
  if (product) {
    itemAlreadyThere.value = true
  } else {
    itemAlreadyThere.value = false
  }
})

const handleAddToCart = () => {
  store.addToCart({
    qty: 1,
    item: selectedProduct.value
  })

  // router.push({ name: 'CartPage' })
}

console.log('selected product = ', selectedProduct.value)
</script>

<style lang="scss" scoped></style>
