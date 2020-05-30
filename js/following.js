$(function () {
    const urlPage = getUrlValue("page");
    let currentPage = urlPage == null ? 1 : parseInt(urlPage, 10);

    let max = 48;
    let skip = (currentPage - 1) * max;

    loadFollowingPhotos(skip, max);
});


function loadFollowingPhotos(skip = 0, max = 48) {
    getLoggedUser().then(function (response) {
        let following = response.data.following;    // Array of usersIds followed by loggedUser

        axios.get(`http://localhost:3000/photos?public=true&_sort=id&_order=desc`)
            .then(function (response) {
                let photos = response.data.filter(photo => following.includes(photo.userId)).slice(skip);
                let remainingPhotos = false;

                if (photos.length > max) {
                    remainingPhotos = true;
                    photos.splice(max);
                }
                else if (photos.length == 0 && following.length > 0) {
                    window.location.href = "following.php";
                }

                appendPhotos($("#following-gal"), photos);
                updatePagination(remainingPhotos);
            })
            .catch(function (error) {
                console.log("Error al pedir las fotos: " + error);
            });
    });
}