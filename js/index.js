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

                appendPhotos($("#index-gal"), photos);
                updatePagination(remainingPhotos);
            }
        })
        .catch(function (error) {
            console.log("Error al pedir las fotos: " + error);
        });
}