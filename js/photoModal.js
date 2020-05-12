function updatePhotoModal(photoId) {
    // Get photo
    axios.get(`http://localhost:3000/photos/${photoId}`)
    .then(function (response) {
        if (response.status == 200) {
            let photo = response.data;

            // Get photo owner (user)
            axios.get(`http://localhost:3000/users/${photo.userId}`)
            .then(function (response) {
                if (response.status == 200) {
                    let user = response.data;

                    // If current user is logged and is not the photo owner, get his vote info
                    if (isLogged() && getLoggedUserId() != user.id) {
                        axios.get(`http://localhost:3000/votes?userId=${getLoggedUserId()}&photoId=${photo.id}`)
                        .then(function (response) {
                            if (response.status == 200) {
                                let userVote = response.data.length > 0 ? response.data[0] : null;

                                showData(photo, user, userVote);
                            }
                        })
                        .catch(function (error) {
                            console.log("Error al pedir el voto del usuario: " + error);
                        });
                    }
                    // Else there is not vote info
                    else {
                        showData(photo, user, null);
                    }
                }
            })
            .catch(function (error) {
                console.log("Error al pedir el username: " + error);
            });
        }
    })
    .catch(function (error) {
        console.log("Error al pedir la foto: " + error);
    });
}


function showData(photo, user, userVote) {
    $("#photo-modal-username").text("@" + user.user);
    $("#photo-modal-img").attr("src", photo.url);
    $("#photo-modal-title").text(photo.title);
    $("#photo-modal-description").text(photo.description);

    // Insert photo tags
    let tags = photo.tags;
    let tagsContainer = $("#photoModal-tags-container");
    tagsContainer.empty();

    tags.forEach(function (tag) {
        tagsContainer.append(generateGreyTag(tag));
    });

    // Update voting btns
    let positiveBtn = $("#photo-modal-positive-vote-btn");
    let negativeBtn = $("#photo-modal-negative-vote-btn");

    positiveBtn.removeClass("voted");
    negativeBtn.removeClass("voted");

    if (userVote !== null) {
        if (userVote.positive) {
            positiveBtn.addClass("voted");
        } else {
            negativeBtn.addClass("voted");
        }
    }

    // Update progress bar
    let progressBar = $("#photo-modal-votes-bar");
    let sumVotes = photo.upvotes + photo.downvotes;
    let percVotes = ((photo.upvotes * 100) / sumVotes).toFixed(2);
    let isLoggedUserPhoto = user.id == getLoggedUserId();

    if (sumVotes > 0) {
        if (photo.upvotes < photo.downvotes) {
            updateVotes((100 - percVotes), `${100 - percVotes}% negative votes`);
            isNegative(progressBar);
        } else {
            updateVotes(percVotes, `${percVotes}% positive votes`);
            isPositive(progressBar);
        }
    }
    else {
        if (isLoggedUserPhoto || !isLogged()) {
            updateVotes(100, `This photo has no votes`);
        } else {
            updateVotes(100, `Be the first to vote this photo`);
        }
        isZero(progressBar);
    }

    if (isLogged()) {
        $(".able-when-logged").removeClass("disabled");

        if (isLoggedUserPhoto) {
            $(".show-when-logged").hide();
        } else {
            $(".show-when-logged").show();
        }
    }
    else {
        $(".show-when-logged").hide();
        $(".able-when-logged").addClass("disabled");
    }

    // Update votes info
    $("#photo-modal-total-votes").text(sumVotes);
    $("#photo-modal-positive-votes").text(photo.upvotes);
    $("#photo-modal-negative-votes").text(photo.downvotes);

}


function generateGreyTag(tagText) {
    return `
        <div class="badge badge-grey">
            <span class='newPhoto-tagContent'>${tagText}</span>
        </div>`;
}


function updateVotes(percentage, text) {
    let progressBar = $("#photo-modal-votes-bar");

    progressBar.text(text);
    progressBar.attr("style", `width: ${percentage}%`);
}


function isPositive(progressBar) {
    progressBar.addClass("custom-negative-progress-bar");
    progressBar.removeClass("custom-negative-progress-bar");
    progressBar.removeClass("custom-zero-progress-bar");
}

function isNegative(progressBar) {
    progressBar.removeClass("custom-negative-progress-bar");
    progressBar.addClass("custom-negative-progress-bar");
    progressBar.removeClass("custom-zero-progress-bar");
}

function isZero(progressBar) {
    progressBar.removeClass("custom-negative-progress-bar");
    progressBar.removeClass("custom-negative-progress-bar");
    progressBar.addClass("custom-zero-progress-bar");
}