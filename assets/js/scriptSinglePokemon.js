//console.log(namePokemon);

async function getSinglePokemon() {
    const urlParams = new URLSearchParams(window.location.search);

    const namePokemon = urlParams.get("name");
    const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
    );
    const data = await resp.json();
    const textoEspecies = await fetch(data.species.url);
    const dataEspecies = await textoEspecies.json();
    {
        const sectionSinglePokemon = document.querySelector(".single-pokemon");
        const cardSinglePokemon = document.createElement("div");
        const nameSinglePokemon = document.createElement("h2");
        const imgSinglePokemon = document.createElement("img");
        const idSinglePokemon = document.createElement("h3");
        
        const singlePokemonDescription = document.createElement("span");

        nameSinglePokemon.innerText = data.name;
        idSinglePokemon.innerText = `ID: ${data.id}`;
        imgSinglePokemon.src = `${data.sprites.other.dream_world.front_default}`;
        singlePokemonDescription.innerText = `${dataEspecies.flavor_text_entries[9].flavor_text}`;
        nameSinglePokemon.classList.add("name-single-pokemon");

        cardSinglePokemon.appendChild(idSinglePokemon);
        cardSinglePokemon.appendChild(imgSinglePokemon);
        cardSinglePokemon.appendChild(nameSinglePokemon);
        cardSinglePokemon.appendChild(singlePokemonDescription);

        sectionSinglePokemon.appendChild(cardSinglePokemon);

        data.types.forEach((item) => {
            console.log(data.types);
            const typeSinglePokemon = document.createElement("span");
            typeSinglePokemon.classList.add("type-single-pokemon");
            typeSinglePokemon.innerText = item.type.name;
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
                if (tipo === typeSinglePokemon.textContent) {
                    typeSinglePokemon.classList.add(`type-${tipo}`);
                }
            });
            cardSinglePokemon.appendChild(typeSinglePokemon);
        });
    }
    //console.log(data);
}
getSinglePokemon();
