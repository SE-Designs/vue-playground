<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Loader from '../components/Loader.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref()
const password = ref()

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  router.push('/signin')
}
</script>

<template>
  <h2>Sign Up</h2>
  <h3>{{ authStore.error }}</h3>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <!-- <Loader v-if="authStore.loader" /> -->
    <div class="flex flex-column gap-3">
      <Button label="Signup" @click="signup" :loading="authStore.loader" />
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>
