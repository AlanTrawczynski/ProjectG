$(function () {
    const urlPage = getUrlValue("page");
    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);

    let max = 50;
    let skip = (currentPageNum - 1) * max;

    loadRecentPhotos(skip, max);
});


function loadRecentPhotos(skip = 0, max = 50) {
    getUser(getLoggedUserId()).then(function (response) {
        let loggedUserFollowing = response.data.following;

        axios.get(`http://localhost:3000/photos?public=true&_sort=id&_order=desc`)
        .then(function (response) {
            if (response.status == 200) {
                let photos = response.data.filter(photo => loggedUserFollowing.includes(photo.userId)).slice(skip);
                let remainingPhotos = false;

                if (photos.length > max) {
                    remainingPhotos = true;
                    photos.splice(max);
                }
                else if (photos.length == 0 && loggedUserFollowing.length > 0) {
                    window.location.href = "following.php";
                }

                appendPhotos("following-gal", photos);
                updatePagination(remainingPhotos);
            }
        })
        .catch(function (error) {
            console.log("Error al pedir las fotos: " + error);
        });
    });
}