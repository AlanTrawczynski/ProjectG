$(function () {
    if (isLogged()) {
        $("#navbar-container").load("navbars/navbar.php", function () {
            updateNavbar();
            loadSearchByTag();
        });

        $.get("modals/newPhotoModal.php", function (data) {
            $("body").append(data);
            loadNewPhotoValidation();
        });

        $.get("modals/editTagModal.php", function (data) {
            $("body").append(data);
            loadTagEditValidation();
        });
    }
    else {
        if (getPageString() === "index.php") {
            $("#navbar-container").load("navbars/indexNavbar.php");

            $.get("modals/signupModal.php", function (data) {
                $("body").append(data);
                loadSignupValidation();
            });
            $.get("modals/loginModal.php", function (data) {
                $("body").append(data);
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
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const urlUserId = urlParams.get('userId');
            if (urlUserId == getLoggedUserId()) {
                profile.addClass("active");
            }
            break;

        default:
            break;
    }
}

function getPageString() {
    let sPath = window.location.pathname;
    return sPath.substring(sPath.lastIndexOf('/') + 1);
}


function loadSearchByTag() {
    $("#navbar-search-bar").submit(function (event) {
        event.preventDefault();
        let tagName = $("#navbar-search-bar-input").val().trim().replace(/\s+/g, '');

        if (tagName != "") {
            window.location.href = `search.php?tag=${tagName}`;
        }
    });
}