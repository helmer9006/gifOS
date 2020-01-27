//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

let imagen = document.querySelector("#resultTend"); //div para cargar imagenes en tendencia
let sugeridos = document.querySelector(".resultados"); //div para cargar imagenes en sugerencias
let result_busqueda = document.querySelector("#result_busqueda");//div para cargar imagenes de la busqueda
let txtBuscar = document.querySelector("#txtBuscar");//txt para ingresas texto de busqueda
let btnBuscar = document.querySelector("#btnBuscar");//boton para actilet busqueda
let FiltroSugerencias = document.querySelector("#filtro");//div para mostrar botones de sugerencias de busqueda
let btnFiltro = document.querySelector("#btnFiltro");//boton con nombre de sugerencia de busqueda
let botonFiltro = document.getElementsByClassName("filtro_buscar");
let tema = document.getElementById("tema"); // capturar el elemento selector para elegir tema

//*************************************************//
//FUNCIONES
//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES


(() => {

  //localStorage.setItem('temaActual', tema.value);
  // let temaLocalStorage = localStorage.getItem('temaActual');
  cargarTema();
  txtBuscar.value = "";

})();

//#region FUNCION PARA CARGAR TEMA DESDE LOCALSTORAGE
function cargarTema() {

  let temaLocalStorage = localStorage.getItem('temaActual');
  if (temaLocalStorage == 1 || temaLocalStorage == 0) {
    document.getElementById('estilos').href = '/css/style.css';
    if (temaLocalStorage == 1) {
      tema.value = '1';
    } else {
      tema.value = '0';
    }

  } else {
    tema.value = '2';
    document.getElementById('estilos').href = '/css/style2.css';
  }
}
//#endregion

// #region FUNCION PARA CAMBIAR TEMA

tema.addEventListener('change',
  function () {

    let opcionSeleccionada = tema.value;

    if (opcionSeleccionada == 1) {
      document.getElementById('estilos').href = '/css/style.css';
      localStorage.setItem('temaActual', opcionSeleccionada);
    } else {
      document.getElementById('estilos').href = '/css/style2.css';
      localStorage.setItem('temaActual', opcionSeleccionada);
    }
  });

//#endregion

//#region FUNCION DE BUSQUEDA X BOTON BUSCAR
btnBuscar.addEventListener("click", function () {

  var valorTxt = txtBuscar.value.toString();

  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults()
    .then(result => {
      result_busqueda.innerHTML = ``;
      for (let i of result.data) {
        result_busqueda.innerHTML += `
            <div class="img-tendencia">
                <img src="${i.images.fixed_height.url}" alt="">
                <label id="lblImg">#${i.title}</label>
            </div>
            `;
      }
    });
  ocultarDiv();
});

//#endregion

//#region FUNCION DE BUSQUEDA AL INICIAR A DILIGENCIAR TXTBUSQUEDA - MUESTRA FILTRO CON BOTONES

txtBuscar.addEventListener("keyup", function () {
  FiltroSugerencias.style.visibility = "visible";
  btnBuscar.disabled = false;
  btnBuscar.style.border = "1px solid #110038";
  var valorTxt = txtBuscar.value.toString();

  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults()
    .then(result => {
      FiltroSugerencias.innerHTML = ``;
      let j = 0;

      for (let i of result.data) {
        j++;

        FiltroSugerencias.innerHTML += `

         <button id="btnFiltro" name="btnFiltro">${i.title}</button>
       
        `;

        if (j > 2) {
          break;
        }
      }

    });

});

//#endregion

//#region FUNCION BUSCAR POR ENTER
document.onkeypress = function (e) {
  var esIE = (document.all);
  var esNS = (document.layers);
  var tecla = (esIE) ? event.keyCode : e.which;
  if (tecla == 13) {
    btnBuscar.click();
    txtBuscar.value = "";
      // return false;
  }
}
//#endregion

//#region ESCONDER DIV DE FILTRO BUSQUEDA AL DAR CLIC FUERA DEL DIV
document.onclick = function (e) {
  // e = e || event
  var target = e.target || e.srcElement
  var estado =  FiltroSugerencias.style.visibility;
   
  if ( estado == "visible") {
    do {
      if (FiltroSugerencias == target) {
        // El click se ha producido dentro del elemento, no se hace nada.
        // FiltroSugerencias.style.visibility = "hidden";
        return;
      }
      target = target.parentNode;
    } while (target)
    // Se ha clicado fuera del elemento, se realiza una acción.
    FiltroSugerencias.style.visibility = "hidden";
  }
}
//#endregion 

//#region ESTRUCTURA PARA MEJORAR PROCESO DE BUSQUEDA AL DAR CLIC SOBRE BOTTON SUGERIDO

FiltroSugerencias.addEventListener("click", function (e) {

  if(e.target.localName == "button"){
    e.preventDefault();
    txtBuscar.value = e.target.innerHTML;
    btnBuscar.click();
    ocultarDiv();
  }
});

//#endregion

//#region FUNCION QUE OCULTA DIV DE BUSQUEDA
function ocultarDiv() {
  FiltroSugerencias.style.visibility = "hidden";
}
//#endregion

//#region EVENTO BOTON VER MAS DE SUGERIDOS 

  sugeridos.addEventListener("click", function (e) {
  if(e.target.localName == "button"){
    e.preventDefault();
    txtBuscar.value = e.target.name;
    btnBuscar.click();
    ocultarDiv();
  }
});

//#endregion

//*************************************************//
// INSTANCIANDO CLASES Y METODOS
//*************************************************//


// #region SUGERENCIAS

const sugerencias = new Giphy();
sugerencias.getSuggestions().then(result => {
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
            <button name="${i.title}" id="verMas">Ver Más...</button>
        </div>
    </div>
    `;
  }
});

//#endregion

// #region TENDENCIAS

const tendencia = new Giphy();
tendencia.getTrending().then(result => {
  imagen.innerHTML = ``;
  for (let i of result.data) {
    imagen.innerHTML += `
    <div class="img-tendencia">
        <img src="${i.images.fixed_height.url}" alt="">
        <label id="lblImg">#${i.title}</label>
    </div>
    `;
  }
});

//#endregion
