function toggleFollow(event) {
    let userId = event.data.userId;
    let btn = $(this);

    getLoggedUser().then(function (response) {
        let loggedUser = response.data;
        let followingList = loggedUser.following;

        // If loggedUser already follows user, unfollow him
        if (followingList.includes(userId)) {
            followingList.splice(followingList.indexOf(userId), 1);
        }
        // Else, follow him
        else {
            followingList.push(userId);
        }

        patchUser(loggedUser.id, { "following": followingList }).then(function () {
            btn.text(function (i, text) {
                return text === "Follow" ? "Following" : "Follow";
            });

            // If clicked btn is photo-modal-follow-btn and current page is "profile.php", update profile-follow-btn too
            if (btn.attr('id') === "photo-modal-follow-btn" && getPageString() === "profile.php"){
                $("#profile-follow-btn").text(function (i, text) {
                    return text === "Follow" ? "Following" : "Follow";
                });
            }
        });
    });
}


function updateFollowBtn(btn, userId) {
    getLoggedUser().then(function (response) {
        let loggedUser = response.data;

        if (loggedUser.following.includes(userId)) {
            btn.text("Following");
        } else {
            btn.text("Follow");
        }

        btn.show();
        btn.off("click");
        btn.click({ userId: userId }, toggleFollow);
    });
}


function toggleFollowBtnText(btn, event) {
    if (btn.text() !== "Follow") {
        if (event.type === "mouseover") {
            btn.text("Unfollow");
        }
        else {
            btn.text("Following");
        }
    }
}