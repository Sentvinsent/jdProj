

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

//function that builds pagination based on the passed parameters
function createPagination(totalPages, page) {
    const paginEl = document.querySelector(".pagination ul");
    let liTag = '';
    let active;
    totalPages = totalPages;
    let beforePage = page - 1;
    let afterPage = page + 1;

    //Show the button 'prev' if the page is greater than 1
    if (page > 1) {
        liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1}), page=${page - 1}, search()"><span>Prev</span></li>`;
    }
    //Add 1st page if the current page is greater than 2
    if (page > 2) {
        liTag += `<li class="first numb" onclick="createPagination(totalPages, 1), page=1, search()"><span>1</span></li>`;
        //Add '...' after the 1st page if  the current page is greater than 3
        if (page > 3) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }

    //Handle the cases with the different number of total page (In case the total number of page is 3 or less no need to change the beforePage and afterPage variables)
    if (totalPages > 4) {
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
    } else if (totalPages == 4) {
        if (page == totalPages) {
            beforePage = beforePage - 1;
        }
        if (page == 1) {
            afterPage = afterPage + 1;
        }
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
        liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1}), page=${page + 1}, search()"><span>Next</span></li>`;
    }
    //Add pagination elements html into the ul tag
    paginEl.innerHTML = liTag;
}

//building the genres dropdown
function genreDropBuild(genArray) {
    const genreDropVar = document.getElementById('genreSel');
    let selHtml = `<option value=''>Any</option>`;
    console.log('gen', genArray)
    genArray.forEach(element => {
        selHtml += `<option value=${element.id}>${element.name}</option>`
       
    })
    genreDropVar.innerHTML = selHtml;
}