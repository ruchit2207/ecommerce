<template>
  <v-container
    class="bg-surface-variant"
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
        width="400"
        style="object-fit: cover; margin-bottom: 20px"
      />
      <v-hover v-slot="{ isHovering, props }" open-delay="200">
        <v-btn
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2"
          v-bind="props"
          color="deep-purple"
          text="Add To Cart"
          block
          border
          v-on:click="handleAddToCart"
          style="margin-bottom: 20px"
          >Add to Cart</v-btn
        >

        <v-btn
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2"
          v-bind="props"
          text="Add To Cart"
          block
          border
          v-on:click="handleAddToCart"
          style="margin-top: 8px"
          >Go Back To Home Page</v-btn
        >
      </v-hover>
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

        <h2
          v-if="selectedProduct?.discountPercentage"
          class="mt-6 text-subtitle-1"
          style="font-size: 20px; font-weight: bold"
        >
          $ {{ selectedProduct?.discountPercentage }}
        </h2>

        <h2
          v-if="selectedProduct?.discountPercentage"
          class="text-subtitle-1"
          style="text-decoration: line-through; color: gray"
        >
          $ {{ selectedProduct?.price }}
        </h2>

        <span class="me-1">
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
              style="background-color: black; color: white; margin-bottom: 2px"
            ></v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-text>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
const store = productsStore()

const route = useRoute()

const router = useRouter()

let panel = ref([])

const selectedProduct = computed(() => {
  return store.allProducts.find((item) => item.id === Number(route.params.id))
})

if (selectedProduct.value) {
  panel.value = selectedProduct.value?.reviews
  console.log(panel.value)
}
const handleAddToCart = () => {
  store.addToCart(selectedProduct.value)
  router.push({ name: 'CartPage' })
}

console.log('selected product = ', selectedProduct.value)
</script>

<style lang="scss" scoped></style>

<!-- <script>
export default {
  data() {
    return {
      panel: [],
      reviews : []
    }
  },
  methods: {
    all() {
      this.panel = this.reviews
    },
    none() {
      this.panel = []
    }
  }
}
</script> -->
