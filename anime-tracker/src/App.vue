<script setup>
import { ref, computed, onMounted } from "vue";

const query = ref("");
const myAnimeList = ref([]);
const searchResults = ref([]);
const searching = ref(false);

const myAnimeASC = computed(() => {
  return myAnimeList.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
});

const searchAnime = () => {
  const URL = `https://api.jikan.moe/v4/anime?q=${query.value}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      searchResults.value = res.data;
      searching.value = true;
    });
};

const handleInput = (e) => {
  searching.value = false;
  if (!e.target.value) {
    searchResults.value = [];
  }
};

const addAnime = (anime) => {
  // searchResults.value = [];
  // query.value = "";

  myAnimeList.value.push({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    episodes: anime.episodes,
    watched: 0,
  });

  localStorage.setItem("myAnimeList", JSON.stringify(myAnimeList.value));
};

const increaseWatch = (anime) => {
  anime.watched++;
  localStorage.setItem("myAnimeList", JSON.stringify(myAnimeList.value));
};

const decreaseWatch = (anime) => {
  anime.watched--;
  localStorage.setItem("myAnimeList", JSON.stringify(myAnimeList.value));
};

const removeAnime = (anime) => {
  const mappedIds = myAnimeList.value.map((el) => el.id);
  const index = mappedIds.indexOf(anime);

  if (index !== -1) {
    myAnimeList.value.splice(index, 1);
  }

  localStorage.setItem("myAnimeList", JSON.stringify(myAnimeList.value));
};

onMounted(() => {
  myAnimeList.value = JSON.parse(localStorage.getItem("myAnimeList")) || [];
});
</script>

<template>
  <main>
    <h1>My Anime Tracker</h1>

    <form class="form-input" @submit.prevent="searchAnime">
      <input
        v-model="query"
        @input="handleInput"
        type="text"
        placeholder="Search..."
      />

      <button type="submit" class="button">Search</button>
    </form>

    <div class="results" v-if="searchResults.length > 0">
      <div class="result" v-for="anime in searchResults">
        <img
          :src="anime.images.jpg.image_url"
          alt="anime.title"
          loading="lazy"
        />
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">
            {{ anime.synopsis.slice(0, 120) }}...
          </p>
          <span class="flex-1"></span>
          <div class="btn-container">
            <button @click="addAnime(anime)">Add to my list</button>
          </div>
        </div>
      </div>
    </div>
    <h2
      v-else-if="searchResults.length === 0 && query.length !== 0 && searching"
    >
      No results found
    </h2>
    <hr />
    <div class="myAnime">
      <h2>My Anime</h2>
      <h4 v-if="myAnimeList.length === 0">This list is empty now, fill it!</h4>

      <div v-for="anime in myAnimeASC" class="anime">
        <img :src="anime.image" />
        <h3>{{ anime.title }}</h3>
        <div class="flex-1"></div>
        <span class="episodes">
          {{ anime.watched }} / {{ anime.episodes }}
        </span>
        <div class="btn-container">
          <button
            v-if="anime.watched !== anime.episodes"
            @click="increaseWatch(anime)"
            class="button-green"
          >
            +
          </button>
          <button
            v-if="anime.watched > 0"
            @click="decreaseWatch(anime)"
            class="button-red"
          >
            -
          </button>
          <button @click="removeAnime(anime.id)">Remove</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

main {
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;
}

.results,
.myAnime {
  background-color: rgba(255, 255, 255, 0.17);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 480px;
  overflow-y: scroll;
  margin-bottom: 1.5rem;
}
.result {
  display: flex;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #888;
  border-radius: 5px;
  transition: 0.4s;
}
.result img {
  width: 100px;
  border-radius: 1rem;
  margin-right: 1rem;
}

.btn-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin: 10px 0 30px;
}

button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  appearance: none;
  outline: none;
  border: none;
  font-size: 1rem;
  transition: all 0.4s;
  font-weight: 700;
}

input {
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-right: 0;
}

input:focus {
  outline: none;
  border: 2px solid #646cff;
  border-right: 0;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

h2 {
  text-align: center;
  margin: 0.5rem 0;
}

h3 {
  text-align: left;
  margin: 10px 0;
}

form {
  display: flex;
  max-width: 480px;
  margin: 0 auto 1.5rem;
}

.form-input {
  appearance: none;
  outline: none;
  border: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  width: 100%;
}

.button {
  cursor: pointer;
  appearance: none;
  outline: none;
  border: none;
  background-color: #646cff;
  display: block;
  padding: 0.5rem 1rem;
}

.button-green {
  color: #fff;
  background-color: #00c853;
}

.button-red {
  background-color: #f56c6c;
  color: #fff;
}
</style>
