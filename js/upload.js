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
const ContentMisGuifos = document.querySelector("#misGuifos");
const ContentCrearGuifos = document.querySelector("#crearGuifos");
const ContentCapturar = document.querySelector("#capturar");
const divBotones = document.getElementById("botones");
const btnCapturar = document.getElementById('btnCapturar');
const btnListo = document.getElementById('btnListo');
const btnImgCaptura = document.getElementById("btnImgCaptura");
const btnImgListo = document.getElementById("btnImgListo");
const btnRepetir = document.getElementById('btnRepetir');
const btnUploadGif = document.getElementById('btnUploadGif');
const btnCrearGuifos = document.querySelector("#btnCrearGuifos");
const btnComenzar = document.querySelector("#btnComenzar");
let recorder;
let mediaStreamGlobal;
let blob;
let gifId;
//ocultar barra de herramientas

divBotones.style.display = "none";


//MOSTRAR FLECHA DE VOLVER EN LOGO 

document.querySelector("#logo").innerHTML = `
  <a href="/index.html"><img id="imgVolver" src="/img/arrow.svg" alt=""></a>
  `;

//*************************************************//
//FUNCIONES
//*************************************************//

//ESTRUCTURA PARA INVOCAR FUNCIONES

(() => {

    cargarTema();
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


//#region MOSTRAR MIS GUIFOS

document.querySelector("#guifos").addEventListener("click", function () {

    ContentInicio.style.display = "none";
    ContentMisGuifos.style.display = "block";
    ContentCrearGuifos.style.display = "none";


})

//#endregion 

//#region CREAR GUIFOS

//EVENTO CREAR GUIFOS
// btnCrearGuifos.addEventListener('click', function () {

//     ContentInicio.style.display = "none";
//     ContentCrearGuifos.style.display = "block";
//     ContentMisGuifos.style.display = "block";
//     document.querySelector("#btnCrearGuifos").style.display = "none";
//     document.querySelector("#tema").style.display = "none";
//     document.querySelector("#guifos").style.display = "none";
//     document.querySelector("#logo").innerHTML = `
//     <a href="/index.html"><img id="imgVolver" src="/img/arrow.svg" alt=""></a>
//     `;

// })

//EVENTO COMENZAR 
btnComenzar.addEventListener('click', function () {

    ContentCrearGuifos.style.display = "none";
    ContentCapturar.style.display = "block";
    iniciarGrabacion();

})

//#endregion 


//#region ACTIVANDO LA CAMARA EN EL NAVEGADOR Y OBTENIENDO VIDEO 

function iniciarGrabacion() {
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { video: { width: 830, height: 434 } };
    var p = navigator.mediaDevices.getUserMedia(constraints);

    p.then(function (mediaStream) {
        var video = document.querySelector('video');
        // video.src = window.URL.createObjectURL(mediaStream);
        video.srcObject = mediaStream;
        mediaStreamGlobal = mediaStream;
        video.onloadedmetadata = function (e) {
            video.play();

        };

        // //
        recorder = RecordRTC(mediaStream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            quality: 10,
            hidden: 240,
        });
    });

    p.catch(function (err) { console.log(err.name); }); // always check for errors at the end.

}


//#region CAPTURANDO VIDEO

//EVENTO DEL BOTON CAPTURAR VIDEO PARA INICIAR GRABACION

btnCapturar.addEventListener("click", function () {
    //OBJETO PARA ALMACENAR VIDEO
    //

    btnImgCaptura.style.display = "none";
    btnCapturar.style.display = "none";
    btnListo.style.display = "block";
    btnImgListo.style.display = "block";



    recorder = RecordRTC(mediaStreamGlobal, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });
    recorder.startRecording();
    console.log("soy recorder", recorder)

});

//EVENTO CLICK EN BOTON LISTO PARA TERMINAR GRABACION

btnListo.addEventListener("click", function (e) {
    e.preventDefault();
    recorder.stopRecording(function () {
        blob = recorder.getBlob();
        console.log(invokeSaveAsDialog(blob));
    });

    btnListo.style.display = "none";
    btnImgListo.style.display = "none";
    btnUploadGif.style.display = "block"
    btnRepetir.style.display = "block"


})

//#endregion

//EVENTO REPETIR CAPTURA

btnRepetir.addEventListener("click", function () {

    recorder.destroy();
    // btnCapturar.click();
    btnListo.style.display = "none";
    btnImgListo.style.display = "none";
    btnUploadGif.style.display = "none";
    btnRepetir.style.display = "none";
    btnImgCaptura.style.display = "block";
    btnCapturar.style.display = "block";
})

//evento cargar imagen
btnUploadGif.addEventListener("click", function () {

    const resUpload = new Giphy();
    resUpload.postUploadGif(blob).then(result => {

        if (result.status == 200) {
            // console.log(result);

            let resultado = await result.json();
            gifId = resultado.data.id;
            //mostrar div de gif cargado correctamente

        } else {
            alert("Hubo un error al cargar el GIF");
            console.log(result);
        }


    });
})