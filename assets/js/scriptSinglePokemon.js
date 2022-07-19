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
        cardSinglePokemon.classList.add("card-single-pokemon");
        const nameSinglePokemon = document.createElement("h2");
        const imgSinglePokemon = document.createElement("img");
        imgSinglePokemon.classList.add("img-single-pokemon");
        const idSinglePokemon = document.createElement("h3");
        const singlePokemonDescription = document.createElement("span");
        singlePokemonDescription.classList.add("single-pokemon-description");
        const containerTypesSinglePokemon = document.createElement("div");
        containerTypesSinglePokemon.classList.add(
            "container-types-single-pokemon"
        );

        nameSinglePokemon.innerText = data.name;
        idSinglePokemon.innerText = `ID: ${data.id}`;
        imgSinglePokemon.src = `${data.sprites.other.dream_world.front_default}`;
        singlePokemonDescription.innerText = `${dataEspecies.flavor_text_entries[9].flavor_text}`;
        nameSinglePokemon.classList.add("name-single-pokemon");

        cardSinglePokemon.appendChild(idSinglePokemon);
        cardSinglePokemon.appendChild(imgSinglePokemon);
        cardSinglePokemon.appendChild(nameSinglePokemon);
        cardSinglePokemon.appendChild(singlePokemonDescription);
        cardSinglePokemon.appendChild(containerTypesSinglePokemon);

        sectionSinglePokemon.appendChild(cardSinglePokemon);

        data.types.forEach((item) => {
            //console.log(data.types);
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
            containerTypesSinglePokemon.appendChild(typeSinglePokemon);
        });
    }

    const evolutionChainUrl = dataEspecies.evolution_chain.url;
    const textEvolutionChain = await fetch(evolutionChainUrl);
    const dataEvolutionChain = await textEvolutionChain.json();

    let textThirdEvolution = "";

    let textFirstEvolution = dataEvolutionChain.chain.species.name;
    let textSecondEvolution =
        dataEvolutionChain.chain.evolves_to[0].species.name;
    if (dataEvolutionChain.chain.evolves_to[0].evolves_to[0] === undefined) {
        textThirdEvolution = "";
    } else {
        textThirdEvolution =
            dataEvolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
    }
    //console.log(dataEvolutionChain.chain.evolves_to[0].evolves_to[0])
    //console.log(textFirstEvolution);
    //console.log(textSecondEvolution);
    //console.log(textThirdEvolution);

    const sectionEvolutionChain = document.querySelector(".evolution-chain");

    const cardFirstEvolution = document.createElement("div");
    cardFirstEvolution.classList.add("card-evolution");
    const idFirstEvolution = document.createElement("span");
    const imageFirstEvolution = document.createElement("img");
    imageFirstEvolution.classList.add("img-evolution");
    const titleFirstEvolution = document.createElement("span");
    titleFirstEvolution.classList.add("title-first-evolution");
    const containerTypesFirstEvolution = document.createElement("div");
    const ancoraFirstPokemon = document.createElement("a");
    ancoraFirstPokemon.classList.add("ancora-first-pokemon");
    containerTypesFirstEvolution.classList.add(
        "container-types-first-evolution"
    );

    cardFirstEvolution.appendChild(idFirstEvolution);
    ancoraFirstPokemon.appendChild(imageFirstEvolution);
    ancoraFirstPokemon.appendChild(titleFirstEvolution);
    cardFirstEvolution.appendChild(ancoraFirstPokemon);
    cardFirstEvolution.appendChild(containerTypesFirstEvolution);
    
    sectionEvolutionChain.appendChild(cardFirstEvolution);

    const respFirstPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${textFirstEvolution}`
    );
    const dataFirstPokemon = await respFirstPokemon.json();
    //console.log(dataFirstPokemon);

    idFirstEvolution.innerText = `ID: ${dataFirstPokemon.id}`;
    titleFirstEvolution.innerText = dataFirstPokemon.name;
    ancoraFirstPokemon.href=`./pokemon.html?name=${dataFirstPokemon.name}`;
    imageFirstEvolution.src =
        dataFirstPokemon.sprites.other.dream_world.front_default;
    dataFirstPokemon.types.forEach((item) => {
        const typesFirstEvolution = document.createElement("span");
        typesFirstEvolution.classList.add("type-first-evolution");
        typesFirstEvolution.innerText = item.type.name;
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
            if (tipo === typesFirstEvolution.textContent) {
                typesFirstEvolution.classList.add(`type-${tipo}`);
            }
        });
        containerTypesFirstEvolution.appendChild(typesFirstEvolution);
    });

    const cardSecondEvolution = document.createElement("div");
    cardSecondEvolution.classList.add("card-evolution");
    const idSecondEvolution = document.createElement("span");
    const imageSecondEvolution = document.createElement("img");
    imageSecondEvolution.classList.add("img-evolution");
    const titleSecondEvolution = document.createElement("span");
    titleSecondEvolution.classList.add("title-second-evolution");
    const containerTypesSecondEvolution = document.createElement("div");
    const ancoraSecondPokemon = document.createElement("a");
    ancoraSecondPokemon.classList.add("ancora-second-pokemon");
    containerTypesSecondEvolution.classList.add(
        "container-types-second-evolution"
    );

    cardSecondEvolution.appendChild(idSecondEvolution);
    ancoraSecondPokemon.appendChild(imageSecondEvolution);
    ancoraSecondPokemon.appendChild(titleSecondEvolution);
    cardSecondEvolution.appendChild(ancoraSecondPokemon);
    cardSecondEvolution.appendChild(containerTypesSecondEvolution);
    sectionEvolutionChain.appendChild(cardSecondEvolution);

    const respSecondPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${textSecondEvolution}`
    );
    const dataSecondPokemon = await respSecondPokemon.json();
    //console.log(dataSecondPokemon);

    idSecondEvolution.innerText = `ID: ${dataSecondPokemon.id}`;
    titleSecondEvolution.innerText = dataSecondPokemon.name;
    ancoraSecondPokemon.href=`./pokemon.html?name=${dataSecondPokemon.name}`;
    imageSecondEvolution.src =
        dataSecondPokemon.sprites.other.dream_world.front_default;
    dataSecondPokemon.types.forEach((item) => {
        const typesSecondEvolution = document.createElement("span");
        typesSecondEvolution.classList.add("type-second-evolution");
        typesSecondEvolution.innerText = item.type.name;
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
            if (tipo === typesSecondEvolution.textContent) {
                typesSecondEvolution.classList.add(`type-${tipo}`);
            }
        });
        containerTypesSecondEvolution.appendChild(typesSecondEvolution);
    });

    if (!(dataEvolutionChain.chain.evolves_to[0].evolves_to[0] === undefined)) {
        const cardThirdEvolution = document.createElement("div");
        cardThirdEvolution.classList.add("card-evolution");
        const idThirdEvolution = document.createElement("span");
        const imageThirdEvolution = document.createElement("img");
        imageThirdEvolution.classList.add("img-evolution");
        const titleThirdEvolution = document.createElement("span");
        titleThirdEvolution.classList.add("title-third-evolution");
        const containerTypesThirdEvolution = document.createElement("div");
        const ancoraThirdPokemon = document.createElement("a");
        ancoraThirdPokemon.classList.add("ancora-third-pokemon");
        containerTypesThirdEvolution.classList.add(
            "container-types-third-evolution"
        );

        cardThirdEvolution.appendChild(idThirdEvolution);
        ancoraThirdPokemon.appendChild(imageThirdEvolution);
        ancoraThirdPokemon.appendChild(titleThirdEvolution);
        cardThirdEvolution.appendChild(ancoraThirdPokemon);
        cardThirdEvolution.appendChild(containerTypesThirdEvolution);
        sectionEvolutionChain.appendChild(cardThirdEvolution);

        const respThirdPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${textThirdEvolution}`
        );
        const dataThirdPokemon = await respThirdPokemon.json();

        idThirdEvolution.innerText = `ID: ${dataThirdPokemon.id}`;
        titleThirdEvolution.innerText = dataThirdPokemon.name;
        ancoraThirdPokemon.href=`./pokemon.html?name=${dataThirdPokemon.name}`;
        imageThirdEvolution.src =
            dataThirdPokemon.sprites.other.dream_world.front_default;
        dataThirdPokemon.types.forEach((item) => {
            const typesThirdEvolution = document.createElement("span");
            typesThirdEvolution.classList.add("type-third-evolution");
            typesThirdEvolution.innerText = item.type.name;
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
                if (tipo === typesThirdEvolution.textContent) {
                    typesThirdEvolution.classList.add(`type-${tipo}`);
                }
            });
            containerTypesThirdEvolution.appendChild(typesThirdEvolution);
        });
    }
}

//console.log(dataEvolutionChain.chain.evolves_to);
getSinglePokemon();
