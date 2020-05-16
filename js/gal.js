$(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlPage = urlParams.get('page');

    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);

    let max = 50;
    let from = (currentPageNum - 1) * max;

    loadRecentPhotos(from, max);
});


function loadRecentPhotos(from = 0, max = 50) {
    axios.get(`http://localhost:3000/photos?public=true&_sort=id&_order=desc&_start=${from}&_end=${from + max + 1}`)
        .then(function (response) {
            if (response.status == 200) {
                let photos = response.data;
                let remainingPhotos = false;

                if (photos.length > max) {
                    remainingPhotos = true;
                    photos.pop();
                }
                else if (photos.length == 0) {
                    window.location.href = "index.php";
                }

                appendPhotos(photos);
                updatePagination(remainingPhotos);
            }
        })
        .catch(function (error) {
            console.log("Error al pedir las fotos: " + error);
        });
}


function appendPhotos(photos) {
    for (let photo of photos) {
        // Get photo owner info
        getUser(photo.userId)
            .then(function (response) {
                if (response.status == 200) {
                    let user = response.data;

                    // If current user is logged, get his vote info
                    if (isLogged()) {
                        getVote(photo.id, getLoggedUserId())
                            .then(function (response) {
                                let isPositive = response.data.length == 0 ? null : response.data[0].positive;
                                let photoHtml = generatePhoto(photo, user, isPositive);

                                appendPhoto(photoHtml);
                            });
                    }
                    // Else there is not vote info
                    else {
                        let photoHtml = generatePhoto(photo, user, null);

                        appendPhoto(photoHtml);
                    }
                }
            });
    }
}


// Appends the photo and add event handler
function appendPhoto(photoHtml) {
    $("#index-gal").append(photoHtml);
    $("#index-gal > :last-child > :nth-child(2)").click(function () {
        updatePhotoModal($(this).siblings().first().text());
    });
}


function generatePhoto(photo, user, isPositive) {
    let photoHtml;

    if (isLogged() && getLoggedUserId() != photo.userId) {
        photoHtml = `
            <div class='gal-photo-container'>
                <span hidden>${photo.id}</span>
                <div class='pointer' data-toggle="modal" data-target="#photo-modal">  
                    <img class='gal-photo' src="${photo.url}">
                </div>
                <a class='photo-overlay photo-overlay-l' href="profile.php">
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </a>

                <div class='photo-overlay photo-overlay-r'>
                    <button type='button' class='btn btn-vote' onclick='downvote($(this).parent().siblings().first().text())'>`

        photoHtml += !isPositive && isPositive !== null ?
            `       <i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `       <i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse" aria-hidden="true"></i>`;

        photoHtml += `    
                    </button>
                    <span id='gal-photo-score-${photo.id}'>${photo.upvotes - photo.downvotes}</span>
                    <button type='button' class='btn btn-vote' onclick='upvote($(this).parent().siblings().first().text())'>`

        photoHtml += isPositive ?
            `       <i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `       <i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse" aria-hidden="true"></i>`;

        photoHtml += `
                    </button>
                </div>   
            </div>`;
    }
    else {
        let disabled = isLogged() ? "" : "disabled";

        photoHtml = `
            <div class='gal-photo-container'>
                <span hidden>${photo.id}</span>
                <div class='pointer' data-toggle="modal" data-target="#photo-modal">  
                    <img class='gal-photo' src="${photo.url}">
                </div>
                <a class='photo-overlay photo-overlay-l ${disabled}' href="profile.php">
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </a>
            </div>`;
    }

    return photoHtml;
}


function updatePagination(nextPage = false) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlPage = urlParams.get('page');
    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);

    let prevIco = $("#index-previous-page-ico");
    let prev = $("#index-previous-page");
    let current = $("#index-current-page");
    let next = $("#index-next-page");
    let nextIco = $("#index-next-page-ico");

    prev.children().text(currentPageNum - 1);
    current.children().text(currentPageNum);
    next.children().text(currentPageNum + 1);

    prevIco.children()[0].href = `index.php?page=${currentPageNum - 1}`;
    prev.children()[0].href = `index.php?page=${currentPageNum - 1}`;
    current.children()[0].href = `index.php?page=${currentPageNum}`;
    next.children()[0].href = `index.php?page=${currentPageNum + 1}`;
    nextIco.children()[0].href = `index.php?page=${currentPageNum + 1}`;

    if (currentPageNum == 1) {
        prevIco.addClass("disabled");
        prev.hide();
    }
    else {
        prevIco.removeClass("disabled");
        prev.show();
    }

    if (nextPage) {
        next.show();
        nextIco.removeClass("disabled");
    }
    else {
        next.hide();
        nextIco.addClass("disabled");
    }

    for (let i = currentPageNum - 2; i > currentPageNum - 10 && i > 0; i--) {
        tempPagHtml = `
            <li class="page-item temp-pagination">
                <a class="page-link" href="index.php?page=${i}">${i}</a>
            </li>`
        prevIco.after(tempPagHtml);
    }
}