// API reference: https://developers.themoviedb.org/3/getting-started/introduction

const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';
let currPage;

//takes the input value and search DB with it
let search = async function() {
    currPage = 1;
    const srchResDivVar = document.getElementById('srchResDiv');
    let title = document.getElementById("srchInp").value;
    srchResDivVar.innerHTML = '';
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}`;
    let result = await fetch(url);
    let data = await result.json();

    let filmsArray = data.results;
    let filmsData = filmsArray.map(obj => {
        let fimsDataObj = {
            'title': obj.title,
            'rating': obj.vote_average,
            'description': obj.overview,
            'image': 'https://image.tmdb.org/t/p/w500/' + obj.poster_path
        };
        return fimsDataObj;
    })
    sessionStorage.setItem("foundFilma", JSON.stringify(filmsData));
    populateSearchData(filmsData);
    paginate(filmsData);
}

//populates the result data into the result Div
function populateSearchData(filmsData) {

    const srchResDivVar = document.getElementById('srchResDiv');
    let pageData = filmsData.slice(0, 10);

    const newD = document.createElement('div');
    newD.className = "srchResDivClass";
    newD.setAttribute('id', 'srchResDiv');



    pageData.forEach(element => {
        const newH = document.createElement('h2');
        newH.innerText = element.title;
        const newI = document.createElement('img');
        newI.src = element.image;
        const newT = document.createElement('p');
        newT.innerText = element.description;
        const line = document.createElement('hr');
        line.className = 'line';
        newD.appendChild(newH);
        newD.appendChild(newI);
        newD.appendChild(newT);
        newD.appendChild(line);
    });

    srchResDivVar.replaceWith(newD);
}

//pagination function
function paginate(arr) {
    const paginationDivVar = document.getElementById('paginationDiv');
    const nextPageVar = document.getElementById('nextPage');

    let pageSize = 10;
    let pages = Math.ceil(arr.length / pageSize);

    const newPag = document.createElement('span');
    newPag.className = "paginationClass";
    //newPag.setAttribute('id', 'paginationDiv');

    for (var i = 0; i < pages; i++) {
        const newP = document.createElement('button');
        newP.className = 'pagButton';
        newP.innerHTML = i + 1;
        newPag.appendChild(newP);
    }

    paginationDivVar.insertBefore(newPag, nextPageVar);

    //pagination event listners
    document.querySelectorAll('.pagButton').forEach(item => {
        item.addEventListener('click', event => {
            let pageData = pageChange(item.innerHTML, pages);
            populateSearchData(pageData);
        })
    })
}

//page change
function pageChange(page, pages) {
    if (page === '«') currPage = 1;
    else if (page === '»') currPage = pages;
    else if (page === '←') currPage = currPage - 1;
    else if (page === '→') currPage = currPage + 1;
    else currPage = page;
    let filmsData = JSON.parse(sessionStorage.getItem("foundFilma"));
    return filmsData.slice((currPage - 1) * 10, currPage * 10);
}

//get to Films
let topTen = async function() {
    let url = `${baseURL}movie/top_rated?api_key=${key}&language=en-US&page=1`;

    let result = await fetch(url);
    let data = await result.json();
    let filmsArray = data.results;
    let filmsData = filmsArray.slice(0, 10).map(obj => {
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
document.getElementById('topTenButton').addEventListener('click', topTen);