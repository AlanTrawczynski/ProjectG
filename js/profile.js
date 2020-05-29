$(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');

    // Update profile
    $.ajax({
        url: `http://localhost:3000/users/${userId}`,
        success: updateProfile,
        error: function () {
            console.log("El perfil al que se intenta acceder no existe.");
            window.location.href = "index.php";
        }
    });

    // Load profile picture preview
    $("#changeProfilePic-url").on("input", function () {
        updateProfilePicPreview(this.value);
    });

    // Load changeProfilePic submit handler and add auto-validation to url input
    addAutoValidation($("#changeProfilePic-url"), checkUrl);

    $("#changeProfilePic-form").submit(function (event) {
        event.preventDefault();
        $("#changeProfilePic-error").hide();

        let url = $("#changeProfilePic-url").val();

        if (checkUrl(url)) {
            fetch('http://localhost:3000/users/' + getLoggedUserId(), {
                method: "PATCH",
                body: JSON.stringify({
                    "avatar": url
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }
            })
                .then(function () {
                    location.reload();
                })
                .catch(function () {
                    $("#changeProfilePic-error").text("An error occurred. Please try again.");
                    $("#changeProfilePic-error").show();
                });
        }
    });
});


function updateProfile(user) {
    let followBtn = $("#profile-follow-btn");
    let privatePhotosLink = $("#profile-private-photos-link");

    $("#profile-name").text(user.name + " " + user.surname);
    $("#profile-email").text(user.email);
    $("#profile-username").text(user.user);

    if (user.avatar !== "") {
        $("#profile-avatar").attr("src", user.avatar);
    }

    followBtn.hide();
    privatePhotosLink.hide();

    // Load public photos
    getUserPhotos(user.id).then(function (response) {
        let publicPhotos = response.data;

        if (publicPhotos.length > 0) {
            appendPhotos($("#profile-public-gal"), publicPhotos);
        } else {
            $("#profile-no-public-photos-info").show();
        }
    });

    if (user.id != getLoggedUserId()) {
        updateFollowBtn(followBtn, user.id);
        $("#profile-avatar-link").addClass("disabled");
    }
    else {
        // Load private photos
        getUserPhotos(user.id, false).then(function (response) {
            let privatePhotos = response.data;

            if (privatePhotos.length > 0) {
                appendPhotos($("#profile-private-gal"), privatePhotos);
            } else {
                $("#profile-no-private-photos-info").show();
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


function updateProfilePicPreview(url) {
    $("#changeProfilePic-preview").attr('src', 'images/user.jpg');
    $("#changeProfilePic-submit-btn").prop('disabled', true);
    $("#changeProfilePic-error").hide();

    if (checkUrl(url)) {
        $("#changeProfilePic-loading").show()

        $.get(url)
            .done(function () {
                $("#changeProfilePic-preview").attr('src', url);

                $("#changeProfilePic-submit-btn").prop('disabled', false);
                $("#changeProfilePic-loading").hide()
            })
            .fail(function () {
                $("#changeProfilePic-error").text("Profile picture preview failed.");
                $("#changeProfilePic-error").show();

                $("#changeProfilePic-submit-btn").prop('disabled', false);
                $("#changeProfilePic-loading").hide()
            });
    }
}