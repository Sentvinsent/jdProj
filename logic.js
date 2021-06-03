// API reference: https://developers.themoviedb.org/3/getting-started/introduction

const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';

//takes the input value and search DB with it
let search = async function() {
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
    populateSearchData(filmsData);
}

//populates the result data into the result Div
function populateSearchData(filmsData) {
    const srchResDivVar = document.getElementById('srchResDiv');
    const newD = document.createElement('div');
    newD.className = "srchResDivClass";
    newD.setAttribute('id', 'srchResDiv');
    filmsData.forEach(element => {
        const newH = document.createElement('h2');
        newH.innerText = element.title;
        newH.className = 'insideResEl';
        const newI = document.createElement('img');
        newI.className = 'insideResEl';
        newI.src = element.image;
        const newT = document.createElement('p');
        newT.innerText = element.description;
        newT.className = 'insideResEl';
        const line = document.createElement('hr');
        line.className = 'line';
        newD.appendChild(newH);
        newD.appendChild(newI);
        newD.appendChild(newT);
        newD.appendChild(line);
    });
    srchResDivVar.replaceWith(newD);
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