function updatePhotoModalInfo(photo, user, tags, userVote) {
    let isLoggedUserPhoto = user.id == getLoggedUserId();
    let sumVotes = photo.upvotes + photo.downvotes;

    let profileLink = $("#photo-modal-profile-href");
    profileLink.attr("href", `profile.php?userId=${user.id}`);

    updateEditableData(photo, tags.map(tag => {return tag.name}));
    $("#photo-modal-photo-id").text(photo.id);
    $("#photo-modal-username").text("@" + user.user);
    $("#photo-modal-total-votes").text(sumVotes);
    $("#photo-modal-positive-votes").text(photo.upvotes);
    $("#photo-modal-negative-votes").text(photo.downvotes);
    $("#photo-modal-date").text(photo.date.split("T")[0]);

    // Update photo score in overlay
    $(`#gal-photo-score-${photo.id}`).text(getPhotoPunctuation(photo.upvotes, photo.downvotes));

    // Update progress bar
    updateProgressBar(photo.upvotes, photo.downvotes, isLoggedUserPhoto);

    // Update btns visibility
    $(".photo-modal-show-when-logged").hide();
    $("#photo-modal-edit-link").hide()

    if (isLogged()) {
        profileLink.removeClass("disabled");

        if (isLoggedUserPhoto) {
            $("#photo-modal-edit-link").show()
        }
        else {
            $(".photo-modal-show-when-logged").show();

            // Update voting btns highlight
            if (userVote === null) {
                HLVotingBtns(photo.id, 0)
            } else if (userVote.positive) {
                HLVotingBtns(photo.id, 1)
            } else {
                HLVotingBtns(photo.id, -1)
            }

            updateFollowBtn($("#photo-modal-follow-btn"), user.id);
        }
    }
    else {
        profileLink.addClass("disabled");
    }
}


function updateEditableData(photo, tagsNames) {
    let tagsContainer = $("#photoModal-tags-container");

    $("#photo-modal-img").attr("src", photo.url);
    $("#photo-modal-title").text(photo.title);
    $("#photo-modal-description").text(photo.description);

    tagsContainer.empty();
    for (tagName of tagsNames) {
        tagsContainer.append(generateGreyTag(tagName));
    }
}


function updateProgressBar(upvotes, downvotes, isLoggedUserPhoto) {
    let percVotes = ((upvotes * 100) / (upvotes + downvotes)).toFixed(2);

    if (upvotes != 0 || downvotes != 0) {
        if (upvotes < downvotes) {
            updateProgressBarData((100 - percVotes), `${100 - percVotes}% negative votes`, -1);
        } else {
            updateProgressBarData(percVotes, `${percVotes}% positive votes`, 1);
        }
    }
    else {
        if (isLoggedUserPhoto || !isLogged()) {
            updateProgressBarData(100, `This photo has no votes`, 0);
        } else {
            updateProgressBarData(100, `Be the first to vote this photo`, 0);
        }
    }
}


function updateProgressBarData(percentage, text, switchTo) {
    let progressBar = $("#photo-modal-votes-bar");

    progressBar.attr("style", `width: ${percentage}%`);
    progressBar.text(text);

    progressBar.removeClass("custom-positive-progress-bar");
    progressBar.removeClass("custom-negative-progress-bar");
    progressBar.removeClass("custom-zero-progress-bar");

    // 1: positive; 0: zero; -1: negative
    switch (switchTo) {
        case -1:
            progressBar.addClass("custom-negative-progress-bar");
            break;

        case 0:
            progressBar.addClass("custom-zero-progress-bar");
            break;

        default:
            progressBar.addClass("custom-positive-progress-bar");
            break;
    }
}