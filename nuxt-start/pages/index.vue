<template>
  <div>
    <Title :title="title" />
    <nuxt-link to="/about">Go to About</nuxt-link>
    <h2>{{ $store.state.title }}</h2>
    <button @click="increment">Increment Me!</button>
    <h3>{{ $store.state.counter }}</h3>
  </div>
</template>

<script>
import Title from "~/components/Title.vue";
export default {
  name: "IndexPage",
  components: { Title },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
  },
  data() {
    return {
      title: "Homepage!",
    };
  },
};
</script>
