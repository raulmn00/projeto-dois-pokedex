async function getAllPokemons() {
    const resp = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );
    const data = await resp.json();
    data.results.forEach(async function (item) {
        const respPoke = await fetch(item.url);
        const dataPoke = await respPoke.json();
        const textoEspecies = await fetch(dataPoke.species.url);
        const dataEspecies = await textoEspecies.json();
        let arrayTypes = [];
        for (let i = 0; i < dataPoke.types.length ; i++) {
            arrayTypes.push(dataPoke.types[i].type.name);
            //console.log(dataPoke.types[i].type.name);
        }
        document.querySelector(".all-pokemons").insertAdjacentHTML("beforeend", `
            <a href="/pokemon.html?name=${dataPoke.name}">
            <div class="card-pokemon">
                <h2 class="name-pokemon">${dataPoke.name}</h2>
                <img src="${dataPoke.sprites.other.home.front_default}"/>
                <h3 class="id-pokemon">ID: ${dataPoke.id} </h3>
                <h3 class="type-pokemon">${arrayTypes}</h3>
                <span class="pokemon-description">${dataEspecies.flavor_text_entries[9].flavor_text}</span>
            </div>
            </a>
        `)
        
        //console.log(dataEspecies.flavor_text_entries[0].flavor_text);

        arrayTypes = []; 
    });
    
}

getAllPokemons();
