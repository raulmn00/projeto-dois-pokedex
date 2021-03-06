let limit = 100;
let offset = 0;
async function getAllPokemons() {
    const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await resp.json();
    //console.log(data);

    data.results.forEach(async function (item) {
        const respPoke = await fetch(item.url);
        const dataPoke = await respPoke.json();
        //console.log(dataPoke);
        {
            const sectionAllPokemons = document.querySelector(".all-pokemons");
            const divCardPokemon = document.createElement("div");
            const ancoraPokemon = document.createElement("a");
            const divContainerImg = document.createElement("div");
            const imgPokemon = document.createElement("img");
            const namePokemon = document.createElement("h2");
            const idPokemon = document.createElement("h3");
            const containerSpanType = document.createElement("div");

            divCardPokemon.appendChild(idPokemon);
            divCardPokemon.appendChild(divContainerImg);
            divCardPokemon.appendChild(imgPokemon);
            ancoraPokemon.appendChild(imgPokemon);
            ancoraPokemon.appendChild(namePokemon);
            divCardPokemon.appendChild(ancoraPokemon);
            divCardPokemon.appendChild(containerSpanType);
            sectionAllPokemons.appendChild(divCardPokemon);

            namePokemon.classList.add("name-pokemon");
            ancoraPokemon.classList.add("link-pokemon");
            idPokemon.classList.add("id-pokemon");
            divCardPokemon.classList.add("card-pokemon");
            containerSpanType.classList.add("container-span-type");

            namePokemon.innerText = dataPoke.name;
            idPokemon.innerText = `ID: ${dataPoke.id}`;
            ancoraPokemon.href = `./pokemon.html?name=${dataPoke.name}`;
            ancoraPokemon.target = "blank";
            imgPokemon.src = `${dataPoke.sprites.other["official-artwork"].front_default}`;
            dataPoke.types.forEach((item) => {
                //console.log(dataPoke.types);
                const typesPokemon = document.createElement("span");
                typesPokemon.classList.add("type-pokemon");
                typesPokemon.innerText = item.type.name;
                const types = [
                    "normal",
                    "fire",
                    "fighting",
                    "water",
                    "flying",
                    "grass",
                    "poison",
                    "electric",
                    "ground",
                    "psychic",
                    "rock",
                    "ice",
                    "bug",
                    "dragon",
                    "ghost",
                    "dark",
                    "steel",
                    "fairy",
                ];
                types.forEach((tipo) => {
                    if (tipo === typesPokemon.textContent) {
                        typesPokemon.classList.add(`type-${tipo}`);
                    }
                });
                containerSpanType.appendChild(typesPokemon);
            });
        }

        //console.log(dataEspecies.flavor_text_entries[0].flavor_text);
    });
}
getAllPokemons();

const inputSearch = document.querySelector("#search-input");
inputSearch.addEventListener("keyup", function () {
    if (inputSearch.value === "") {
        sectionAllPokemons.style.display = "flex";
    }
});
const sectionAllPokemons = document.querySelector(".all-pokemons");

const buttonSearch = document.querySelector("#search");
buttonSearch.addEventListener("click", function () {
    searchPokemon(inputSearch.value);
});

async function searchPokemon(id) {
    sectionAllPokemons.style.display = "none";
    const idSearchPokemon = document.querySelector(".id-search-pokemon");
    const ancoraSearchPokemon = document.querySelector(".link-search-pokemon");
    const nameSearchPokemon = document.querySelector(".name-search-pokemon");
    const imgSearchPokemon = document.querySelector(".img-search-pokemon");

    const respSearchPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const dataSearchPokemon = await respSearchPokemon.json();

    idSearchPokemon.innerText = `ID: ${dataSearchPokemon.id}`;
    nameSearchPokemon.innerText = dataSearchPokemon.name;
    ancoraSearchPokemon.href = `./pokemon.html?name=${dataSearchPokemon.name}`;
    imgSearchPokemon.src = `${dataSearchPokemon.sprites.other["official-artwork"].front_default}`;

    console.log(dataSearchPokemon);
}

function getMorePokemon() {
    offset += 100;
    getAllPokemons();
}

const btnMore = document.querySelector(".btn-more");
btnMore.addEventListener("click", function () {
    getMorePokemon();
});
