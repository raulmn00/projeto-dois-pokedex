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
        const containerStatusSinglePokemon = document.createElement("div");
        containerStatusSinglePokemon.classList.add(
            "container-status-single-pokemon"
        );
        const statusHpSinglePokemon = document.createElement("span");
        const statusAttackSinglePokemon = document.createElement("span");
        const statusDefenseSinglePokemon = document.createElement("span");
        const statusSpecialAttackSinglePokemon = document.createElement("span");
        const statusSpecialDefenseSinglePokemon =
            document.createElement("span");
        const statusSpeedSinglePokemon = document.createElement("span");
        data.stats.forEach((status) => {
            console.log(status);
            if (status.stat.name === "hp") {
                statusHpSinglePokemon.innerText = `HP: ${status.base_stat}`;
            } else if (status.stat.name === "attack") {
                statusAttackSinglePokemon.innerText = `Attack: ${status.base_stat}`;
            } else if (status.stat.name === "defense") {
                statusDefenseSinglePokemon.innerText = `Defense: ${status.base_stat}`;
            } else if (status.stat.name === "special-attack") {
                statusSpecialAttackSinglePokemon.innerText = `Special Attack: ${status.base_stat}`;
            } else if (status.stat.name === "special-defense") {
                statusSpecialDefenseSinglePokemon.innerText = `Special Defense: ${status.base_stat}`;
            } else if (status.stat.name === "speed") {
                statusSpeedSinglePokemon.innerText = `Speed: ${status.base_stat}`;
            }
        });
        containerStatusSinglePokemon.appendChild(statusHpSinglePokemon);
        containerStatusSinglePokemon.appendChild(statusAttackSinglePokemon);
        containerStatusSinglePokemon.appendChild(statusDefenseSinglePokemon);
        containerStatusSinglePokemon.appendChild(
            statusSpecialAttackSinglePokemon
        );
        containerStatusSinglePokemon.appendChild(
            statusSpecialDefenseSinglePokemon
        );
        containerStatusSinglePokemon.appendChild(statusSpeedSinglePokemon);
        containerTypesSinglePokemon.classList.add(
            "container-types-single-pokemon"
        );

        nameSinglePokemon.innerText = data.name;
        idSinglePokemon.innerText = `ID: ${data.id}`;
        imgSinglePokemon.src = `${data.sprites.other["official-artwork"].front_default}`;
        singlePokemonDescription.innerText = `${dataEspecies.flavor_text_entries[6].flavor_text}`;
        nameSinglePokemon.classList.add("name-single-pokemon");

        cardSinglePokemon.appendChild(idSinglePokemon);
        cardSinglePokemon.appendChild(imgSinglePokemon);
        cardSinglePokemon.appendChild(nameSinglePokemon);
        cardSinglePokemon.appendChild(singlePokemonDescription);
        cardSinglePokemon.appendChild(containerStatusSinglePokemon);
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

    if (
        namePokemon === "eevee" ||
        namePokemon === "umbreon" ||
        namePokemon == "vaporeon" ||
        namePokemon === "jolteon" ||
        namePokemon === "flareon" ||
        namePokemon === "espeon" ||
        namePokemon === "leafeon" ||
        namePokemon === "glaceon" ||
        namePokemon === "sylveon"
    ) {
        const sectionEvolutionChainBody =
            document.querySelector(".evolution-chain");
        const dataEevee = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
        );
        const respEevee = await dataEevee.json();

        const dataEvolutionChainEevee = await fetch(respEevee.species.url);
        const respDataEvolutionChainEeevee =
            await dataEvolutionChainEevee.json();

        const evolutionChainEevee = await fetch(
            respDataEvolutionChainEeevee.evolution_chain.url
        );
        const responseEvolutionChainEevee = await evolutionChainEevee.json();
        responseEvolutionChainEevee.chain.evolves_to.forEach((evolucao) => {
            let cardEvolucaoEevee = document.createElement("div");
            cardEvolucaoEevee.classList.add(
                `card-evolucao-eevee-${evolucao.species.name}`
            );
            let titleEvolucaoEevee = document.createElement("span");
            titleEvolucaoEevee.classList.add("title-evolucao-eevee");
            sectionEvolutionChainBody.appendChild(cardEvolucaoEevee);
        });

        for (let i = 0; i < 8; i++) {
            let nameEvolution =
                responseEvolutionChainEevee.chain.evolves_to[i].species.name;
            const dataEvolution = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${nameEvolution}`
            );
            const respDataEvolution = await dataEvolution.json();

            let divCardEvolution = document.querySelector(
                `.card-evolucao-eevee-${nameEvolution}`
            );
            let titleEvolucaoEevee = document.createElement("span");
            let ancoraEvolucaoEevee = document.createElement("a");
            ancoraEvolucaoEevee.href = `./pokemon.html?name=${nameEvolution}`;
            ancoraEvolucaoEevee.classList.add("ancora-evolucao-eevee");
            titleEvolucaoEevee.classList.add("title-evolution");
            titleEvolucaoEevee.innerText = `${nameEvolution}`;
            //console.log(respDataEvolution);
            let imgEvolution = document.createElement("img");
            imgEvolution.classList.add("img-evolution-eevee");
            let idEvolution = document.createElement("span");
            divCardEvolution.appendChild(idEvolution);
            idEvolution.classList.add(`id-evolution-${nameEvolution}`);
            idEvolution.innerText = respDataEvolution.id;
            imgEvolution.src = `${respDataEvolution.sprites.other["official-artwork"].front_default}`;
            ancoraEvolucaoEevee.appendChild(imgEvolution);
            ancoraEvolucaoEevee.appendChild(titleEvolucaoEevee);
            divCardEvolution.appendChild(ancoraEvolucaoEevee);

            respDataEvolution.types.forEach((item) => {
                let typeEvolutionEevee = document.createElement("span");
                typeEvolutionEevee.classList.add("type-evolution-eevee");
                typeEvolutionEevee.innerText = item.type.name;
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
                types.forEach((tipoEvolucao) => {
                    if (tipoEvolucao === typeEvolutionEevee.textContent) {
                        typeEvolutionEevee.classList.add(
                            `type-${tipoEvolucao}`
                        );
                    }
                });
                divCardEvolution.appendChild(typeEvolutionEevee);
            });
        }
    } else {
        const evolutionChainUrl = dataEspecies.evolution_chain.url;
        const textEvolutionChain = await fetch(evolutionChainUrl);
        const dataEvolutionChain = await textEvolutionChain.json();

        let textThirdEvolution = "";

        let textFirstEvolution = dataEvolutionChain.chain.species.name;
        let textSecondEvolution =
            dataEvolutionChain.chain.evolves_to[0].species.name;
        if (
            dataEvolutionChain.chain.evolves_to[0].evolves_to[0] === undefined
        ) {
            textThirdEvolution = "";
        } else {
            textThirdEvolution =
                dataEvolutionChain.chain.evolves_to[0].evolves_to[0].species
                    .name;
        }
        //console.log(dataEvolutionChain.chain.evolves_to[0].evolves_to[0])
        //console.log(textFirstEvolution);
        //console.log(textSecondEvolution);
        //console.log(textThirdEvolution);

        const sectionEvolutionChain =
            document.querySelector(".evolution-chain");

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
        ancoraFirstPokemon.href = `./pokemon.html?name=${dataFirstPokemon.name}`;
        imageFirstEvolution.src =
            dataFirstPokemon.sprites.other["official-artwork"].front_default;
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
        ancoraSecondPokemon.href = `./pokemon.html?name=${dataSecondPokemon.name}`;
        imageSecondEvolution.src =
            dataSecondPokemon.sprites.other["official-artwork"].front_default;
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

        if (
            !(
                dataEvolutionChain.chain.evolves_to[0].evolves_to[0] ===
                undefined
            )
        ) {
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
            ancoraThirdPokemon.href = `./pokemon.html?name=${dataThirdPokemon.name}`;
            imageThirdEvolution.src =
                dataThirdPokemon.sprites.other[
                    "official-artwork"
                ].front_default;
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
}

//console.log(dataEvolutionChain.chain.evolves_to);
getSinglePokemon();
