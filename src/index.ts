const displayDiv = document.querySelector("#pokemonDisplay");
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
  for (let i = 1; i <= 153; i++) {
    const pokemon = await getPokemon(i);
    renderPokemonCard(pokemon);
  }
};

const renderPokemonDisplay = (pokemonInfo: Pokemon): void => {
  const mainType = pokemonInfo.types[pokemonInfo.types.length - 1];

  const pokemonHTML = `
    <div class="display__pokemon-properties type--${mainType}">
      <div class="display__pokemon-info">
        <h3 class="display__pokemon-info__number">
          ${pokemonInfo.number.toString().padStart(3, "0")}
        </h3>
        <h1 class="display__pokemon-info__name">
          ${pokemonInfo.name.charAt(0).toUpperCase}
        </h1>
        <div class="display__pokemon-info__tags">
          ${pokemonInfo.types.map((type) => {
            return `
              <div class="display__pokemon-info__tags__item">${type}</div>
            `;
          })}
        </div>
        <div class="display__pokemon-info__basics">
          <div class="display__pokemon-info__basics__item">
            <b>Height: </b>${pokemonInfo.height / 10}m
          </div>
          <div class="display__pokemon-info__basics__item">
            <b>Weight: </b>${pokemonInfo.weight / 10}kg
          </div>
        </div>
      </div>
      <div class="display__pokemon-stats">
        <h3 class="display__pokemon-stats__title">Base stats</h3>
        <span><b>HP: </b>100</span>
        <span><b>Attack: </b>100</span>
        <span><b>Defense: </b>100</span>
        <span><b>SP. Attack: </b>100</span>
        <span><b>SP. Defense: </b>100</span>
      </div>
    </div>
    <div class="display__pokemon-image-wrapper">
      <img
        src="${pokemonInfo.image}"
        alt="${pokemonInfo.name} image"
        class="display__pokemon-image-wrapper__image"
      />
    </div>
  `;

  if (displayDiv) {
    displayDiv.innerHTML = pokemonHTML;
  }
};

const renderPokemonCard = (pokemonInfo: Pokemon): void => {
  const mainType = pokemonInfo.types[pokemonInfo.types.length - 1];

  const pokemonHTML = `
    <div 
      class="pokemon-card" 
      onclick="${() => store.dispatch(renderPokemonDisplay(pokemonInfo))}"
    >
      <div
        class="pokemon-card__image-wrapper type--${mainType}"
      >
        <div class="pokemon-card__image">
          <img
            src="${pokemonInfo.image}"
            alt="${pokemonInfo.name} image"
          />
        </div>
      </div>
      <div class="pokemon-card__content">
        <div class="pokemon-card__number">
          #${pokemonInfo.number.toString().padStart(3, "0")}
        </div>
        <div class="pokemon-card__name">
          ${pokemonInfo.name}
        </div>
        <span class="pokemon-card__tag type--${mainType}">
          ${pokemonInfo.types[pokemonInfo.types.length - 1]}
        </span>
      </div>
    </div>
  `;

  if (cardsDiv) {
    cardsDiv.innerHTML += pokemonHTML;
  }
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
