// API reference: https://developers.themoviedb.org/3/getting-started/introduction

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
    populateSearchData(filmsData, totalPages);
    createPagination(totalPages, page);
}

//populates the result data into the result Div
function populateSearchData(filmsData, totalPages) {

    const srchResDivVar = document.getElementById('srchResDiv');
    const newD = document.createElement('div');
    newD.className = "srchResDivClass";
    newD.setAttribute('id', 'srchResDiv');



    filmsData.forEach(element => {
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

//get to Films
async function topFilms() {
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


//pagination

//calling function with passing parameters and adding inside element which is ul tag

function createPagination(totalPages, page) {
    const paginEl = document.querySelector(".pagination ul");
    let liTag = '';
    let active;
    totalPages = totalPages;
    let beforePage = page - 1;
    let afterPage = page + 1;

    //Show the button 'prev' if the page is greater than 1
    if (page > 1) {
        liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1}), page=${page - 1}, search()"><span><i class="fas fa-angle-left"></i>Prev</span></li>`;
    }
    //Add 1st page if the current page is greater than 2
    if (page > 2) {
        liTag += `<li class="first numb" onclick="createPagination(totalPages, 1), page=1, search()"><span>1</span></li>`;
        //Add '...' after the 1st page if  the current page is greater than 3
        if (page > 3) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }


    //Handle how many pages are shown before the current page
    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }
    //Handle how many pages are shown after the current page
    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }



    for (let plength = beforePage; plength <= afterPage; plength++) {
        if (plength > totalPages) { //if plength is greater than totalPage length then continue
            continue;
        }
        if (plength == 0) { //if plength is 0 than add +1 in plength value
            plength = plength + 1;
        }
        if (page == plength) { //if page is equal to plength than assign active string in the active variable
            active = "active";
        } else { //else leave empty to the active variable
            active = "";
        }
        liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength}), page=${plength}, search()"><span>${plength}</span></li>`;
    }



    //Add last page if the current page is less than total pages - 1 
    if (page < totalPages - 1) {
        //Add '...'  if the current page is less than total pages - 2 
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages}), page=${totalPages}, search()"><span>${totalPages}</span></li>`;
    }

    //Show the 'next' button if the current page is less than total pages
    if (page < totalPages) {
        liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1}), page=${page + 1}, search()"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    }
    //Add pagination elements html into the ul tag
    paginEl.innerHTML = liTag;
}