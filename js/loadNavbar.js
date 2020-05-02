$(function () {
    if (isLogged()) {
        $("#navbar-container").load("navbars/navbar.php", function(){
            updateNavbar();
        });

        $.get("modals/uploadPhotoModal.php", function (data) {
            $("body").append(data);
        });
    }
    else {
        $("#navbar-container").load("navbars/indexNavbar.php", function(){
            loadLogin();
        });

        $.get("modals/signupModal.php", function (data) {
            $("body").append(data);
            loadSignup();
        });
    }
});


function updateNavbar() {
    let home = $("#navbar-home");
    let following = $("#navbar-following");
    let trending = $("#navbar-trending");
    let profile = $("#navbar-profile");

    getUser().then(function (response) {
        if (response.status == 200) {
            profile.text("@" + response.data.user)
        }
    })
    .catch(function (error) {
        console.log("Error al pedir el username: " + error);
    });

    let sPath = window.location.pathname;
    let sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    switch (sPage) {
        case "index.php":
            home.addClass("active");
            following.removeClass("active");
            trending.removeClass("active");
            profile.removeClass("active");
            break;

        case "following.php":
            home.removeClass("active");
            following.addClass("active");
            trending.removeClass("active");
            profile.removeClass("active");
            break;

        case "trending.php":
            home.removeClass("active");
            following.removeClass("active");
            trending.addClass("active");
            profile.removeClass("active");
            break;

        case "profile.php":
            home.removeClass("active");
            following.removeClass("active");
            trending.removeClass("active");
            profile.addClass("active");
            break;

        default:
            break;
    }
}