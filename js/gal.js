function appendPhotos(galContainerId, photos, appendingInProfile = false) {
    for (let photo of photos) {
        // Get photo owner info
        getUser(photo.userId).then(function (response) {
            if (response.status == 200) {
                let user = response.data;

                // If current user is logged and is not the photo owner, get his vote info
                if (isLogged() && getLoggedUserId() != user.id) {
                    getVote(photo.id, getLoggedUserId()).then(function (response) {
                        let isPositive = response.data.length == 0 ? null : response.data[0].positive;
                        let photoHtml = generatePhoto(photo, user, isPositive, appendingInProfile);

                        appendPhoto(galContainerId, photoHtml);
                    });
                }
                // Else there is not vote info
                else {
                    let photoHtml = generatePhoto(photo, user, null, appendingInProfile);

                    appendPhoto(galContainerId, photoHtml);
                }
            }
        });
    }
}


// Appends the photo and add event handler
function appendPhoto(galContainerId, photoHtml) {
    $(`#${galContainerId}`).append(photoHtml);
    $(`#${galContainerId} > :last-child > :nth-child(2)`).click(function () {
        updatePhotoModal($(this).siblings().first().text());
    });
}


function generatePhoto(photo, user, isPositive, appendingInProfile) {
    let profileLink = `profile.php?userId=${user.id}`;
    let photoHtml = `
            <div class='gal-photo-container'>
                <span hidden>${photo.id}</span>
                <div class='pointer' data-toggle="modal" data-target="#photo-modal">  
                    <img class='gal-photo' src="${photo.url}">
                </div>`;

    if (isLogged() && getLoggedUserId() != photo.userId) {
        let negativeIco = !isPositive && isPositive !== null ?
            `<i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `<i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse" aria-hidden="true"></i>`;
        let positiveIco = isPositive ?
            `<i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `<i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse" aria-hidden="true"></i>`;

        photoHtml += appendingInProfile ? "" : `
                <a class='photo-overlay photo-overlay-l' href="${profileLink}">
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </a>`;

        photoHtml += `
                <div class='photo-overlay photo-overlay-r'>
                    <button type='button' class='btn btn-vote' onclick='downvote($(this).parent().siblings().first().text())'>
                        ${negativeIco}
                    </button>
                    <span id='gal-photo-score-${photo.id}'>${photo.upvotes - photo.downvotes}</span>
                    <button type='button' class='btn btn-vote' onclick='upvote($(this).parent().siblings().first().text())'>
                        ${positiveIco}
                    </button>
                </div>   
            </div>`;
    }
    else {
        let disabled = isLogged() ? "" : "disabled";

        photoHtml += appendingInProfile ? "" : `
                <a class='photo-overlay photo-overlay-l ${disabled}' href="${profileLink}">
                    <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                    <span>@${user.user}</span>
                </a>`;
        
        photoHtml += `
                <div class='photo-overlay photo-overlay-r'>
                    <span id='gal-photo-score-${photo.id}' class='mr-2'>${photo.upvotes - photo.downvotes}</span>
                </div>
            </div>`;
    }

    return photoHtml;
}