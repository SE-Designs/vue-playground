<template>
  <div class="grid max-w-xs grid-cols-5 gap-2 mx-auto mb-2">
    <LetterBox v-for="i in 5" :key="i" :letter="value[i - 1]" />
  </div>
</template>

<script setup>
import LetterBox from "./LetterBox.vue";
const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean,
});
</script>

<style></style>
