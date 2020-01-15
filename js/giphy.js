//CLASE GIPHY 

export default class Giphy {

    //CONSTRUCTOR
    constructor(search) {
        this.apiKey = 'Ot8LkNZiCNqOlYdTfvzfCHNlwW4fgXxo';
        this.search = search;
    }

    //*************************************************//
    // #region METODOS 
    //*************************************************//

    //#region METODOS

    async getSearchResults() {

        try {
            
            
            let api = await fetch('http://api.giphy.com/v1/gifs/search?q=' + this.search + '&api_key=' + this.apiKey);
            let found = await api.json();
            return found;

        } catch (error) {

            console.log(error);

        }

    }

    async getTrending() {

        try {

            let api = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=' + this.apiKey + '&limit=24&rating=G');
            let found = await api.json();
            return found;

        } catch (error) {

            console.log(error);
        }

    }

    async getSuggestions() {
        try {

            let api = await fetch('https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&q=desarrollador&limit=4&offset=0&rating=G&lang=es');

            let found = await api.json();
            return found;

        } catch (error) {

            console.log(error);
        }
    }

    //#endregion

}


// var result_busqueda = document.querySelector("#result_busqueda");//div para cargar imagenes de la busqueda


var txtBuscar = document.querySelector("#txtBuscar").value;
var btnBuscar = document.querySelector("#btnBuscar");
var result_busqueda = document.querySelector("#result_busqueda");

btnBuscar.addEventListener("click", async function() {



    let api = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Ot8LkNZiCNqOlYdTfvzfCHNlwW4fgXxo&q=' + txtBuscar + '&limit=24&offset=0&rating=G&lang=es');
    let found = await api.json();
    console.log(found);
    for (let i of found.data) {
                 //  console.log(i)
        
                  result_busqueda.innerHTML += `
                  <div class="img-tendencia">
                       <img src="${i.images.fixed_height.url}" alt="">
                      <label id="lblImg">#${i.title}</label>
                   </div>
                  `;
              }

});







// var result_busqueda = document.querySelector("#result_busqueda");//div para cargar imagenes de la busqueda

//     getSearchResults(txtbuscar).then(result => {

//       result_busqueda.innerHTML = ``;
//       for (let i of result.data) {
//           console.log(i)

//        result_busqueda.innerHTML += `
//         <div class="img-tendencia">
//             <img src="${i.images.fixed_height.url}" alt="">
//             <label id="lblImg">#${i.title}</label>
//         </div>
//          `;
//       }
//});