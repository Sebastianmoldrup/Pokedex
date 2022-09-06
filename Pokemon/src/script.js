const pokeDex = document.querySelector('[data-name = pokedex]');
const pagination = document.querySelector('[data-name = pagination]');
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
async function fetchPokemon(index) {

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

fetchPokemon(1)

// Function to create the pokemon card
const createPokemonCard = (pokemon) => {

    // Storing the DOM elements we create in variable
    const pokeContainer = document.createElement('div');
    const pokeImg       = document.createElement('img');
    const pokeName      = document.createElement('div');
    const pokeId        = document.createElement('div');
    const pokeType      = document.createElement('div');


    // To get the right type we have to use array functions to get them
    const pokemonTypes = pokemon.types.map(type => type.type.name);
    const type = typeColor.find(type => pokemonTypes.indexOf(type) > -1);

    // Adding the correct background color to match the type
    const color = colors[type];
    pokeContainer.style.backgroundColor = color;

    // Putting the data into the DOM elements
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    pokeName.innerText = pokemon.name;
    pokeId.innerText   = "#" + pokemon.id;
    pokeType.innerText = type;

    // Styling with tailwind css classes
    pokeContainer.classList.add("grid", "grid-col", "justify-center", "mt-10");
    pokeImg.classList.add("grid", "justify-center");
    pokeName.classList.add("text-center", "font-bold", "text-2xl", "capitalize");
    pokeId.classList.add("text-center", "bg-black", "p-1");
    pokeType.classList.add("text-center", "font-semibold", "text-1xl", "capitalize");


    // Appending the card together before sending it to the HTML
    pokeContainer.appendChild(pokeImg);
    pokeContainer.appendChild(pokeId);
    pokeContainer.appendChild(pokeName);
    pokeContainer.appendChild(pokeType);

    pokeDex.appendChild(pokeContainer);

}

(prevPage = () => {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.classList.add("font-semibold");

    prevButton.addEventListener("click", () => {
        if(index === 1) return;
        pokeDex.innerHTML = '';
        fetchPokemon(index = index - 5);
    });

    pagination.appendChild(prevButton);
    
})();

(nextPage = () => {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.classList.add("font-semibold");

    nextButton.addEventListener("click", () => {
        if(index === 900) return;
        pokeDex.innerHTML = '';
        fetchPokemon(index = index + 5);
    });

    pagination.appendChild(nextButton);
    
})();

pagination.classList.add("flex", "flex-row", "justify-between", "mt-10")

