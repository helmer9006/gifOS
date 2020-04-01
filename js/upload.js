//*************************************************//
//IMPORTANDO CLASES
//*************************************************//

import Giphy from "/js/giphy.js";

//#region variables

//*************************************************//
//DECLARANDO VARIABLES
//*************************************************//


let temaLocalStorage = localStorage.getItem("temaActual");
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
const btnImgCaptura = document.getElementById('btnImgCaptura');
const btnImgListo = document.getElementById('btnImgListo');
const btnCancelarCarga = document.getElementById('btnCancelarCarga');
const misGuifosStorage = document.getElementById('misGuifosStorage');
const temporizador = document.getElementById('temporizador');
const playGif = document.getElementById('play');
const barraProgreso = document.getElementById('barraProgreso');
const barraUpload = document.getElementById('barraUpload');
const progreso = document.getElementById('progreso');
const imgUpload = document.getElementById('imgUpload');
const barraProgresoUpload = document.getElementById('barraProgresoUpload');
const h2Upload = document.getElementById('h2Upload');
const parrafoUpload = document.getElementById('parrafoUpload');
var video = document.querySelector('video');
const time = document.getElementById("time");
var inicioTiempo;
var finTiempo;
let recorder;
let recorder2;
let mediaStreamGlobal;
let blob;
let blob2;
let gifId;
let timex;
var hours = 0;
var mins = 0;
var seconds = 0;
var url;
let tiempoVideo;




//#endregion

//ocultar barra de herramientas
divBotones.style.display = "none";

//#region CARGAR IMAGEN VOLVER

//*************************************************//
//FUNCIONES
//*************************************************//

//*************************************************//
//ESTRUCTURA PARA INVOCAR FUNCIONES
//*************************************************//
(() => {

    mostrarGuifosStorage();
    document.getElementById('logoUpload').innerHTML = `<a href="/index.html"><img id="imgVolver" src="/img/arrow.svg" alt=""></a>`;

})();

//#region FUNCION PARA CARGAR TEMA DESDE LOCALSTORAGE

document.addEventListener('DOMContentLoaded', function (e) {

    let temaLocalStorage = localStorage.getItem("temaActual");

    if (temaLocalStorage == 'dia') {
        document.getElementById("estilos").href = "/css/style.css";

        if (e.target.id == "btnTema1") {
            e.target.style.background = 'red';
        }
        //cambio imagen boton captura y listo - desde css en chrome no aparece
        btnImgCaptura.style.backgroundImage = "url('./img/camera.svg')";
        btnImgListo.style.backgroundImage = "url('./img/recording.svg')";


    } else {
        document.getElementById("estilos").href = "/css/style2.css";
        //cambio imagen boton captura y listo - desde css en chrome no aparece
        btnImgCaptura.style.backgroundImage = "url('./img/camera_light.svg')";
        btnImgListo.style.backgroundImage = "url('./img/recording_dark.svg')";

    }

});
//#endregion


//#region MOSTRAR VISTA CAMARA
//***************************************************
//*******EVENTO COMENZAR MOSTRAR VISTA CAMARA*********
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
        video.srcObject = mediaStream;
        mediaStreamGlobal = mediaStream;
        video.onloadedmetadata = function (e) {
            video.play();

        };
    });

    p.catch(function (err) { console.log(err.name); }); // always check for errors at the end.

}
//#endregion

//#region CAPTURANDO VIDEO

//**************************************************
//*****EVENTO BOTON CAPTURAR VIDEO-INICIAR GRABACION
//**************************************************
btnCapturar.addEventListener("click", function () {
    inicioTiempo = new Date();
    calcularSegundos();
    btnImgCaptura.style.display = "none";
    btnCapturar.style.display = "none";
    btnListo.style.display = "block";
    btnImgListo.style.display = "block";

    // iniciarTemporizador();
    recorder = RecordRTC(mediaStreamGlobal, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });

    recorder2 = RecordRTC(mediaStreamGlobal, {
        type: 'git',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });
    recorder.startRecording();
    recorder2.startRecording();
    // console.log("soy recorder", recorder)

});


//#endregion

//#region TERMINAR GRABACION
//***************************************************
//EVENTO CLICK EN BOTON LISTO PARA TERMINAR GRABACION
//***************************************************

btnListo.addEventListener("click", function (e) {
    finTiempo = new Date();
    e.preventDefault();
    recorder.stopRecording(function () {
        blob = recorder.getBlob();

    });

    recorder2.stopRecording(function () {
        blob2 = recorder2.getBlob();
        video.src = video.srcObject = null;
        video.muted = false;
        video.volume = 1;
        video.src = URL.createObjectURL(recorder2.getBlob());

    });

    btnListo.style.display = "none";
    btnImgListo.style.display = "none";
    btnUploadGif.style.display = "block"
    btnRepetir.style.display = "block"
    playGif.style.display = "block";
    progreso.style.display = 'block';


    progreso.innerHTML = `
    <div id="barraProgreso"  class="barraProgreso">
    <div class="caja uno"></div>
    <div class="caja uno"></div>
    <div class="caja uno"></div>
    <div class="caja uno"></div>
    <div class="caja uno"></div>
    <div class="caja dos"></div>
    <div class="caja dos"></div>
    <div class="caja dos"></div>
    <div class="caja dos"></div>
    <div class="caja dos"></div>
    <div class="caja tres"></div>
    <div class="caja tres"></div>
    <div class="caja tres"></div>
    <div class="caja tres"></div>
    <div class="caja tres"></div>
    <div class="caja cuatro"></div>
    <div class="caja cuatro"></div>
    <div class="caja cuatro"></div>
    <div class="caja cuatro"></div>
    <div class="caja cuatro"></div>
</div> 
    `;

})

//#endregion

//#region  REPRODUCIR GIT ANTES DE SUBIR


playGif.addEventListener('click', function () {

    const uno = document.querySelectorAll('.uno');
    const dos = document.querySelectorAll('.dos');
    const tres = document.querySelectorAll('.tres');
    const cuatro = document.querySelectorAll('.cuatro');
    const caja = document.querySelectorAll('.caja');

    tiempoVideo = (finTiempo.getTime() - inicioTiempo.getTime()) / (1000) // 1000 milisegundos un segundo
    console.log('el tiempo del video es ', tiempoVideo)
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder2.getBlob());

    for (let i of caja) {
        i.style.background = '';
    }

    for (let i of uno) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }

        }, 1000);
    }
    for (let i of dos) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }
        }, 2000);
    }
    for (let i of tres) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }
        }, 3000);
    }

    for (let i of cuatro) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }
        }, tiempoVideo * 1000);
    }
})

function calcularSegundos() {
    video.addEventListener("timeupdate", function (ev) {
        time.innerHTML = hora(video.currentTime);
    }, true);
}

function hora(segundos) {
    var d = new Date(segundos * 1000);
    // Ajuste de las 23 horas
    var hora = (d.getHours() == 0) ? 23 : d.getHours() - 1;
    var hora = (hora < 9) ? "0" + hora : hora;
    var minuto = (d.getMinutes() < 9) ? "0" + d.getMinutes() : d.getMinutes();
    var segundo = (d.getSeconds() < 9) ? "0" + d.getSeconds() : d.getSeconds();
    return "00" + ":" + minuto + ":" + segundo;
}

//#endregion

//#region REPETIR CAPTURA

//******************************************
//*****EVENTO REPETIR CAPTURA GUIFO*********
//******************************************
btnRepetir.addEventListener("click", function (e) {

    recorder.destroy();
    // btnCapturar.click();
    btnListo.style.display = "none";
    btnImgListo.style.display = "none";
    btnUploadGif.style.display = "none";
    btnRepetir.style.display = "none";
    btnImgCaptura.style.display = "block";
    btnCapturar.style.display = "block";
    play.style.display = 'none';
    progreso.style.display = 'none';
    tiempoVideo = '';
    time.innerHTML = '00:00:00';

    iniciarGrabacion();
})
//#endregion

//#region CARGAR GUIFO
//******************************************
//************EVENTO CARGAR GUIFO***********
//******************************************
btnUploadGif.addEventListener("click", function () {
    let indicador = false;
    try {
        const resUpload = new Giphy();
        console.log("este es el blob hoy", blob)
        resUpload.postUploadGif(blob).then(result => {

            if (result.meta.status == 200) {
                indicador = true;
                finCarga();

                gifId = result.data.id;
                setTimeout(() => {
                    traerGuifoCargado(gifId);
                }, 2000);
            } else {
                alert("Hubo un error al cargar el GIF");

            }
        });
    } catch (error) {
        console.log("error" + error);
    }

    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());


    btnRepetir.style.display = 'none';
    btnUploadGif.style.display = 'none';
    play.style.display = 'none';
    progreso.style.display = 'none';
    temporizador.style.display = 'none';

    imgUpload.style.display = 'block';
    h2Upload.style.display = 'block';
    parrafoUpload.style.display = 'block';
    btnCancelarCarga.style.display = 'block';

    //creacion de estructura de la barra
    barraUpload.innerHTML = ` 
    <div id="barraProgresoUpload"  class="barraProgresoUpload">
                                <div class="box one"></div>
                                <div class="box one"></div>
                                <div class="box one"></div>
                                <div class="box one"></div>
                                <div class="box one"></div>
                                <div class="box one"></div>
                                <div class="box two"></div>
                                <div class="box two"></div>
                                <div class="box two"></div>
                                <div class="box two"></div>
                                <div class="box two"></div>
                                <div class="box two"></div>
                                <div class="box three"></div>
                                <div class="box three"></div>
                                <div class="box three"></div>
                                <div class="box three"></div>
                                <div class="box three"></div>
                                <div class="box three"></div>
                                <div class="box four"></div>
                                <div class="box four"></div>
                                <div class="box four"></div>
                                <div class="box four"></div>
                                <div class="box four"></div>
                            </div>
    `;



    //declaro variables para los estados de la barra

    const uno = document.querySelectorAll('.one');
    const dos = document.querySelectorAll('.two');
    const tres = document.querySelectorAll('.three');
    const cuatro = document.querySelectorAll('.four');
    const box = document.querySelectorAll('.box');


    //barra de progreso

    for (let i of box) {
        i.style.background = '';
    }

    for (let i of uno) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }

        }, 1000);
    }
    for (let i of dos) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }
        }, 1500);
    }
    for (let i of tres) {
        setTimeout(() => {
            if (temaLocalStorage == 'dia') {
                i.style.background = '#F7C9F3';
            } else {
                i.style.background = '#ee3efe';
            }
        }, 2500);
    }



    //funcion para terminar de llenar barra al finalizar carga

    function finCarga() {
        for (let i of cuatro) {
            if (indicador == true) {
                if (temaLocalStorage == 'dia') {
                    i.style.background = '#F7C9F3';
                } else {
                    i.style.background = '#ee3efe';
                }
            }
        }

    }


})

//#endregion

//#region CANCELAR CARGA GUIFO - VINCULO A INICIO

btnCancelarCarga.addEventListener('click', function () {

    window.location.href = './upload.html';
    
})

//#endregion

//#region TRAER GUIFO CARGADO
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
                misGuifosStorage.innerHTML = ``;
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

function mostrarGuifosStorage() {

    misGuifosStorage.innerHTML += ``;
    for (let i = 0; i <= localStorage.length - 1; i++) {
        if (localStorage.key(i).indexOf("gif") >= 0) {
            let clave = localStorage.key(i);
            // console.log("La clave " +  clave+ "contiene el valor " + localStorage.getItem(clave) + "");
            let objGuifos = JSON.parse(localStorage.getItem(clave));
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

//#region DESCARGAR GUIFO CREADO

btnDescargarGuifo.addEventListener('click', function () {
    console.log(invokeSaveAsDialog(blob));
})

//#endregion 

//#region COPIAR ENLACE GUIFO

btnCopiarEnlace.addEventListener('click', function () {

    copiarTextoPortapapeles(url);

})

//funcion para copiar texto en portapapeles
function copiarTextoPortapapeles(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

//#endregion

//#region EVENTO BOTON VISTA CARGA DE GIF 

btnCreadoListo.addEventListener('click', function () {
    contentGuifoCreado.style.display = 'none';

})

//#endregion
