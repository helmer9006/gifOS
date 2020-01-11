//IMPORT CLASS
import Giphy from '/js/giphy.js'

var imagen = document.querySelector('#resultTend');



// INSTANCIANDO CLASES Y METODOS

// #region TENDENCIAS
const tendencia = new Giphy();
tendencia.getTrending().then((result) => {

    imagen.innerHTML = ``;
    for (let i of result.data) {
        imagen.innerHTML += `
    <div class="img-tendencia">
        <img src="${i.images.fixed_height.webp}" alt="">
        <label id="lblImg">${i.title}</label>
    </div>
    `;
    }
    
})


//#endregion

// #region SUGERENCIAS

const sugerencias = new Giphy();
sugerencias.getSuggestions().then((result) => {
    console.log(result);
})



//#endregion