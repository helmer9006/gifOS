//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

const imagen = document.querySelector("#resultTend"); //div para cargar imagenes en tendencia
const sugeridos = document.querySelector(".resultados"); //div para cargar imagenes en sugerencias
const result_busqueda = document.querySelector("#result_busqueda"); //div para cargar imagenes de la busqueda
const txtBuscar = document.querySelector("#txtBuscar"); //txt para ingresas texto de busqueda
const btnBuscar = document.querySelector("#btnBuscar"); //boton para acticonst  busqueda
const FiltroSugerencias = document.querySelector("#filtro"); //div para mostrar botones de sugerencias de busqueda
const btnFiltro = document.querySelector("#btnFiltro"); //boton con nombre de sugerencia de busqueda
const botonFiltro = document.getElementsByClassName("filtro_buscar");
const tema = document.getElementById("tema"); // capturar el elemento selector para elegir tema
const ContentInicio = document.querySelector("#inicio");
const ContentMisGuifos = document.querySelector("#misGuifo");
// const ContentCrearGuifos = document.querySelector("#crearGuifos");
const ContentCapturar = document.querySelector("#capturar");
const guifos = document.getElementById('guifos');
const guifosStorage = document.getElementById('guifosStorage');
const tarjetaBusqueda = document.getElementById('tarjetaBusqueda');
let arrayBusquedas = []; //array para almacenar las busquedas antes de enviarlas al storage


//*************************************************//
//FUNCIONES
//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES

(() => {

  cargarTema();
  txtBuscar.value = "";
  MostrarDB();
})();

//#region VINCULO DE LOGO A INICIO

document.getElementById('logo').addEventListener('click', function () {

  ContentInicio.style.display = "block";
  ContentMisGuifos.style.display = "none";

})

//#endregion


//#region FUNCION PARA CARGAR TEMA DESDE LOCALSTORAGE
function cargarTema() {
  let temaLocalStorage = localStorage.getItem("temaActual");
  if (temaLocalStorage == 1 || temaLocalStorage == 0) {
    document.getElementById("estilos").href = "/css/style.css";
    if (temaLocalStorage == 1) {
      tema.value = "1";
    } else {
      tema.value = "0";
    }
  } else {
    tema.value = "2";
    document.getElementById("estilos").href = "/css/style2.css";
  }
}
//#endregion

// #region FUNCION PARA CAMBIAR TEMA

tema.addEventListener("change", function () {
  let opcionSeleccionada = tema.value;

  if (opcionSeleccionada == 1) {
    document.getElementById("estilos").href = "/css/style.css";
    localStorage.setItem("temaActual", opcionSeleccionada);
  } else {
    document.getElementById("estilos").href = "/css/style2.css";
    localStorage.setItem("temaActual", opcionSeleccionada);
  }
});

//#endregion

//#region FUNCION DE BUSQUEDA X BOTON BUSCAR
btnBuscar.addEventListener("click", function () {
  var valorTxt = txtBuscar.value.toString();
  CrearItem(valorTxt);
  GuardarDB();
  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults().then(result => {

    result_busqueda.innerHTML = ``;
    for (let i of result.data) {
      result_busqueda.innerHTML += `
            <div class="img-tendencia">
                <img src="${i.images.fixed_height.url}" alt="">
                <label id="lblImg">#${i.title}</label>
            </div>
            `;
    }
    document.getElementById('txtBusqueda').style.display = 'block';
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
  resBusqueda.getSearchResults().then(result => {
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
  var esIE = document.all;
  var esNS = document.layers;
  var tecla = esIE ? event.keyCode : e.which;
  if (tecla == 13) {
    btnBuscar.click();
    txtBuscar.value = "";
    // return false;
  }
};
//#endregion

//#region ESCONDER DIV DE FILTRO BUSQUEDA AL DAR CLIC FUERA DEL DIV
document.onclick = function (e) {
  // e = e || event
  var target = e.target || e.srcElement;
  var estado = FiltroSugerencias.style.visibility;

  if (estado == "visible") {
    do {
      if (FiltroSugerencias == target) {
        // El click se ha producido dentro del elemento, no se hace nada.
        // FiltroSugerencias.style.visibility = "hidden";
        return;
      }
      target = target.parentNode;
    } while (target);
    // Se ha clicado fuera del elemento, se realiza una acción.
    FiltroSugerencias.style.visibility = "hidden";
    btnBuscar.disabled = true;
    btnBuscar.style.border = "1px solid #808080";
  }
};
//#endregion

//#region ESTRUCTURA PARA MEJORAR PROCESO DE BUSQUEDA AL DAR CLIC SOBRE BOTTON SUGERIDO

FiltroSugerencias.addEventListener("click", function (e) {
  if (e.target.localName == "button") {
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
  if (e.target.localName == "button") {
    btnBuscar.disabled = false;
    e.preventDefault();
    txtBuscar.value = e.target.name;
    btnBuscar.click();
    ocultarDiv();
  }
});

//#endregion

//#region MOSTRAR MIS GUIFOS OPCION BARRA DE NAVEGACION


guifos.addEventListener('click', function () {
  document.getElementById('txtGuifosIndex').style.display = 'block';
  ContentInicio.style.display = "none";
  ContentMisGuifos.style.display = "block";
  // ContentMisGuifos.innerHTML =``; 
  guifosStorage.innerHTML = ``;
  for (let i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).indexOf("gif") >= 0) {

      let clave = localStorage.key(i);
      let objGuifos = JSON.parse(localStorage.getItem(clave));
      guifosStorage.innerHTML += `
              <div class="img-tendencia">
                  <img src="${objGuifos.data.images.fixed_height.url}" alt="">
                  <label id="lblImg">#${objGuifos.data.title}</label>
              </div>
              `;
    }
  }

})


//#endregion


//#region FUNCION ALMACENAR Y MOSTRAR BUSQUEDA EN LOCALSTORAGE

const CrearItem = (argumento) => {

  let item = {
    valor: argumento
  }

  arrayBusquedas.push(item);
  return item;

}

const GuardarDB = () => {

  localStorage.setItem('busqueda', JSON.stringify(arrayBusquedas));
  MostrarDB();
}

function MostrarDB() {

  tarjetaBusqueda.innerHTML = ``;
  arrayBusquedas = JSON.parse(localStorage.getItem('busqueda'));

  if (arrayBusquedas === null) {
    arrayBusquedas = [];
  } else {

    arrayBusquedas.forEach(indice => {
      var nuevoDiv = document.createElement('div');
      nuevoDiv.className = "resBusquedaStorage";
      nuevoDiv.innerHTML = `#${indice.valor}`;
      tarjetaBusqueda.appendChild(nuevoDiv);

    })
  }
}

//#endregion


//#region FUNCION ACTIVAR BUSQUEDA AL DAR CLIC EN TARJETA DE BUSQUEDAS

document.body.addEventListener("click", function (event) {
  if (event.target.className == "resBusquedaStorage") {
      // console.log(event.target.innerHTML);
      let busqueda = (event.target.innerHTML).substr(1) 
      // console.log(busqueda)
     txtBuscar.value = busqueda; 
      const resBusqueda = new Giphy(busqueda);
      resBusqueda.getSearchResults().then(result => {
    
        result_busqueda.innerHTML = ``;
        for (let i of result.data) {
          result_busqueda.innerHTML += `
                <div class="img-tendencia">
                    <img src="${i.images.fixed_height.url}" alt="">
                    <label id="lblImg">#${i.title}</label>
                </div>
                `;
        }
        document.getElementById('txtBusqueda').style.display = 'block';
      });
      ocultarDiv();
  }

})
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
