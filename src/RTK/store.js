import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer, favoriteReducer } from "./pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    favorite: favoriteReducer,
  },
});

export default store;
