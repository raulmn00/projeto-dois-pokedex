async function getAllPokemons() {
    const resp = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );
    const data = await resp.json();
    //console.log(data);
    data.results.forEach(async function (item) {
        const respPoke = await fetch(item.url);
        const dataPoke = await respPoke.json();
        //console.log(dataPoke);

        let arrayTypes = [];
        for (let i = 0; i < dataPoke.types.length; i++) {
            arrayTypes.push(dataPoke.types[i].type.name);

            //console.log(dataPoke.types[i].type.name);
        }
        {
            const sectionAllPokemons = document.querySelector(".all-pokemons");
            const divCardPokemon = document.createElement("div");
            const ancoraPokemon = document.createElement("a");
            const divContainerImg = document.createElement("div");
            const imgPokemon = document.createElement("img");
            const namePokemon = document.createElement("h2");
            const idPokemon = document.createElement("h3");
            divCardPokemon.appendChild(idPokemon);

            divCardPokemon.appendChild(divContainerImg);
            divCardPokemon.appendChild(imgPokemon);
            divCardPokemon.appendChild(ancoraPokemon);
            ancoraPokemon.appendChild(namePokemon);

            namePokemon.classList.add("name-pokemon");
            ancoraPokemon.classList.add("link-pokemon");
            idPokemon.classList.add("id-pokemon");

            divCardPokemon.classList.add("card-pokemon");

            sectionAllPokemons.appendChild(divCardPokemon);

            namePokemon.innerText = dataPoke.name;
            idPokemon.innerText = `ID: ${dataPoke.id}`;
            ancoraPokemon.href = `./pokemon.html?name=${dataPoke.name}`;
            imgPokemon.src = `${dataPoke.sprites.other.dream_world.front_default}`;
            dataPoke.types.forEach((item) => {
                console.log(dataPoke.types);
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
                divCardPokemon.appendChild(typesPokemon);
            });
        }

        //console.log(dataEspecies.flavor_text_entries[0].flavor_text);
    });
}

getAllPokemons();
