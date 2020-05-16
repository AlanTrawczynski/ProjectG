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

                appendPhotos("index-gal", photos);
                updatePagination(remainingPhotos);
            }
        })
        .catch(function (error) {
            console.log("Error al pedir las fotos: " + error);
        });
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