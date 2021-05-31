// API reference: https://developers.themoviedb.org/3/getting-started/introduction

const key = '5ea363cd1fe377e3ae1dcc973693a928';
const baseURL = 'https://api.themoviedb.org/3/';
const srchResDivVar = document.getElementById('srchResDiv');


//takes the input value and search DB with it
let search = function() {
    let title = document.getElementById("srchInp").value;
    srchResDivVar.innerHTML = '';
    let url = `${baseURL}search/movie?api_key=${key}&query=${title}`;

    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
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
        })

}

//populates the result data into the result Div
function populateSearchData(filmsData) {
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
        srchResDivVar.appendChild(newH);
        srchResDivVar.appendChild(newI);
        srchResDivVar.appendChild(newT);
        srchResDivVar.appendChild(line);
    });
}

//get to Films
let topTen = function() {
        let url = `${baseURL}movie/top_rated?api_key=${key}&language=en-US&page=1`;

        fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
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
            })
    }
    //event listeners
document.getElementById('srchBtn').addEventListener('click', search);
document.getElementById('topTenButton').addEventListener('click', topTen);