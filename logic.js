// API reference: https://developers.themoviedb.org/3/getting-started/introduction


//imports
import { createPagination } from "./pagination.js";
//variables
const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';
let totalPages;
let page = 1;

//takes the input value and search DB with it
let search = async function () {
    const srchResDivVar = document.getElementById('srchResDiv');
    let title = document.getElementById("srchInp").value;
    srchResDivVar.innerHTML = '';
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}&page=${page}`;
    let result = await fetch(url);
    let data = await result.json();
    console.log('data', data)

    let filmsArray = data.results;
    totalPages = data.total_pages;

    let filmsData = filmsArray.map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': 'https://image.tmdb.org/t/p/w500/' + obj.poster_path
        };
        return fimsDataObj;
    })
    populateSearchData(filmsData);
    createPagination(totalPages, page);
}

//populates the result data into the result Div
function populateSearchData(filmsData) {

    const srchResDivVar = document.getElementById('srchResDiv');
    let divHtml = '';
    filmsData.forEach(element => {
        if (element.image != 'https://image.tmdb.org/t/p/w500/null') {
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
    document.querySelector(".pagination ul").innerHTML = '';
    let filmsNumber = document.getElementById('topFilms').value;
    let url = `${baseURL}movie/top_rated?api_key=${key}&language=en-US&page=1`;

    let result = await fetch(url);
    let data = await result.json();
    let filmsArray = data.results;
    let filmsData = filmsArray.slice(0, filmsNumber).map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': 'https://image.tmdb.org/t/p/w500/' + obj.poster_path
        };
        return fimsDataObj;
    })
    populateSearchData(filmsData);
}

//event listeners
document.getElementById('srchBtn').addEventListener('click', search);
document.getElementById('topTenButton').addEventListener('click', topFilms);