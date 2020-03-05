//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

const  imagen = document.querySelector("#resultTend"); //div para cargar imagenes en tendencia
const  sugeridos = document.querySelector(".resultados"); //div para cargar imagenes en sugerencias
const  result_busqueda = document.querySelector("#result_busqueda"); //div para cargar imagenes de la busqueda
const  txtBuscar = document.querySelector("#txtBuscar"); //txt para ingresas texto de busqueda
const  btnBuscar = document.querySelector("#btnBuscar"); //boton para acticonst  busqueda
const  FiltroSugerencias = document.querySelector("#filtro"); //div para mostrar botones de sugerencias de busqueda
const  btnFiltro = document.querySelector("#btnFiltro"); //boton con nombre de sugerencia de busqueda
const  botonFiltro = document.getElementsByClassName("filtro_buscar");
const  tema = document.getElementById("tema"); // capturar el elemento selector para elegir tema
const  ContentInicio = document.querySelector("#inicio");
const  ContentMisGuifos = document.querySelector("#misGuifos");
const  ContentCrearGuifos = document.querySelector("#crearGuifos");
const  ContentCapturar = document.querySelector("#capturar");


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

tema.addEventListener("change", function() {
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
btnBuscar.addEventListener("click", function() {
  var valorTxt = txtBuscar.value.toString();
  
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
    document.getElementById('txtTitulo').style.display='block';
  });
  ocultarDiv();
});

//#endregion

//#region FUNCION DE BUSQUEDA AL INICIAR A DILIGENCIAR TXTBUSQUEDA - MUESTRA FILTRO CON BOTONES

txtBuscar.addEventListener("keyup", function() {
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
document.onkeypress = function(e) {
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
document.onclick = function(e) {
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

FiltroSugerencias.addEventListener("click", function(e) {
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

sugeridos.addEventListener("click", function(e) {
  if (e.target.localName == "button") {
    btnBuscar.disabled = false;
    e.preventDefault();
    txtBuscar.value = e.target.name;
    btnBuscar.click();
    ocultarDiv();
  }
});

//#endregion

//#region MOSTRAR MIS GUIFOS




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

//#region MOSTRAR MIS GUIFOS

document.querySelector("#guifos").addEventListener("click", function(){

  ContentInicio.style.display = "none";
  ContentMisGuifos.style.display = "block";
  ContentCrearGuifos.style.display = "none";

  
})

//#endregion 

//#region CREAR GUIFOS

document.querySelector("#btnCrearGuifos").addEventListener('click', function(){

  ContentInicio.style.display = "none";
  ContentCrearGuifos.style.display = "block";
  ContentMisGuifos.style.display = "block"; 
  document.querySelector("#btnCrearGuifos").style.display = "none";
  document.querySelector("#tema").style.display = "none";
  document.querySelector("#guifos").style.display = "none";
  document.querySelector("#logo").innerHTML = `
  <img id="imgVolver" src="/img/arrow.svg" alt="">
  `;

})

document.querySelector("#btnComenzar").addEventListener('click', function(){

  ContentCrearGuifos.style.display = "none";
  ContentCapturar.style.display = "block";
  iniciarGrabacion();

})

//#endregion 


//#region INICIANDO GRABACION DE VIDEO 

function iniciarGrabacion(){

  // Prefer camera resolution nearest to 1280x720.
var constraints = {video: { width: 830, height: 434 } }; 
  var p = navigator.mediaDevices.getUserMedia(constraints);
  
  p.then(function(mediaStream) {
    var video = document.querySelector('video');
    // video.src = window.URL.createObjectURL(mediaStream);
    video.srcObject = mediaStream

    video.onloadedmetadata = function(e) {
     video.play(); 
    };
  });
  
  p.catch(function(err) { console.log(err.name); }); // always check for errors at the end.
  
  }
  //#endregion