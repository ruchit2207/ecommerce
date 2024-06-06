<script setup>
import { RouterView, useRouter } from 'vue-router'
import { productsStore } from './stores/products'

const store = productsStore()

const router = useRouter()
</script>
<template>
  <header>
    <v-app style="width: 34px; height: 56px">
      <v-container>
        <v-app-bar :elevation="4">
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title style="font-size: x-large; font-weight: bold">ZeuX</v-app-bar-title>
          <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>

            <v-btn @click="router.push({ name: 'CartPage' })">
              <v-badge :content="store.cart.length" floating>
                <svg-icon type="mdi" :path="path"></svg-icon>
              </v-badge>
            </v-btn>

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-app-bar>
      </v-container>
    </v-app>
  </header>
  <main style="max-width: 1200px">
    <RouterView />
  </main>
  <footer class="text-center d-flex flex-column" style="background-color: darkgrey">
    <div>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
    </div>

    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
      interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa
      consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
      lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
      Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus.
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>ZueX</strong></div>
  </footer>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCart } from '@mdi/js'

export default {
  name: 'my-component',
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiCart,
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
    }
  }
}
</script>
<!-- <script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  })
}
</script> -->
