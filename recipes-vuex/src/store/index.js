import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "borscht",
        title: "Borscht",
        description:
          "Borscht is a hot, beetroot-based soup that gives it its characteristic red color.",
        ingredients: [
          "3 teaspoons extra virgin olive oil or vegetable oil, divided",
          "1 (1 1/4 pound) section bone-in beef shank",
          "1 large onion, chopped (about 1 1/2 cups)",
          "4 carrots (1 pound), peeled and chopped",
        ],
        method: [
          "Brown the beef, then cook the onions",
          "Add 4 cups broth and simmer until the beef is tender",
          "Meanwhile, prep and roast the root vegetables",
          "Remove the meat from the pot",
          "Skim the soup",
          "Finish cooking the soup",
        ],
      },
      {
        slug: "pilaf",
        title: "Pilaf (Plov)",
        description: "Pilaf is an oriental dish based on boiled rice.",
        ingredients: [
          "2 cups white rice, preferably long grain",
          "2 teaspoons extra virgin olive oil (or chicken fat)",
          "1/2 cup chopped green onions or yellow onion",
          "2 teaspoons kosher salt or seasoned salt",
          "Up to 4 cups chicken or vegetable stock",
        ],
        method: [
          "Heat the stock in a saucepan",
          "Brown the rice and add the onions and celery",
          "Add the salt, pepper, and cayenne",
          "Add the stock and cook the rice",
          "Fluff with a fork and stir in the parsley",
        ],
      },
    ],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
    },
  },
});
