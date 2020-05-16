function updatePhotoModal(photoId) {
    // Get photo
    getPhoto(photoId)
        .then(function (response) {
            if (response.status == 200) {
                let photo = response.data;

                // Get photo owner
                getUser(photo.userId)
                    .then(function (response) {
                        if (response.status == 200) {
                            let user = response.data;

                            // If current user is logged and is not the photo owner, get his vote info
                            if (isLogged() && getLoggedUserId() != user.id) {
                                getVote(photo.id, getLoggedUserId())
                                    .then(function (response) {
                                        if (response.status == 200) {
                                            let userVote = response.data.length > 0 ? response.data[0] : null;

                                            showPhotoModalData(photo, user, userVote);
                                        }
                                    });
                            }
                            // Else there is not vote info
                            else {
                                showPhotoModalData(photo, user, null);
                            }
                        }
                    });
            }
        });
}


function showPhotoModalData(photo, user, userVote) {
    let isLoggedUserPhoto = user.id == getLoggedUserId();
    let sumVotes = photo.upvotes + photo.downvotes;

    $("#photo-modal-photo-id").text(photo.id);
    $("#photo-modal-username").text("@" + user.user);
    $("#photo-modal-img").attr("src", photo.url);
    $("#photo-modal-title").text(photo.title);
    $("#photo-modal-description").text(photo.description);
    $("#photo-modal-total-votes").text(sumVotes);
    $("#photo-modal-positive-votes").text(photo.upvotes);
    $("#photo-modal-negative-votes").text(photo.downvotes);
    $("#photo-modal-date").text(photo.date.split("T")[0]);

    // Update photo score in overlay
    $(`#gal-photo-score-${photo.id}`).text(photo.upvotes - photo.downvotes);

    // Update progress bar
    updateProgressBar(photo.upvotes, photo.downvotes, isLoggedUserPhoto);

    // Update btns visibility
    if (isLogged()) {
        $("#photo-modal-profile-href").removeClass("disabled");

        if (isLoggedUserPhoto) {
            $(".photo-modal-show-when-logged").hide();
        } else {
            $(".photo-modal-show-when-logged").show();

            // Update voting btns highlight
            if (userVote === null) {
                HLVotingBtns(photo.id, 0)
            } else if (userVote.positive) {
                HLVotingBtns(photo.id, 1)
            } else {
                HLVotingBtns(photo.id, -1)
            }
        }
    }
    else {
        $("#photo-modal-profile-href").addClass("disabled");
        $(".photo-modal-show-when-logged").hide();
    }

    // Insert photo tags
    let tags = photo.tags;
    let tagsContainer = $("#photoModal-tags-container");
    tagsContainer.empty();

    tags.forEach(function (tag) {
        tagsContainer.append(generateGreyTag(tag));
    });
}


/////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////


function generateGreyTag(tagText) {
    return `
        <div class="badge badge-grey">
            <span class='newPhoto-tagContent'>${tagText}</span>
        </div>`;
}