//fetch data
async function loadData(url) {
    let result = await fetch(url);
    let data = await result.json();
    fetchResult = await data.results;
    totalPages = data.total_pages;
}

//building the films object from the fetch results
function filmsObjBuild(dataObj) {
    let filmsData = dataObj.map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': baseImgUrl + obj.poster_path
        };
        return fimsDataObj;
    })
    return filmsData;
}