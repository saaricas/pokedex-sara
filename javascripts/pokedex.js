let container_data = document.getElementById('pokedex-info_container');
let container_img = document.getElementById('left_screen');
let btn_search = document.getElementById('pokemon_input_btn');
let inp_search = document.getElementById('pokemon_input');
let btn_next = document.getElementById('pokedex-btn-next');
let btn_reset = document.getElementById('pokedex-btn-home');
let btn_back = document.getElementById('pokedex-btn-back');
var div_img;
var div_stats;
var id = 0;

// asignamos la función de búsqueda al boton
btn_search.onclick = () => {
    let pokemon_value = inp_search.value;
    let path_pokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon_value}`
    peticion(path_pokemon)
    }
//creamos una función que nos buscará la información en la API
function peticion(path_pokemon){
    fetch(path_pokemon)
        .then(response => response.json())
        .then(data_pokemon =>{
            console.log(data_pokemon);
            id = data_pokemon.id;
            print(data_pokemon, container_img);
            print_stats(data_pokemon, container_data);
        })
}
//mostramos la imagen, nombre e ID
function print(obj, container_img){
    if (container_img.childNodes.length > 1){
        container_img.removeChild(div_img)
    }

    div_img = document.createElement('div');
    container_img.appendChild(div_img);

    div_img.innerHTML = `<img src="${obj.sprites.front_default}" alt="">
    <p> Name: ${obj.name}</p>
    <p>ID: ${obj.id}</p>`
}

//Mostramos las estadísticas en la pantalla de la derecha

function print_stats(obj, container_data){
    if (container_data.childNodes.length > 1){
        container_data.removeChild(div_stats)
    }
    div_stats= document.createElement('div')
    container_data.appendChild(div_stats);
    
    let stats = obj.stats
    stats.forEach(el => {
        let p = document.createElement('p');
        div_stats.appendChild(p);

        p.innerHTML = `
        ${el.stat.name}: ${el.base_stat}
        `
    })
}

// pasar al siguiente
btn_next.onclick = () => {
    if (id == 905) {
        id = 0
    }else{
        id = id + 1;
        let id_path = `https://pokeapi.co/api/v2/pokemon/${id}`
        peticion(id_path)
    }
}
//volver al pokemon anterior
btn_back.onclick = () => {
    if (id == 0) {
        id = 905
    }else{
        id = id - 1;
        let id_path = `https://pokeapi.co/api/v2/pokemon/${id}`
        peticion(id_path)
    }
}

//Apagar pokedex
btn_reset.onclick = () => {
    location.reload();
}
