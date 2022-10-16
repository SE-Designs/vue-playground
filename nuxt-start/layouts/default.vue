<template lang="en">
  <div>
    <header>
      <h1>Welcome to my site</h1>
      <nuxt-link to="/" class="link">Homepage</nuxt-link>
      <nuxt-link to="/about" class="link">About Page</nuxt-link>
    </header>
    <nuxt/>
  </div>
</template>
<script>
export default {
  name: "default",
};
</script>
