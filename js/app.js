//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from '/js/giphy.js'

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

var imagen = document.querySelector('#resultTend');//div para cargar imagenes en tendencia
var sugeridos = document.querySelector('.resultados')//div para cargar imagenes en sugerencias

//*************************************************//
//FUNCIONES
//*************************************************//

// #region CAMBIAR TEMA
var tema = document.getElementById("tema"); // carturar el elemento selector para elegir tema
tema.addEventListener('change',
function(){
    // let opcionSeleccionada = this.options[tema.selectedIndex];
    let opcionSeleccionada = tema.value;

    if(opcionSeleccionada == 1 )
    {
        document.getElementById('estilos').href = '/css/style.css';
    }else{
        document.getElementById('estilos').href = '/css/style2.css';
    }
});

//#endregion

//*************************************************//
// INSTANCIANDO CLASES Y METODOS
//*************************************************//

// #region TENDENCIAS

const tendencia = new Giphy();
tendencia.getTrending().then((result) => {

    imagen.innerHTML = ``;
    for (let i of result.data) {
        imagen.innerHTML += `
    <div class="img-tendencia">
        <img src="${i.images.fixed_height.url}" alt="">
        <label id="lblImg">#${i.title}</label>
    </div>
    `;
    }
})


//#endregion

// #region SUGERENCIAS

const sugerencias = new Giphy();
sugerencias.getSuggestions().then((result) => {

    sugeridos.innerHTML = ``;

    for (let i of result.data) {

    sugeridos.innerHTML += `
    <div class="content_resultados">
        <div class="titulo d-flex justify-content-between">
            <label>#${i.title}</label>
            <button><img src="./img/button3.svg" alt=""></button>
        </div>
        <div class="img-result d-flex justify-content-start align-items-end">
            <img src="${i.images.fixed_height.url}" alt="">
            <button id="verMas">Ver Más...</button>
        </div>
    </div>
    `;
    }


})



//#endregion
