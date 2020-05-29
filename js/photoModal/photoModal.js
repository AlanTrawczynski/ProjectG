function updatePhotoModal(event) {
    let photo = event.data.photo;
    let user = event.data.user;

    // Get photo tags
    getTags(photo.tags).then(function (tags) {
        // If current user is logged and is not the photo owner, get his vote info
        if (isLogged() && getLoggedUserId() != user.id) {
            getVote(photo.id, getLoggedUserId()).then(function (response) {
                if (response.status == 200) {
                    let vote = response.data.length > 0 ? response.data[0] : null;

                    updatePhotoModalData(photo, user, tags, vote);
                }
            });
        }
        // Else there is not vote info
        else {
            updatePhotoModalData(photo, user, tags, null);
        }
    });
}


function updatePhotoModalData(photo, user, tags, vote) {
    switchPhotoModalTo(0);
    
    updatePhotoModalInfo(photo, user, tags, vote);

    $("#photo-modal").modal('show');

    updatePhotoModalEdit(photo, tags);
    updatePhotoModalComments();
}


// 0: info; 1: comments; 2: photo edit
function switchPhotoModalTo(n) {
    $("#photo-modal-info").hide();
    $("#photo-modal-comments").hide();
    $("#photo-modal-edit").hide();

    $("#photo-modal-info-link > a").removeClass("active");
    $("#photo-modal-comments-link > a").removeClass("active");
    $("#photo-modal-edit-link > a").removeClass("active");

    switch (n) {
        case 0:
            $("#photo-modal-info").show();
            $("#photo-modal-info-link > a").addClass("active");
            break;

        case 1:
            $("#photo-modal-comments").show();
            $("#photo-modal-comments-link > a").addClass("active");
            break;

        default:
            $("#photo-modal-edit").show();
            $("#photo-modal-edit-link > a").addClass("active");
            break;
    }
}