//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//

//#region DECLARANDO VARIABLES


const imagen = document.querySelector("#resultTend"); //div para cargar imagenes en tendencia
const sugeridos = document.querySelector(".resultados"); //div para cargar imagenes en sugerencias
const result_busqueda = document.querySelector("#result_busqueda"); //div para cargar imagenes de la busqueda
const txtBuscar = document.querySelector("#txtBuscar"); //txt para ingresas texto de busqueda
const btnBuscar = document.querySelector("#btnBuscar"); //boton para acticonst  busqueda
const FiltroSugerencias = document.querySelector("#filtro"); //div para mostrar botones de sugerencias de busqueda
const btnFiltro = document.querySelector("#btnFiltro"); //boton con nombre de sugerencia de busqueda
const botonFiltro = document.getElementsByClassName("filtro_buscar");
const ContentInicio = document.querySelector("#inicio");
const ContentMisGuifos = document.querySelector("#misGuifo");
// const ContentCrearGuifos = document.querySelector("#crearGuifos");
const ContentCapturar = document.querySelector("#capturar");
const guifos = document.getElementById('guifos');
const guifosStorage = document.getElementById('guifosStorage');
const tarjetaBusqueda = document.getElementById('tarjetaBusqueda');
const contentTema = document.getElementById('contentTema');
const btnCambiarTema = document.getElementById('btnCambiarTema');
const btnCrearGuifos = document.getElementById('btnCrearGuifos');
const anchorGuifos = document.getElementById('guifos');
let temaLocalStorage = localStorage.getItem("temaActual");

let arrayBusquedas = []; //array para almacenar las busquedas antes de enviarlas al storage
var bandera = false;
//#endregion


//*************************************************//
//FUNCIONES
//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES

(() => {

  txtBuscar.value = "";
  MostrarDB();
})();




// document.body.onclick = function (e) {
//   alert()
//   var target = e.target || e.srcElement;
//   var estado = anchorGuifos.style.color;

//   if (estado == "110038") {
//     do {
//       if (anchorGuifos == target) {
//         return;
//       }
//       target = target.parentNode;
//     } while (target);
//     Se ha clicado fuera del elemento, se realiza una acción.
//     anchorGuifos.style.color = '#8A829D';
//   }
// };





//#region VINCULO CREAR GUIFOS, ARCHIVO UPLOAD.HTML 
btnCrearGuifos.addEventListener('click', function () {

  window.location.href = './upload.html';

})

//#endregion

//#region VINCULO DE LOGO A INICIO

document.getElementById('logo').addEventListener('click', function () {

  ContentInicio.style.display = "block";
  ContentMisGuifos.style.display = "none";

})



//#endregion

//#region FUNCION PARA CARGAR TEMA DESDE LOCALSTORAGE
document.addEventListener('DOMContentLoaded', function (e) {



  let temaLocalStorage = localStorage.getItem("temaActual");
  if (temaLocalStorage == 'dia') {
    document.getElementById("estilos").href = "/css/style.css";

    if (e.target.id == "btnTema1") {
      e.target.style.background = 'red';
    }

  } else {
    document.getElementById("estilos").href = "/css/style2.css";

  }
});

//#endregion

// #region FUNCION PARA CAMBIAR TEMA

contentTema.addEventListener('click', function (e) {
  e.preventDefault();


  const temaElegido = e.target.id;
  switch (temaElegido) {
    case ('btnTema1'):
      document.getElementById("estilos").href = "/css/style.css";
      localStorage.setItem("temaActual", 'dia');
      contentTema.style.visibility = "hidden";
      estiloTemaActual();
      break;
    case ('btnTema2'):
      document.getElementById("estilos").href = "/css/style2.css";
      localStorage.setItem("temaActual", 'noche');
      contentTema.style.visibility = "hidden";
      estiloTemaActual();
      break;
  }
})

//#endregion

//#region MOSTRAR BOTONES PARA CAMBIAR TEMA

btnCambiarTema.addEventListener('click', function () {

  contentTema.innerHTML = ``;
  //botton 1
  var nuevoBtn = document.createElement('button');
  nuevoBtn.className = "btnTema1";
  nuevoBtn.id = "btnTema1";
  nuevoBtn.innerHTML = `Sailor Day`;
  contentTema.appendChild(nuevoBtn);

  //botton 2
  var nuevoBtn2 = document.createElement('button');
  nuevoBtn2.className = "btnTema2";
  nuevoBtn2.id = "btnTema2";
  nuevoBtn2.innerHTML = `Sailor Night`;
  contentTema.appendChild(nuevoBtn2);
  contentTema.style.visibility = 'visible';

  estiloTemaActual();
});

function estiloTemaActual() {
  temaLocalStorage = localStorage.getItem("temaActual");
  let tema1 = document.getElementById('btnTema1');
  let tema2 = document.getElementById('btnTema2');
  if (temaLocalStorage == 'dia') {
    tema1.style.background = '#FFF4FD';
    tema1.style.color = '#110038';
    tema1.style.border = '1px solid #CCA6C9';
    tema1.style.boxShadow = 'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  } else {
    tema2.style.background = '#2E32FB';
    tema2.style.color = '#FFFFFF';
    tema1.style.border = '1px solid rgba(51,53,143,0.20)';
    tema1.style.boxShadow = 'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  }

}
//OCULTAR DIV CONTENIDO TEMAS - BOTONES TEMAS
document.body.onclick = function (e) {
  var target = e.target || e.srcElement;
  var estado = contentTema.style.visibility;
  if (e.target.id == 'btnCambiarTema' || e.target.classList[1] == 'fa-caret-down') {
    if (bandera == true) {
      contentTema.style.visibility = "hidden";
      bandera = false;
    } else {
      bandera = true;
    }

  } else {
    if (estado == "visible") {
      do {
        if (contentTema == target) {
          return;
        }
        target = target.parentNode;
      } while (target);
      // Se ha clicado fuera del elemento, se realiza una acción.
      contentTema.style.visibility = "hidden";
    }
  }

 //COLOR TEXTO MIS GUIFOS
  if (e.target.id == 'guifos') {
    anchorGuifos.style.color = '#8A829D';
  } else {
    if (temaLocalStorage == 'dia') {
      
      anchorGuifos.style.color = '#110038';
      console.log(temaLocalStorage)
    } else {
      anchorGuifos.style.color = '#fff';
      console.log(temaLocalStorage)
    }

  }

};

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
  var target = e.target || e.srcElement;
  var estado = FiltroSugerencias.style.visibility;

  if (estado == "visible") {
    do {
      if (FiltroSugerencias == target) {
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
    window.location.href = '#txtBusqueda';
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
        <div class="titulo">
            <label>#${i.title}</label>
            <button><img src="./img/button3.svg" alt=""></button>
        </div>
        <div class="img-result ">
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
