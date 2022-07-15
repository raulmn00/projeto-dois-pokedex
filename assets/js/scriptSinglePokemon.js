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
    let arrayTypes = [];
    for (let i = 0; i < data.types.length; i++) {
        arrayTypes.push(data.types[i].type.name);
        //console.log(dataPoke.types[i].type.name);
    }
    document.querySelector(".single-pokemon").insertAdjacentHTML(
        "beforeend",
        `
    <div class="card-single-pokemon">
    <h2 class="name-single-pokemon">${data.name}</h2>
    <img src="${data.sprites.other.dream_world.front_default}"/>
    <h3 class="id-single-pokemon">ID: ${data.id} </h3>
    <h3 class="type-single-pokemon">${arrayTypes}</h3>
    <span class="single-pokemon-description">${dataEspecies.flavor_text_entries[9].flavor_text}</span>
</div>
    `
    );
    //console.log(data);
}
getSinglePokemon();
