const initialState = {
  number: 6,
  name: "Charizard",
  height: "1.7m",
  weight: "90.5kg",
  types: ["flying, fire"],
  stats: [
    { hp: 100 },
    { attack: 100 },
    { defense: 100 },
    { spAttack: 100 },
    { spDefense: 100 },
  ],
};

const updatePokemon = (pokemon) => pokemon;

const pokemonSlice = RTK.createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    updatePokemon,
  },
});

const { updatePokemon } = pokemonSlice.actions;

const store = RTK.configureStore({
  reducer: pokemonSlice.reducer,
});

export default store;
