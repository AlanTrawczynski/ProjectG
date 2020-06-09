function updatePhotoModalComments(isPublic) {
    if (isPublic) {
        $("#photo-modal-comments-link").show();

        $("#photo-modal-no-comments").hide();
        $("#photo-modal-load-more-btn").hide();
        disableDeleteAndVisibility();

        if (!isLogged()) {
            $("#photo-modal-comment-form").hide();
        }

        let photoId = $("#photo-modal-photo-id").text();

        $("#photo-modal-comments-container").empty();

        // Append photo comments
        getPhotoComments(photoId, 0).then(async function (response) {
            let comments = response.data.length === 0 ? null : response.data;

            if (comments !== null) {
                if (comments.length === 10) {
                    $("#photo-modal-load-more-btn").show();
                }

                appendComments(comments);
            }
            else {
                $("#photo-modal-no-comments").show();
                enableDeleteAndVisibility();
            }
        });
    }
    else {
        $("#photo-modal-comments-link").hide();
        enableDeleteAndVisibility();
    }
}


function loadMoreComments() {
    let appendedComments = $("#photo-modal-comments-container").children().length / 2;
    let photoId = $("#photo-modal-photo-id").text();

    getPhotoComments(photoId, appendedComments).then(async function (response) {
        let comments = response.data.length === 0 ? null : response.data;

        if (comments === null || comments.length < 10) {
            $("#photo-modal-load-more-btn").hide();
        }

        if (comments !== null) {
            appendComments(comments);
        }
    });
}


function postComment(event) {
    event.preventDefault();

    $("#photo-modal-comment-error").hide();

    let input = $("#photo-modal-comment-input");

    let content = input.val().trim();
    let date = new Date().toISOString();
    let photoId = parseInt($("#photo-modal-photo-id").text(), 10);
    let userId = parseInt(getLoggedUserId(), 10);

    if (content !== "") {
        checkBadwords(content).then(function (badword) {
            if (badword === null) {
                let data = {
                    "content": content,
                    "date": date,
                    "photoId": photoId,
                    "userId": userId
                }

                fetch('http://localhost:3000/comments/', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    }
                })
                    .then(function () {
                        input.val("");
                        input.focus();
                        $("#photo-modal-no-comments").hide();
                        disableDeleteAndVisibility();

                        getLoggedUser().then(function (response) {
                            $("#photo-modal-comments-container").prepend(generateComment(data, response.data));
                        });
                    })
                    .catch(function (error) {
                        console.log(`Error al crear el comentario del usuario con id ${userId} en la foto con id ${photoId}: ` + error);
                    });
            }
            else {
                $("#photo-modal-comment-error").text("Please, do not use offensive words: " + badword);
                $("#photo-modal-comment-error").show();
            }
        });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function appendComments(comments) {
    let commentsContainer = $("#photo-modal-comments-container");

    for (comment of comments) {
        await getUser(comment.userId).then(function (response) {
            let user = response.data;

            commentsContainer.append(generateComment(comment, user));
        });
    }
}

function generateComment(comment, user) {
    let commentDate = new Date(comment.date);
    let currentTime = new Date();
    let dif = currentTime - commentDate;     // ms

    let minutes = dif / (1000 * 60);
    let hours = minutes / 60;
    let days = hours / 24;
    let years = currentTime.getFullYear() - commentDate.getFullYear();

    let commentTimeInfo;

    if (years > 1) {
        commentTimeInfo = Math.floor(years) + "y ago";    // years
    }
    else if (days > 1) {
        commentTimeInfo = Math.floor(days) + "d ago";    // days
    }
    else if (hours > 1) {
        commentTimeInfo = Math.floor(hours) + "h ago";    // hours
    }
    else {
        commentTimeInfo = minutes > 1 ? Math.floor(minutes) + "m ago" : "1m ago";    // minutes
    }

    let avatar = user.avatar === "" ? "images/user.jpg" : user.avatar;

    return `
        <li class="media comment my-3">
            <img class='profile-pic mr-3' src="${avatar}" width='40px' height='40px'>
            <div class="media-body">
                <div class="d-flex">
                    <a href='profile.php?userId=${user.id}' class="mt-0 mb-1 mr-3 comment-username">@${user.user}</a>
                    <span class='comment-time'>${commentTimeInfo}</span>
                </div>
                <span class='comment-content'>${comment.content}</span>
            </div>
        </li>
        <hr>`
}


function disableDeleteAndVisibility() {
    let deletePhotoBtn = $("#photo-modal-delete-photo-btn");

    deletePhotoBtn.prop("disabled", true);
    deletePhotoBtn.removeClass("pink-hover");

    $("#photo-modal-edit-public").prop("disabled", true);
    $("#photo-modal-edit-private").prop("disabled", true);

    $(".photo-modal-with-comments-info").show();
}

function enableDeleteAndVisibility() {
    let deletePhotoBtn = $("#photo-modal-delete-photo-btn");

    deletePhotoBtn.prop("disabled", false);
    deletePhotoBtn.addClass("pink-hover");

    $("#photo-modal-edit-public").prop("disabled", false);
    $("#photo-modal-edit-private").prop("disabled", false);

    $(".photo-modal-with-comments-info").hide();
}