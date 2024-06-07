<template>
  <v-card class="mx-auto" max-width="360" v-if="!store.cart.length">
    <v-layout>
      <v-app-bar color="#6200ee" title="Drafts"> </v-app-bar>

      <v-main>
        <v-empty-state
          image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
          size="200"
          text-width="250"
        >
          <template v-slot:media>
            <v-img class="mb-8"></v-img>
          </template>

          <template v-slot:title>
            <div class="text-h6 text-high-emphasis">Cart is Empty!!</div>
          </template>

          <template v-slot:text>
            <div class="text-body-1">Add some Products</div>
            <v-btn
              variant="tonal"
              v-on:click="router.push({ name: 'HomePage' })"
              style="width: 800px"
              >Back to Products Page !!</v-btn
            >
          </template>
        </v-empty-state>
      </v-main>
    </v-layout>
  </v-card>
  <v-container style="width: 1200px; border-radius: 16px; margin: 30px; padding: 20px" v-else>
    <h1>Products In Cart :</h1>
    <v-row no-gutters>
      <v-col cols="12" sm="3" lg="4">
        <v-sheet
          :elevation="24"
          :height="450"
          :width="1160"
          border
          rounded
          v-for="product in store.cart"
          :key="product.item.id"
          style="margin-bottom: 8px; display: flex; padding: 4px"
        >
          <img :src="product.item.thumbnail" />
          <v-sheet
            :elevation="24"
            :height="390"
            :width="700"
            border
            rounded
            style="margin-top: 20px"
          >
            <v-card-item>
              <v-card-title style="font-size: xx-large; font-weight: bold">{{
                product.item?.title
              }}</v-card-title>

              <v-card-subtitle>
                <span class="me-1">
                  {{ product.item?.category }}
                </span>
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <h2
                v-if="product.item?.discountPercentage"
                class="text-subtitle-1"
                style="font-size: 20px; font-weight: bold"
              >
                $ {{ product.item?.discountPercentage }}
              </h2>

              <h2
                v-if="product.item?.discountPercentage"
                class="text-subtitle-1"
                style="text-decoration: line-through; color: gray"
              >
                $ {{ product.item?.price }}
              </h2>

              <span class="me-1">
                {{ product.item?.warrantyInformation }}
              </span>

              <div>
                <h2 style="margin-bottom: 6px; margin-top: 20px">About The Product :</h2>
                {{ product.item?.description }}
                <br />
              </div>
              <div style="display: flex; align-items: center; gap: 20px; margin-top: 4px">
                <v-btn
                  density="compact"
                  icon="mdi-minus"
                  @click="cartQuantiyDecrement(product.item.id)"
                ></v-btn>
                <h2>{{ product.qty }}</h2>
                <v-btn
                  density="compact"
                  icon="mdi-plus"
                  @click="cartQuantiyIncrement(product.item.id)"
                ></v-btn>
              </div>
            </v-card-text>

            <div style="display: flex; justify-content: space-evenly">
              <div style="display: flex; justify-content: center; align-items: center">
                <v-btn
                  height="52"
                  min-width="164"
                  @click="dialog = !dialog"
                  style="background-color: #339f33; color: wheat"
                  >Buy Now</v-btn
                >
              </div>

              <div
                @click="removeFromCart(item.id)"
                style="display: flex; justify-content: center; align-items: center"
              >
                <v-btn height="52" min-width="164" style="background-color: #b53636; color: wheat"
                  >Remove Product</v-btn
                >
              </div>
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="auto">
    <v-card
      v-if="dialog"
      append-icon="$close"
      class="mx-auto"
      elevation="16"
      max-width="700"
      title="Order Summary.."
      style="padding: 8px"
    >
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-12 text-center">
        <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

        <div class="text-h4 font-weight-bold">Congratulations!!Order Is Placed..</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn
          class="text-none"
          color="medium-emphasis"
          min-width="92"
          variant="outlined"
          rounded
          @click="navi"
        >
          Go Back To Home Page!!
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const store = productsStore()

const router = useRouter()

const dialog = ref(false)

const cartQuantiyIncrement = (id) => {
  const product = store.cart.find((pro) => {
    return pro.item.id === id
  })
  console.log(product)

  product.qty++
}

const cartQuantiyDecrement = (id) => {
  const product = store.cart.find((pro) => {
    return pro.item.id === id
  })
  console.log(product)
  if (product.qty !== 1) {
    product.qty--
  }
}

console.log(store.cart)

const removeFromCart = (id) => {
  store.removeFromCart(id)
}

const navi = () => {
  dialog.value = false
  router.push({ name: 'HomePage' })
}
</script>

<style lang="scss" scoped></style>
