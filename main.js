// API reference: https://developers.themoviedb.org/3/getting-started/introduction

//variables
const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

let fetchResult;
let totalPages;
let genres;
let page = 1;

//takes the input value and search DB with it
let search = async function () {
    clearSrch;

    let title = document.getElementById("srchInp").value;
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}&page=${page}`;

    await loadData(url);
    populateSearchData(filmsObjBuild(fetchResult));
    createPagination(totalPages, page);
    genreDropBuild(genres);
    showFilBtn();
    
}

//get top Films
async function topFilms() {
    clearSrch;
    let filmsNumber = document.getElementById('topFilms').value;
    let url = `${baseURL}movie/top_rated?api_key=${key}&language=en-US&page=1`;
    await loadData(url);
    let filmsData = filmsObjBuild(fetchResult.slice(0, filmsNumber));
    populateSearchData(filmsData);
}
//function to clear the search results
function clearSrch() {
    document.getElementById('srchResDiv').innerHTML = '';
    document.querySelector(".pagination ul").innerHTML = '';
    document.getElementById('filersDiv').classList.add('hidden');
    document.getElementById('filtersBtn').classList.add('hidden');
}

//function to show filters
function showFilters() {
    console.log (document.getElementById('genreSel').value);
    document.getElementById('filersDiv').classList.remove('hidden');
    document.getElementById('filtersBtn').classList.add('hidden');
    document.getElementById('hideFiltersBtn').classList.remove('hidden');
}

//
function showFilBtn(){
    document.getElementById('filersDiv').classList.add('hidden');
    document.getElementById('filtersBtn').classList.remove('hidden');
    document.getElementById('hideFiltersBtn').classList.add('hidden');
}