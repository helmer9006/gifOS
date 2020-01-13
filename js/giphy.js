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


