$(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlPage = urlParams.get('page');

    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);

    let max = 6;
    let from = (currentPageNum - 1)*max;

    loadRecentPhotos(from, max);
});


function loadRecentPhotos(from = 0, max = 50) {
    axios.get(`http://localhost:3000/photos?_sort=id&_order=desc&_start=${from}&_end=${from + max + 1}`)
        .then(function (response) {
            if (response.status == 200) {
                let photos = response.data;
                let remainingPhotos = false;

                if (photos.length > max) {
                    remainingPhotos = true;
                    photos.pop();
                } else if (photos.length == 0){
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
        axios.get(`http://localhost:3000/users/${photo.userId}`)
            .then(function (response) {
                if (response.status == 200) {
                    let user = response.data;

                    let photoHtml = generatePhoto(photo, user);
                    $("#index-gal").append(photoHtml);

                    $("#index-gal > :last-child > :first-child").click(function () {
                        updatePhotoModal(this.lastElementChild.textContent);
                    });
                }
            })
            .catch(function (error) {
                console.log("Error al pedir el username: " + error);
            })
    }
}


function generatePhoto(photo, user) {
    let photoHtml;

    if (isLogged()) {
        photoHtml = `
            <div class='gal-photo-container'>
                <div class='pointer' data-toggle="modal" data-target="#photo-modal">  
                    <img class='gal-photo' src="${photo.url}">
                    <span hidden>${photo.id}</span>
                </div>
                <a class='photo-overlay photo-overlay-l' href="profile.php">
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </a>

                <div class='photo-overlay photo-overlay-r'>
                    <button type='button' class='btn btn-vote'>
                        <i class="fa fa-minus-circle fa-inverse" aria-hidden="true"></i>
                    </button>
                    <span>${photo.upvotes - photo.downvotes}</span>
                    <button type='button' class='btn btn-vote'>
                        <i class="fa fa-plus-circle fa-inverse" aria-hidden="true"></i>
                    </button>
                </div>   
            </div>`;
    } else {
        photoHtml = `
            <div class='gal-photo-container'>
                <div class='pointer' data-toggle="modal" data-target="#photo-modal">  
                    <img class='gal-photo' src="${photo.url}">
                    <span hidden>${photo.id}</span>
                </div>
                <div class='photo-overlay photo-overlay-l'>
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </div>
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