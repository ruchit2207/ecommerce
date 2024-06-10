<template>
  <v-sheet
    :elevation="24"
    :height="360"
    :width="500"
    border
    rounded
    style="padding: 8px; margin-top: 100px"
  >
    <form @submit.prevent="submit">
      <h1 style="text-align: center">Register</h1>

      <v-text-field
        v-model="name.value"
        :counter="10"
        :error-messages="name.errorMessage"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="phone.value"
        :counter="10"
        :error-messages="phone.errorMessage"
        label="Phone Number"
      ></v-text-field>

      <v-text-field
        v-model="email.value"
        :error-messages="email.errorMessage"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password.value"
        :counter="10"
        :error-messages="password.errorMessage"
        label="Password"
        type="password"
      ></v-text-field>

      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </v-sheet>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    phone(value) {
      if (value?.length >= 9 && /^[0-9-]+$/.test(value)) return true
      return 'Phone number needs to be at least 9 digits and only contain numbers and hyphens.'
    },
    email(value) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (emailPattern.test(value)) return true
      return 'Must be a valid e-mail.'
    },
    password(value) {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (passwordPattern.test(value)) return true
      return 'Password must be at least 8 characters long and contain both letters and numbers.'
    }
  }
})

const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style scoped>
.v-sheet {
  padding: 8px;
  margin-top: 100px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.v-btn {
  margin-right: 10px;
}
</style>
