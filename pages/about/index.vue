<template lang="en">
  <div>
    <Title :title="title" />
    <nuxt-link to="/">Go to Home</nuxt-link>
    <img src="/favicon.ico" alt="">
  </div>
</template>
<script>
export default {
  name: "About",
  layout: "auth",
  data() {
    return {
      title: "Its about page!",
    };
  },
};
</script>
<style lang=""></style>
