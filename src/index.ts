const cardsDiv = document.querySelector("#pokemonCardsContainer");

interface Pokemon {
  number: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  types: string[];
  stats: { stat: string; value: number }[];
}

const populatePokemonCards = async (): Promise<void> => {
  let pokemonCards = "";

  for (let i = 1; i <= 153; i++) {
    const pokemon = await getPokemon(i);
    pokemonCards += createPokemonCard(pokemon);
  }

  if (cardsDiv) {
    cardsDiv.innerHTML = pokemonCards;
  }
};

const createPokemonCard = (pokemonInfo: Pokemon): string => {
  const mainType = pokemonInfo.types[pokemonInfo.types.length - 1];
  const pokemonName = `${pokemonInfo.name
    .charAt(0)
    .toUpperCase()}${pokemonInfo.name.slice(1)}`;

  const pokemonHTML = `
    <div class="pokemon-card" id="${pokemonName}">
      <div class="pokemon-card__image-wrapper type--${mainType}">
        <div class="pokemon-card__image">
          <img
            src="${pokemonInfo.image}"
            alt="${pokemonName} image"
          />
        </div>
      </div>
      <div class="pokemon-card__content">
        <div class="pokemon-card__number">
          #${pokemonInfo.number.toString().padStart(3, "0")}
        </div>
        <div class="pokemon-card__name">
          ${pokemonName}
        </div>
        <span class="pokemon-card__tag type--${mainType}">
          ${pokemonInfo.types[pokemonInfo.types.length - 1]}
        </span>
      </div>
    </div>
  `;

  return pokemonHTML;
};

const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  const pokemonList: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  const pokemonListJson = await pokemonList.json();
  return createPokemon(pokemonListJson);
};

const createPokemon = (pokemonJson: any): Pokemon => {
  const stats = pokemonJson.stats.map(
    (stat: { base_stat: number; stat: { name: string } }) => {
      return { [stat.stat.name]: stat.base_stat };
    }
  );

  const types = pokemonJson.types.map(
    (pokemonType: { type: { name: string } }) => {
      return pokemonType.type.name;
    }
  );

  return {
    number: pokemonJson.id,
    name: pokemonJson.name,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    image: pokemonJson.sprites.front_default,
    types,
    stats,
  };
};

populatePokemonCards();
