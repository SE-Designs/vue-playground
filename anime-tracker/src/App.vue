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

          <button @click="addAnime(anime)" class="button">
            Add to my list
          </button>
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
            class="button button-green"
          >
            +
          </button>
          <button
            v-if="anime.watched > 0"
            @click="decreaseWatch(anime)"
            class="button button-red"
          >
            -
          </button>
          <button @click="removeAnime(anime.id)" class="button">Remove</button>
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
  font-family: "Fira Sans", sans-serif;
}
body {
  background-color: #eee;
}
main {
  margin: 0 auto;
  max-width: 768px;
  padding: 1.5rem;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}
form {
  display: flex;
  max-width: 480px;
  margin: 0 auto 1.5rem;
}
form input {
  appearance: none;
  outline: none;
  border: none;
  background: white;
  display: block;
  color: #888;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  width: 100%;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, deeppink 50%, darkviolet 50%);
  background-size: 200%;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.4s;
}

.button:hover {
  background-position: right;
}

.results {
  background-color: #fff;
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
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.4s;
}

.result img {
  width: 100px;
  border-radius: 1rem;
  margin-right: 1rem;
}

.details {
  flex: 1 1 0%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.details p {
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.details .button {
  margin-left: auto;
}

.flex-1 {
  display: block;
  flex: 1 1 0%;
}

h2 {
  text-align: center;
  color: #111;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.myAnime h4 {
  text-align: center;
  color: #888;
}

.myAnime .anime {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.anime img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 1rem;
  margin-right: 1rem;
}

.anime h3 {
  max-width: 240px;
  color: #888;
  font-size: 1.125rem;
}

.anime .episodes {
  margin-right: 1rem;
  color: #888;
  font-weight: 700;
  font-size: 1.25rem;
}

.anime .button:first-of-type {
  margin-right: 0.5rem;
}

.anime .button:last-of-type {
  margin-right: 0;
}

.btn-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-self: center;
  gap: 0.5rem;
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
