$(function () {
    let userId = getUrlValue('userId');

    // Update profile
    $.ajax({
        url: `http://localhost:3000/users/${userId}`,
        success: updateProfile,
        error: function () {
            console.log("El perfil al que se intenta acceder no existe.");
            window.location.href = "index.php";
        }
    });

    // If it is loggedUser profile enable profile picture change
    if (userId == getLoggedUserId()) {
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
    }
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

    // Load public photos
    getUserPhotos(user.id, true).then(function (response) {
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
    let preview = $("#changeProfilePic-preview");
    let submitBtn = $("#changeProfilePic-submit-btn");
    let errorContainer = $("#changeProfilePic-error");

    preview.attr('src', 'images/user.jpg');
    submitBtn.prop('disabled', true);
    errorContainer.hide();

    if (checkUrl(url)) {
        $("#changeProfilePic-loading").show()

        $.get(url)
            .done(function () {
                preview.attr('src', url);

                submitBtn.prop('disabled', false);
                $("#changeProfilePic-loading").hide()
            })
            .fail(function () {
                errorContainer.text("Profile picture preview failed.");
                errorContainer.show();

                submitBtn.prop('disabled', false);
                $("#changeProfilePic-loading").hide()
            });
    }
}