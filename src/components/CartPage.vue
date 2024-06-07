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
  <v-container
    class="bg-surface-variant"
    style="width: 1200px; border-radius: 16px; margin: 30px; padding: 20px"
    v-else
  >
    <h1>Products In Cart :</h1>
    <v-row no-gutters>
      <v-col cols="12" sm="3" lg="4">
        <v-sheet
          :elevation="24"
          :height="450"
          :width="1160"
          border
          rounded
          v-for="item in store.cart"
          :key="item.id"
          style="margin-bottom: 8px; display: flex; padding: 4px"
        >
          <img :src="item.thumbnail" />
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
                item?.title
              }}</v-card-title>

              <v-card-subtitle>
                <span class="me-1">
                  {{ item?.category }}
                </span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <h2
                v-if="item?.discountPercentage"
                class="mt-6 text-subtitle-1"
                style="font-size: 20px; font-weight: bold"
              >
                $ {{ item?.discountPercentage }}
              </h2>

              <h2
                v-if="item?.discountPercentage"
                class="text-subtitle-1"
                style="text-decoration: line-through; color: gray"
              >
                $ {{ item?.price }}
              </h2>

              <span class="me-1">
                {{ item?.warrantyInformation }}
              </span>

              <div>
                <h2 style="margin-bottom: 6px; margin-top: 20px">About The Product :</h2>
                {{ item?.description }}
              </div>
            </v-card-text>

            <div style="display: flex; justify-content: space-evenly">
              <div style="display: flex; justify-content: center; align-items: center">
                <v-btn
                  height="52"
                  min-width="164"
                  @click="navi"
                  style="background-color: #339f33; color: wheat"
                  >Buy Now</v-btn
                >
              </div>
              <div
                @click="removeFromCart(item.id)"
                style="display: flex; justify-content: center; align-items: center"
              >
                <v-btn
                  height="52"
                  min-width="164"
                  @click="navi"
                  style="background-color: #b53636; color: wheat"
                  >Remove Product</v-btn
                >
              </div>
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
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
