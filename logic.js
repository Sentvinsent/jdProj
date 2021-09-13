// API reference: https://developers.themoviedb.org/3/getting-started/introduction

//variables
const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

let fetchResult;
let totalPages;
let page = 1;

//takes the input value and search DB with it
let search = async function () {
    clearSrch;

    let title = document.getElementById("srchInp").value;
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}&page=${page}`;

    await loadData(url);
    populateSearchData(filmsObjBuild(fetchResult));
    createPagination(totalPages, page);
}

//populates the result data into the result Div
function populateSearchData(filmsData) {
    const srchResDivVar = document.getElementById('srchResDiv');
    let divHtml = '';
    
    filmsData.forEach(element => {
        if (element.image != baseImgUrl + 'null') {
            divHtml += `<h2>${element.title}</h2>
            <img src="${element.image}">
            <p>${element.description}</p>
            <hr class='line'>`;
        }
    })
    srchResDivVar.innerHTML = divHtml;
}

//get to Films
async function topFilms() {
    clearSrch;
    let filmsNumber = document.getElementById('topFilms').value;
    let url = `${baseURL}movie/top_rated?api_key=${key}&language=en-US&page=1`;
    await loadData(url);
    let filmsData = filmsObjBuild(fetchResult.slice(0, filmsNumber));
    populateSearchData(filmsData);
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

//fetch data
async function loadData(url) {
    let result = await fetch(url);
    let data = await result.json();
    fetchResult = await data.results;
    totalPages = data.total_pages;
}

//function to clear the search results
function clearSrch() {
    document.getElementById('srchResDiv').innerHTML = '';
    document.querySelector(".pagination ul").innerHTML = '';
}
//event listeners
document.getElementById('srchBtn').addEventListener('click', search);
document.getElementById('topTenButton').addEventListener('click', topFilms);
document.getElementById('clearBtn').addEventListener('click', clearSrch)