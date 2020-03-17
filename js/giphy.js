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

            let api = await fetch('https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&q=' + this.search + '&limit=12&offset=0&rating=G&lang=en');
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

    async postUploadGif(blob) {
        try {

            let dato = new FormData();
            dato.append("file", blob, 'example.gif');
            let api = await fetch('https://upload.giphy.com/v1/gifs?api_key=' + this.apiKey, {
                method: 'POST',
                body: dato,
                header: "access-control-allow-origin: *"
            });

            let res = await api.json();
            return res;

        } catch (error) {

            console.log(error);
            return error;
        }
    }

    async getUploadGif(gitId) {
        try {

            let gifCargado = await fetch('https://api.giphy.com/v1/gifs/' + gitId + '?api_key=' + this.apiKey);
            let gif = await gifCargado.json();
            return gif;

        } catch (error) {

            console.log(error);
        }
    }

    //#endregion

}
