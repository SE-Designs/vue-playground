<template>
  <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <div>
      <WordRow
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution"
        :submitted="i < state.guessIndex"
      />
    </div>
    <SimpleKeyboard
      @onKeyPress="handleInput"
      :guessedLetters="state.guessedLetters"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "@vue/runtime-core";
import SimpleKeyboard from "./components/SimpleKeyboard.vue";
import WordRow from "./components/WordRow.vue";

const state = reactive({
  solution: "books",
  guesses: ["", "", "", "", ""],
  guessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
});

const handleInput = (key) => {
  if (state.guessIndex > 5) {
    return;
  }

  const currentGuess = state.guesses[state.guessIndex];
  if (key == "{enter}") {
    // Send Guess:
    if (currentGuess.length == 5) {
      state.guessIndex++;

      for (let i = 0; i < currentGuess.length; i++) {
        let c = state.solution.charAt(i);

        // Found guessed letter:
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
          // Hint guessed letter:
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
          // Miss guessed letter:
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  } else if (key == "{bksp}") {
    // Remove last letter:
    state.guesses[state.guessIndex] = currentGuess.slice(0, -1);
  } else if (currentGuess.length < 5 && key.length == 1) {
    // Add letter:
    const alphaRegex = /[a-zA-Z]/;
    if (alphaRegex.test(key)) {
      state.guesses[state.guessIndex] += key;
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    // e.preventDefault();
    let key =
      e.key == "Enter" || e.keyCode == 13
        ? "{enter}"
        : e.key == "Backspace" || e.keyCode == 8
        ? "{bksp}"
        : e.key.toLowerCase();

    handleInput(key);
  });
});
</script>
