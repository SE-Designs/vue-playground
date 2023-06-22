import { defineStore } from "pinia";
import { useMovieStore } from "./movieStore";

const url =
	"https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", {
	state: () => ({
		loader: false,
		movies: [],
	}),
	// assynchronous actions:
	actions: {
		async getMovies(searchQuery) {
			this.loader = true;
			const res = await fetch(url + searchQuery);
			const data = await res.json(res);

			this.movies = data.results;
			this.loader = false;
		},
		addFavourite(movie) {
			const movieStore = useMovieStore();

			movieStore.movies.push({ ...movie, isWatched: false });
			movieStore.activeTab = 1;
		},
	},
});
