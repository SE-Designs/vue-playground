<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

const keyboard = ref(null);
const emit = defineEmits(["onKeyPress"]);
const onKeyPress = (button) => {
  emit("onKeyPress", button);
};

const props = defineProps({
  guessedLetters: Object,
});

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m {enter} {bksp}",
      ],
    },
    onKeyPress: onKeyPress,
  });
});

watch(
  () => props.guessedLetters,
  (guessedLetters, prevGuessedLetters) => {
    keyboard.value.addButtonTheme(guessedLetters.found.join(" "), "found");

    keyboard.value.addButtonTheme(guessedLetters.hint.join(" "), "hint");

    keyboard.value.addButtonTheme(guessedLetters.miss.join(" "), "miss");
  },
  {
    deep: true,
  }
);
</script>

<style>
.found {
  @apply bg-green-600 !important;
  @apply text-white;
}

.hint:not(.found) {
  @apply bg-yellow-500 !important;
  @apply text-white;
}

.miss {
  @apply bg-gray-500 !important;
  @apply text-white;
}
</style>
