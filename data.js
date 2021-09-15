//fetch data
async function loadData(url) {
    let result = await fetch(url);
    let data = await result.json();
    let genFet = await fetch(`${baseURL}genre/movie/list?api_key=${key}`);
    let gen = await genFet.json();
    genres = await gen.genres;
    fetchResult = await data.results;
    totalPages = data.total_pages;

    let testFetchUrl = `${baseURL}search/movie?api_key=${key}&query=test`;
    let testRes = await fetch(testFetchUrl);
    let testData = await testRes.json();
    console.log ('test Data', testData)
}

//building the films object from the fetch results
function filmsObjBuild(dataObj) {
    let filmsData = dataObj.map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': baseImgUrl + obj.poster_path,
            'genre': obj.genre_ids
        };
        return fimsDataObj;
    })
    return filmsData;
}

//genres filter function
function genreFilter(genre) {
    let filmsObj = JSON.parse(sessionStorage.getItem('fimsDataObj'));
    console.log('films', filmsObj);

}