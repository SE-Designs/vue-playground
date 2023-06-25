<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import Button from 'primevue/button'
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))

  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}

const logout = () => {
  localStorage.removeItem('userTokens')
  authStore.logout()

  router.push('/signin')
}

const token = computed(() => authStore.userInfo.token)
checkUser()
</script>

<template>
  <header>
    <nav>
      <div class="btn-container">
        <RouterLink to="/">
          <Button label="Home" />
        </RouterLink>
        <RouterLink to="/cars">
          <Button label="Cars" />
        </RouterLink>
      </div>
      <div class="btn-container" v-if="!token">
        <RouterLink to="/signin">
          <Button label="Sign In" />
        </RouterLink>
        <RouterLink to="/signup">
          <Button label="Sign Up" />
        </RouterLink>
      </div>
      <div class="btn-container" v-else>
        <RouterLink to="/signin" @click.prevent="logout">
          <Button label="Logout" />
        </RouterLink>
      </div>
    </nav>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

header {
  width: 100vw;
  height: 60px;
  margin-bottom: 20px;

  background-color: black;
}

nav {
  height: 100%;
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.btn-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 20px;
}

.container {
  padding-top: 40px;
  max-width: 720px;
  margin: auto;
  font-family: sans-serif;
}
</style>
