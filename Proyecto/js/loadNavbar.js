$(function () {
    if (isLogged()) {
        $("#navbar-container").load("navbars/navbar.php", function () {
            updateNavbar();
            loadSearchByTag();
        });

        $.get("modals/newPhotoModal.php", function (modal) {
            $("body").append(modal);
            loadNewPhotoValidation();
        });

        $.get("modals/editTagModal.php", function (modal) {
            $("body").append(modal);
            loadTagEditValidation();
        });
    }
    else {
        if (getPageString() === "index.php") {
            $("#navbar-container").load("navbars/indexNavbar.php");

            $.get("modals/signupModal.php", function (modal) {
                $("body").append(modal);
                loadSignupValidation();
            });
            $.get("modals/loginModal.php", function (modal) {
                $("body").append(modal);
                loadLoginValidation();
            });
        }
        else {
            window.location.href = "index.php";
        }
    }
});


function updateNavbar() {
    let home = $("#navbar-home");
    let following = $("#navbar-following");
    let trending = $("#navbar-trending");
    let profile = $("#navbar-profile");

    profile.text("@" + getLoggedUsername());
    profile.attr("href", `profile.php?userId=${getLoggedUserId()}`)

    home.removeClass("active");
    following.removeClass("active");
    trending.removeClass("active");
    profile.removeClass("active");

    switch (getPageString()) {
        case "index.php":
            home.addClass("active");
            break;

        case "following.php":
            following.addClass("active");
            break;

        case "trending.php":
            trending.addClass("active");
            break;

        case "profile.php":
            if (getUrlValue('userId') == getLoggedUserId()) {
                profile.addClass("active");
            }
            break;

        default:
            break;
    }
}


function loadSearchByTag() {
    $("#navbar-search-bar").submit(function (event) {
        event.preventDefault();

        let tagName = $("#navbar-search-bar-input").val().trim().replace(/\s+/g, '');

        if (tagName !== "") {
            window.location.href = `search.php?tag=${tagName}`;
        }
    });
}