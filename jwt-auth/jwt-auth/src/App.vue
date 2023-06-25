<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Button from 'primevue/button'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <Button label="Home" />
      </RouterLink>
      <div class="btn-container">
        <RouterLink to="/signin">
          <Button label="Sign In" />
        </RouterLink>
        <RouterLink to="/signup">
          <Button label="Sign Up" />
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
