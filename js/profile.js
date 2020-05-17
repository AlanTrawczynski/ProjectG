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
    $("#profile-name").text(user.name + " " + user.surname);
    $("#profile-email").text(user.email);
    $("#profile-username").text("@" + user.user);

    $("#profile-follow-btn").hide();
    $("#profile-private-photos-link").hide();

    // Load public photos
    getUserPhotos(user.id).then(function (response) {
        let publicPhotos = response.data;

        if (publicPhotos.length > 0) {
            $("#profile-no-public-photos-info").hide();
            appendPhotos("profile-public-gal", publicPhotos, true);
        }
    });
    
    if (user.id != getLoggedUserId()) {
        $("#profile-follow-btn").show();
    }
    else {
        $("#profile-private-photos-link").show();

       // Load private photos
        getUserPhotos(user.id, false).then(function (response) {
            let privatePhotos = response.data;

            if (privatePhotos.length > 0) {
                $("#profile-no-private-photos-info").hide();
                appendPhotos("profile-private-gal", privatePhotos, true);
            }
        });
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