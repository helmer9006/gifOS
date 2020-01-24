//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

var imagen = document.querySelector("#resultTend"); //div para cargar imagenes en tendencia
var sugeridos = document.querySelector(".resultados"); //div para cargar imagenes en sugerencias
var result_busqueda = document.querySelector("#result_busqueda");//div para cargar imagenes de la busqueda

var txtBuscar = document.querySelector("#txtBuscar");//txt para ingresas texto de busqueda
var btnBuscar = document.querySelector("#btnBuscar");//boton para activar busqueda
var FiltroSugerencias = document.querySelector("#filtro");//div para mostrar botones de sugerencias de busqueda
var btnFiltro = document.querySelector("#btnFiltro");//boton con nombre de sugerencia de busqueda
var botonFiltro = document.getElementsByClassName("filtro_buscar");
// var lblImg = document.getElementById('lblImg');

//*************************************************//
//FUNCIONES
//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES

// #region CAMBIAR TEMA
var tema = document.getElementById("tema"); // carturar el elemento selector para elegir tema
tema.addEventListener('change',
  function () {
    // let opcionSeleccionada = this.options[tema.selectedIndex];
    let opcionSeleccionada = tema.value;

    if (opcionSeleccionada == 1) {
      document.getElementById('estilos').href = '/css/style.css';
    } else {
      document.getElementById('estilos').href = '/css/style2.css';
    }
  });

//#endregion

//#region FUNCION DE BUSQUEDA X BOTON BUSCAR
btnBuscar.addEventListener("click", function () {

  var valorTxt = txtBuscar.value.toString();
  //    console.log(valorTxt)

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


//#region FUNCION DE BUSQUEDA X AL INICIAR A DILIGENCIAR TXTBUSQUEDA

txtBuscar.addEventListener("keyup", function () {
  FiltroSugerencias.style.visibility = "visible";

  var valorTxt = txtBuscar.value.toString();

  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults()
    .then(result => {
      FiltroSugerencias.innerHTML = ``;
      let j = 0;

      for (let i of result.data) {
        j++;

        FiltroSugerencias.innerHTML += `

         <button id="btnFiltro"  >${i.title}</button>
       
        `;

        if (j > 2) {
          break;
        }
      }

    });

});

//FUNCION PARA OCULTAR DIV DE SUGERENCIAS DE BUSQUDA AL PERDER FOCO TXTBUSCAR


//#endregion   


FiltroSugerencias.addEventListener("click", function (e) {
  e.preventDefault();
  txtBuscar.value = e.target.innerHTML;
  btnBuscar.click();
  ocultarDiv();
  //var valorTxt = txtBuscar.value.toString();
  //    console.log(valorTxt)
});

// txtBuscar.addEventListener("blur", function () {
//   ocultarDiv();
// })

//FUNCION QUE OCULTA DIV DE BUSQUEDA
function ocultarDiv() {
  FiltroSugerencias.style.visibility = "hidden";
}



//*************************************************//
// INSTANCIANDO CLASES Y METODOS
//*************************************************//

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
            <button id="verMas">Ver Más...</button>
        </div>
    </div>
    `;
  }
});

//#endregion
