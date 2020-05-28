function updatePhotoModalComments(skipComments = 0) {
    $("#photo-modal-no-comments").hide();
    $("#photo-modal-load-more-btn").hide();
    disableDeleteBtn();

    if (!isLogged()) {
        $("#photo-modal-comment-form").hide();
    }

    let photoId = $("#photo-modal-photo-id").text();

    if (skipComments === 0) {
        $("#photo-modal-comments-container").empty();
    }

    // Append photo comments
    getPhotoComments(photoId, skipComments).then(async function (response) {
        let comments = response.data.length === 0 ? null : response.data;

        if (comments !== null || skipComments > 0) {
            if (comments.length === 10) {
                $("#photo-modal-load-more-btn").show();
            }

            appendComments(comments);
        }
        else {
            $("#photo-modal-no-comments").show();
            ableDeleteBtn();
        }
    });
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

    let input = $("#photo-modal-comment-input");

    let content = input.val().trim();
    let date = new Date().toISOString();
    let photoId = parseInt($("#photo-modal-photo-id").text(), 10);
    let userId = parseInt(getLoggedUserId(), 10);

    if (content !== "") {
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
                $("#photo-modal-comments-container").prepend(generateComment(data, userId, getLoggedUsername()));
                disableDeleteBtn();
            })
            .catch(function (error) {
                console.log(`Error al crear el comentario del usuario con id ${userId} en la foto con id ${photoId}: ` + error);
            });
    }
}


async function appendComments(comments) {
    let commentsContainer = $("#photo-modal-comments-container");
    
    for (comment of comments) {
        await getUser(comment.userId).then(function (response) {
            let user = response.data;

            commentsContainer.append(generateComment(comment, user.id, user.user));
        });
    }
}

function generateComment(comment, userId, username) {
    let commentDate = new Date(comment.date);
    let now = new Date();
    let dif = now - commentDate;     // ms

    let minutes = dif / (1000 * 60);
    let hours = minutes / 60;
    let days = hours / 24;
    let years = now.getFullYear() - commentDate.getFullYear();

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

    return `
        <li class="media comment my-3">
            <img class='profile-pic mr-3' src="images/user.jpg" width='40px'>
            <div class="media-body">
                <div class="d-flex">
                    <a href='profile.php?userId=${userId}' class="mt-0 mb-1 mr-3 comment-username">@${username}</a>
                    <span class='comment-time'>${commentTimeInfo}</span>
                </div>
                <span class='comment-content'>${comment.content}</span>
            </div>
        </li>
        <hr>`
}


function disableDeleteBtn() {
    let deletePhotoBtn = $("#photo-modal-delete-photo-btn");

    deletePhotoBtn.prop("disabled", true);
    deletePhotoBtn.removeClass("pink-hover");
    $("#photo-modal-delete-photo-info").show();
}

function ableDeleteBtn() {
    let deletePhotoBtn = $("#photo-modal-delete-photo-btn");

    deletePhotoBtn.prop("disabled", false);
    deletePhotoBtn.addClass("pink-hover");
    $("#photo-modal-delete-photo-info").hide();
}