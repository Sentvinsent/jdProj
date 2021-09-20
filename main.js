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

    let method = 'search';
    let title = document.getElementById("srchInp").value;
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}&page=${page}`;

    await loadData(url);
    populateSearchData(filmsObjBuild(fetchResult));
    createPagination(totalPages, page, method);
    page = 1;
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

async function discoverFilms() {
    let method = 'disc';
    let genId = document.getElementById('genreSel').value;
    let url = `${baseURL}discover/movie?api_key=${key}&with_genres=${genId}&page=${page}`;
    await loadDiscData(url);
    populateSearchData(filmsObjBuild(fetchResult));
    createPagination(totalPages, page, method);
    page = 1;
}