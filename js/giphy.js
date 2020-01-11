//CLASE GIPHY
class Giphy {
    constructor(search) {
        this.apiKey = 'Ot8LkNZiCNqOlYdTfvzfCHNlwW4fgXxo';
        this.search = search;
    }
    async getSearchResults() {

        try {

            let api = await fetch('http://api.giphy.com/v1/gifs/search?q=' + this.search + '&api_key=' + this.apiKey);
            let found = await api.json();
            return found;

        } catch(error){

           console.log(error);

        }

    }
}

//DECLARAR VARIABLES
var imagen = document.querySelector('#resultTend');


//EJECUTAR CLASE Y METODOS

const gif = new Giphy('perro');
gif.getSearchResults().then((result) => {

    imagen.innerHTML = ``;
    for (let i of result.data) {
        imagen.innerHTML += `
    <div class="img-tendencia">
        <img src="${i.images.fixed_height.webp}" alt="">
        <label id="lblImg">${i.title}</label>
    </div>
    `;
    }
});


