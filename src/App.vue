<script setup>
import { RouterView, useRouter } from 'vue-router'
import { productsStore } from './stores/products'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCart } from '@mdi/js'
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const store = productsStore()
const router = useRouter()

const kai = () => {
  router.push({ name: 'HomePage' })
}
</script>

<template>
  <div id="iop">
    <header style="height: 60px">
      <v-app>
        <v-container>
          <v-app-bar :elevation="4">
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title
              style="font-size: x-large; font-weight: bold"
              @click="kai"
              class="cursor-pointer"
              >ZeuX</v-app-bar-title
            >
            <template v-slot:append>
              <v-btn icon="mdi-heart"></v-btn>
              <v-btn icon="mdi-magnify"></v-btn>
              <v-btn @click="toggleTheme">toggle theme</v-btn>
              <v-btn @click="router.push({ name: 'CartPage' })">
                <v-badge :content="store.cart.length" floating>
                  <SvgIcon type="mdi" :path="path"></SvgIcon>
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

    <footer class="sticky-footer" style="background-color: #2e303a">
      <div style="display: flex; justify-content: center">
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
      </div>

      <div class="pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
        interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed
        massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
        vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
        sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </div>

      <v-divider></v-divider>

      <div style="display: flex; justify-content: center">
        {{ new Date().getFullYear() }} — <strong>ZeuX</strong>
      </div>
    </footer>
  </div>
</template>

<script>
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

<style>
#iop {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* This ensures the app takes up at least the height of the viewport */
}

.sticky-footer {
  margin-top: auto; /* Pushes the footer to the bottom */
  padding: 20px; /* Adjust as needed */
  background-color: #3f51b5;
  color: white;
}
</style>

<!-- class="bg-indigo-lighten-1 text-center d-flex flex-column" -->
