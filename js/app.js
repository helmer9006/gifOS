
var imagen = document.querySelector('#img');

// var result = traerResultadoBusqueda('gato');


function traerResultadoBusqueda(search) {
    var apiKey = 'Ot8LkNZiCNqOlYdTfvzfCHNlwW4fgXxo';
    fetch('http://api.giphy.com/v1/gifs/search?q=' + search +
        '&api_key=' + apiKey)
        .then(res => res.json())
        .then(datos => {

            imagen.innerHTML = ``;
            for (let i of datos.data) {
                imagen.innerHTML += `
                <img src="${i.images.fixed_height.url}" alt="imagen busquedas"  class="img-fluid">
                <li>${i.title}</li>
            `;
            }
        })
        .catch((error) => {
            return error
        })

}

