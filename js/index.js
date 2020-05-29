$(function () {
    const urlPage = getUrlValue("page");
    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);

    let max = 48;
    let skip = (currentPageNum - 1) * max;

    loadRecentPhotos(skip, max);
});


function loadRecentPhotos(skip = 0, max = 48) {
    axios.get(`http://localhost:3000/photos?public=true&_sort=id&_order=desc`)
        .then(function (response) {
            if (response.status == 200) {
                let photos = response.data;
                let remainingPhotos = false;

                // Filter photos (remove photos from more than a week ago)
                /*
                let now = new Date();
                photos = photos.filter(function (photo) {
                    let photoDate = new Date(photo.date);
                    let daysDif = (now - photoDate) / (1000*60*60*24);

                    return daysDif < 7;
                });
                //*/

                photos = photos.slice(skip);

                if (photos.length > max) {
                    remainingPhotos = true;
                    photos.splice(max);
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