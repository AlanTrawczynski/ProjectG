$(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');

    $.ajax({
        url: `http://localhost:3000/users/${userId}`,
        success: updateProfile,
        error: function () {
            console.log("El perfil al que se intenta acceder no existe.");
            window.location.href = "index.php";
        }
    });
});


function updateProfile(user) {
    let followBtn = $("#profile-follow-btn");
    let privatePhotosLink = $("#profile-private-photos-link");

    $("#profile-name").text(user.name + " " + user.surname);
    $("#profile-email").text(user.email);
    $("#profile-username").text(user.user);

    followBtn.hide();
    privatePhotosLink.hide();

    // Load public photos
    getUserPhotos(user.id).then(function (response) {
        let publicPhotos = response.data;

        if (publicPhotos.length > 0) {
            $("#profile-no-public-photos-info").hide();
            appendPhotos($("#profile-public-gal"), publicPhotos, true);
        }
    });

    if (user.id != getLoggedUserId()) {
        updateFollowBtn(followBtn, user.id);
    }
    else {
        // Load private photos
        getUserPhotos(user.id, false).then(function (response) {
            let privatePhotos = response.data;

            if (privatePhotos.length > 0) {
                $("#profile-no-private-photos-info").hide();
                appendPhotos($("#profile-private-gal"), privatePhotos, true);
            }
        });

        privatePhotosLink.show();
    }

    showPublicPhotos();
}


function showPublicPhotos() {
    $("#profile-private-gal-container").hide();
    $("#profile-public-gal-container").show();
    $("#profile-public-photos-link > a").addClass("active");
    $("#profile-private-photos-link > a").removeClass("active");
}

function showPrivatePhotos() {
    $("#profile-public-gal-container").hide();
    $("#profile-private-gal-container").show();
    $("#profile-public-photos-link > a").removeClass("active");
    $("#profile-private-photos-link > a").addClass("active");
} 