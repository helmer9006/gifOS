//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//#region variables

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
const horas = document.getElementById('hours');
const minutos = document.getElementById('mins');
const segundos = document.getElementById('seconds');
const contentGuifoCreado = document.getElementById('guifoCreado');
const btnDescargarGuifo = document.getElementById('btnDescargarGuifo');
const btnCopiarEnlace = document.getElementById('btnCopiarEnlace');
const vistaGuifoCreado = document.getElementById('vistaGuifoCreado');
const btnCreadoListo = document.getElementById('btnCreadoListo');
const misGuifosStorage = document.getElementById('misGuifosStorage');
let recorder;
let mediaStreamGlobal;
let blob;
let gifId;
let timex;
var hours = 0;
var mins = 0;
var seconds = 0;
var url;
//#endregion

//ocultar barra de herramientas
divBotones.style.display = "none";

//#region CARGAR IMAGEN VOLVER

//MOSTRAR FLECHA DE VOLVER EN LOGO 



// document.querySelector("#logoUpload").innerHTML = `
//   <a href="/index.html"><img id="imgVolver" src="/img/arrow.svg" alt=""></a>
//   `;
//#endregion

//*************************************************//
//FUNCIONES
//*************************************************//

//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES
//*************************************************//
(() => {
    cargarTema();
    mostrarGuifosStorage();
    
    document.getElementById('logoUpload').innerHTML = `
<a href="/index.html"><img id="imgVolver" src="/img/arrow.svg" alt=""></a>
`;
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

// document.querySelector("#guifos").addEventListener("click", function () {

//     ContentInicio.style.display = "none";
//     ContentMisGuifos.style.display = "block";
//     ContentCrearGuifos.style.display = "none";


// })

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


//#endregion 

//#region COMENZAR CREACION GUIFO
//***************************************************
//*******EVENTO COMENZAR MOSTAR VISTA CAMARA*********
//***************************************************
btnComenzar.addEventListener('click', function () {

    ContentCrearGuifos.style.display = "none";
    ContentCapturar.style.display = "block";
    iniciarGrabacion();

})

//#endregion

//#region ACTIVANDO LA CAMARA EN EL NAVEGADOR Y OBTENIENDO VIDEO 

function iniciarGrabacion() {
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
//#endregion

//#region CAPTURANDO VIDEO


//**************************************************
//*****EVENTO BOTON CAPTURAR VIDEO-INICIAR GRABACION
//**************************************************
btnCapturar.addEventListener("click", function () {

    btnImgCaptura.style.display = "none";
    btnCapturar.style.display = "none";
    btnListo.style.display = "block";
    btnImgListo.style.display = "block";
    iniciarTemporizador();
    recorder = RecordRTC(mediaStreamGlobal, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });
    recorder.startRecording();
    // console.log("soy recorder", recorder)

});

//***************************************************
//EVENTO CLICK EN BOTON LISTO PARA TERMINAR GRABACION
//***************************************************
btnListo.addEventListener("click", function (e) {
    e.preventDefault();
    resetTemporizador();//reinicia en 00
    clearTimeout(timex);//detiene
    recorder.stopRecording(function () {
        blob = recorder.getBlob();
    });

    btnListo.style.display = "none";
    btnImgListo.style.display = "none";
    btnUploadGif.style.display = "block"
    btnRepetir.style.display = "block"
})

//#endregion

//#region REPETIR CAPTURA

//******************************************
//*****EVENTO REPETIR CAPTURA GUIFO*********
//******************************************
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
//#endregion

//#region CARGAR GUIFO
//******************************************
//************EVENTO CARGAR GUIFO***********
//******************************************
btnUploadGif.addEventListener("click", function () {

    try {
        const resUpload = new Giphy();
        resUpload.postUploadGif(blob).then(result => {
           
            if (result.meta.status == 200) {
                gifId = result.data.id;
                traerGuifoCargado(gifId);
                console.log("yo soy el id del gif" + gifId);


            } else {
                alert("Hubo un error al cargar el GIF");
                // console.log("error" + result);
            }
        });
    } catch (error) {
        console.log("error" + error);
    }
})

//#endregion

//#region MOSTRAR GUIFO CARGADO
//******************************************
//*****FUNCION MOSTRAR GUIFO CARGADO********
//******************************************
function traerGuifoCargado(gifId) {

    try {

        const resGif = new Giphy();
        resGif.getUploadGif(gifId).then(result => {
            console.log(result)
            if (result.meta.status == 200) {
                localStorage.setItem('gif' + gifId, JSON.stringify(result));
                url = result.data.images.fixed_height.url;
                contentGuifoCreado.style.display = 'block';
                ContentCapturar.style.display = 'none';
                vistaGuifoCreado.src = result.data.images.fixed_height.url;
                mostrarGuifosStorage();
            } else {
                alert("Hubo un error al cargar el GIF");
                console.log("error" + result);
            }
        });


    } catch (error) {

        console.log("error" + error);
    }

}

//#endregion


//#region MOSTRAR GUIFOS CREADOS Y ALMACENADOS EN LOCALSTORAGE

function mostrarGuifosStorage(){

    misGuifosStorage.innerHTML += ``;
    for (let i = 0; i <= localStorage.length - 1; i++) {
        if(localStorage.key(i).indexOf("gif") >= 0){
           let clave = localStorage.key(i);
            // console.log("La clave " +  clave+ "contiene el valor " + localStorage.getItem(clave) + "");
            let objGuifos =  JSON.parse(localStorage.getItem(clave));
            // console.log(objGuifos);
            misGuifosStorage.innerHTML += `
                <div class="img-tendencia">
                    <img src="${objGuifos.data.images.fixed_height.url}" alt="">
                    <label id="lblImg">#${objGuifos.data.title}</label>
                </div>
                `;
        }
    }
}


//#endregion

// function traerGuifosStorage(){
//   var gifStorage  = JSON.parse(localStorage.getItem('gif'));
//   console.log(gifStorage);  
// }

//#region DESCARGAR GUIFO CREADO

btnDescargarGuifo.addEventListener('click', function () {
    console.log(invokeSaveAsDialog(blob));
})

//#endregion 

//#region COPIAR ENLACE GUIFO


//#endregion

//#region EVENTO BOTON LISTA CARGA DE GIF 

btnCreadoListo.addEventListener('click', function () {
    contentGuifoCreado.style.display = 'none';

})

//#endregion

//#region CREACIÓN DE CRONOMETRO

function iniciarTemporizador() {

    let horas = document.getElementById('hours');
    const minutos = document.getElementById('mins');
    const segundos = document.getElementById('seconds');

    timex = setTimeout(function () {

        seconds++;
        if (seconds > 59) {
            seconds = 0; mins++;
            if (mins > 59) {
                mins = 0; hours++;
                if (hours < 10) {
                    horas.innerHTML = '0:' + hours + ':';
                } else
                    horas.innerHTML = hours + ':';
            }

            if (mins < 10) {
                minutos.innerHTML = '0' + mins + ':';
            }
            else mins.innerHTML = mins + ':';
        }
        if (seconds < 10) {

            segundos.innerHTML = '0' + seconds;
        } else {
            segundos.innerHTML = seconds;
        }
        iniciarTemporizador();
    }, 1000);

}

function resetTemporizador() {

    hours = 0; mins = 0; seconds = 0;
    horas.innerHTML = '00:';
    minutos.innerHTML = '00:';
    segundos.innerHTML = '00:';
}

//#endregion 