/* script.js */
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite");
const pokemonCard = document.getElementById("pokemon-card");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchPokemon(searchTerm);
});

async function searchPokemon(searchTerm) {
  const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 404) {
        alert("Pokémon not found");
      } else {
        alert("Errore nella ricerca del Pokémon");
      }
      pokemonCard.style.display = "none";
      return;
    }

    const data = await response.json();
    displayPokemonData(data);
    pokemonCard.style.display = "block";
  } catch (error) {
    console.error("Errore durante la fetch:", error);
    alert("Errore durante la ricerca del Pokémon");
    pokemonCard.style.display = "none";
  }
}

function displayPokemonData(data) {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = data.weight;
  height.textContent = data.height;
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
  sprite.src = data.sprites.front_default;
  sprite.alt = `Sprite di ${data.name}`;

  types.innerHTML = "";

  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    types.appendChild(typeElement);
    if (data.types.indexOf(typeInfo) < data.types.length - 1) {
      types.innerHTML += ", ";
    }
  });
}
