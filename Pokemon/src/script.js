const pokeDex = document.querySelector('[data-name = pokedex]');
// 905

// We use page and index to say how many
const page = 5;
let index = 1;

// Colors for the different types
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

// We use this to return the color of the type name
const typeColor = Object.keys(colors);

// Function to fetch the pokemons from the api using ASYNC/AWAIT
async function fetchPokemon(index = 1) {

    // Loop through all the pokemons
    for (let id = index; id < index + page; id++) {

        // Store, Fetch and turn the response into JSON
        const url      = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const pokemon  = await response.json();

        // Function to create the pokemon card
        createPokemonCard(pokemon);
        console.log(pokemon);

    }
}

// Function to create the pokemon card
const createPokemonCard = (pokemon) => {

    // Storing the DOM elements we create in variable
    const pokeContainer = document.createElement('div');
    const pokeImg       = document.createElement('img');
    const pokeName      = document.createElement('span');
    const pokeId        = document.createElement('span');
    const pokeType      = document.createElement('span');


    // To get the right type we have to use array functions to get them
    const pokemonTypes = pokemon.types.map(type => type.type.name);
    const type = typeColor.find(type => pokemonTypes.indexOf(type) > -1);

    // Putting the data into the DOM elements
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    pokeName.innerText = pokemon.name;
    pokeId.innerText   = pokemon.id;
    pokeType.innerText = type;

    // Styling
    pokeContainer.classList.add('');
    pokeImg.classList.add('');
    pokeName.classList.add('');
    pokeId.classList.add('');
    pokeType.classList.add('');


    // Appending the card together before sending it to the HTML
    pokeContainer.appendChild(pokeImg);
    pokeContainer.appendChild(pokeName);
    pokeContainer.appendChild(pokeId);
    pokeContainer.appendChild(pokeType);

    pokeDex.appendChild(pokeContainer);

}


fetchPokemon(1);