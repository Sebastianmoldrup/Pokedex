const pokeDex = document.querySelector('[data-name = pokedex]');
const pagination = document.querySelector('[data-name = pagination]');
// 905

// We use page and index to say how many
const pokemonDisplay = 5;
let index = 1;
let page = 1;

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
    for (let id = index; id < index + pokemonDisplay; id++) {

        // Store, Fetch and turn the response into JSON
        const url      = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const pokemon  = await response.json();

        // Function to create the pokemon card
        createPokemonCard(pokemon);
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
    pokeContainer.classList.add("grid", "grid-col", "place-items-center", "mt-10", "p-5", "w-48", "rounded-md", "shadow-lg", "shadow-black");
    pokeImg.classList.add("grid", "grid-col", "justify-center");
    pokeName.classList.add("text-center", "font-bold", "text-2xl", "capitalize");
    pokeId.classList.add("text-center", "bg-", "opacity-75", "p-1");
    pokeType.classList.add("text-center", "text-1xl", "capitalize");

    // Appending the card together
    pokeContainer.appendChild(pokeImg);
    pokeContainer.appendChild(pokeId);
    pokeContainer.appendChild(pokeName);
    pokeContainer.appendChild(pokeType);

    // Appending the card to HTML
    pokeDex.appendChild(pokeContainer);

}

// Previous page/pokemon function
(prevPage = () => {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.classList.add("font-semibold", "bg-red-500", "p-2", "text-white", "w-32", "rounded-xl", "hover:bg-white", "hover:text-red-500", "shadow-lg", "shadow-red-500");

    prevButton.addEventListener("click", () => {
        if(index === 1) return;
        pokeDex.innerHTML = '';
        fetchPokemon(index = index - 5);

        if(page === 1) return;
        page = page - 1;
        document.querySelector('[data = page]').innerText = page;
    });

    pagination.appendChild(prevButton);
    
})();

(pageNumber = () => {
    const displayPage = document.createElement('span');
    displayPage.setAttribute("data", "page");
    displayPage.innerText = page;

    pagination.appendChild(displayPage);
})();


// Next page/pokemon function
(nextPage = () => {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.classList.add("font-semibold", "bg-red-500", "p-2", "text-white", "w-32", "rounded-xl", "hover:bg-white", "hover:text-red-500", "shadow-lg", "shadow-red-500");

    nextButton.addEventListener("click", () => {
        if(index === 900) return;
        pokeDex.innerHTML = '';
        fetchPokemon(index = index + 5);

        if(page === 181) return;
        page = page + 1;
        document.querySelector('[data = page]').innerText = page;
    });

    pagination.appendChild(nextButton);

})();