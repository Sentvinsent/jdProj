//fetch data
async function loadData(url) {
    let result = await fetch(url);
    let data = await result.json();
    fetchResult = await data.results;
    totalPages = data.total_pages;
}

//load genres data
async function loadGenres() {
    let genFet = await fetch(`${baseURL}genre/movie/list?api_key=${key}`);
    let gen = await genFet.json();
    genres = await gen.genres;
}

//building the films object from the fetch results
function filmsObjBuild(dataObj) {
    let filmsData = dataObj.map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': baseImgUrl + obj.poster_path,
            //'genre': obj.genre_ids
        };
        return fimsDataObj;
    })
    return filmsData;
}

//Discover films passing the selected parameters into the fetch request
async function loadDiscData(url) {
    let discFetch = await fetch(url);
    let data = await discFetch.json();
    fetchResult = await data.results;
    totalPages = data.total_pages;
}