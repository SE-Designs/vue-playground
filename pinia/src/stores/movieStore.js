import { computed, ref, watch } from "vue";

import { defineStore } from "pinia";

// Options API store:
// export const useMovieStore = defineStore("movieStore", {
// 	// state - variables:
// 	state: () => ({
// 		movies: [
// 			{
// 				id: 1,
// 				original_title: "Spider-Man",
// 				overview:
// 					"After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
// 				poster_path: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
// 				release_date: "2002-05-01",
// 				isWatched: false,
// 			},
// 			{
// 				id: 2,
// 				original_title: "The Batman",
// 				overview:
// 					"In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
// 				poster_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
// 				release_date: "2022-03-01",
// 				isWatched: true,
// 			},
// 		],
// 		activeTab: 2,
// 	}),
// 	// getters - for filtering and showing:
// 	getters: {
// 		watchedMovies() {
// 			return this.movies.filter((el) => el.isWatched);
// 		},
// 		totalWatchedMovies() {
// 			return this.movies.filter((el) => el.isWatched).length;
// 		},
// 		totalMovies() {
// 			return this.movies.length;
// 		},
// 	},
// 	// to change the state
// 	// synchronous actions:
// 	actions: {
// 		setActiveTab(id) {
// 			this.activeTab = id;
// 		},
// 		toggleWatch(id) {
// 			const idx = this.movies.findIndex((el) => el.id === id);
// 			this.movies[idx].isWatched = !this.movies[idx].isWatched;
// 		},
// 		deleteMovie(id) {
// 			this.movies = this.movies.filter((el) => el.id !== id);
// 		},
// 	},
// });

export const useMovieStore = defineStore("moviestore", () => {
	const movies = ref([]);
	const activeTab = ref(1);
	const moviesLocal = localStorage.getItem("movies");

	if (moviesLocal) {
		movies.value = JSON.parse(moviesLocal)._value;
	}

	const watchedMovies = computed(() =>
		movies.value.filter((el) => el.isWatched)
	);

	const totalWatchedMovies = computed(
		() => movies.value.filter((el) => el.isWatched).length
	);

	const totalMovies = computed(() => movies.value.length);

	const setActiveTab = (id) => {
		activeTab.value = id;
	};

	const toggleWatch = (id) => {
		const idx = movies.value.findIndex((el) => el.id === id);
		movies.value[idx].isWatched = !movies.value[idx].isWatched;
	};

	const deleteMovie = (id) => {
		movies.value = movies.value.filter((el) => el.id !== id);
	};

	watch(
		() => movies,
		(state) => {
			localStorage.setItem("movies", JSON.stringify(state));
		},
		{ deep: true }
	);

	return {
		movies,
		activeTab,
		watchedMovies,
		totalWatchedMovies,
		totalMovies,
		setActiveTab,
		toggleWatch,
		deleteMovie,
	};
});
