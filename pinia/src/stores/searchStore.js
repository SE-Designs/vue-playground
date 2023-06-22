import { defineStore } from "pinia";
import { ref } from "vue";
import { useMovieStore } from "./movieStore";

const url =
	"https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

// export const useSearchStore = defineStore("searchStore", {
// 	state: () => ({
// 		loader: false,
// 		movies: [],
// 	}),
// 	actions: {
// 		// assynchronous actions:
// 		async getMovies(searchQuery) {
// 			this.loader = true;
// 			const res = await fetch(url + searchQuery);
// 			const data = await res.json();

// 			this.movies = data.results;
// 			this.loader = false;
// 		},
// 		// using different store inside this store
// 		addFavourite(movie) {
// 			const movieStore = useMovieStore();

// 			movieStore.movies.push({ ...movie, isWatched: false });
// 			movieStore.activeTab = 1;
// 		},
// 	},
// });

export const useSearchStore = defineStore("searchstore", () => {
	const loader = ref("");
	const movies = ref("");

	const getMovies = async (searchQuery) => {
		loader.value = true;
		const res = await fetch(url + searchQuery);
		const data = await res.json();

		movies.value = data.results;
		loader.value = false;
	};

	const addFavourite = (movie) => {
		const movieStore = useMovieStore();

		movieStore.movies.push({ ...movie, isWatched: false });
		movieStore.activeTab = 1;
	};

	return {
		loader,
		movies,
		getMovies,
		addFavourite,
	};
});
