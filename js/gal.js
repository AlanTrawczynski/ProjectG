function appendPhotos(galContainer, photos) {
    for (let photo of photos) {
        // Get photo owner
        getUser(photo.userId).then(function (response) {
            if (response.status == 200) {
                let user = response.data;

                // If current user is logged and is not the photo owner, get his vote info
                if (isLogged() && getLoggedUserId() != user.id) {
                    getVote(photo.id, getLoggedUserId()).then(function (response) {
                        let vote = response.data.length === 0 ? null : response.data[0];

                        appendPhoto(galContainer, photo, user, vote);
                    });
                }
                // Else there is not vote info
                else {
                    appendPhoto(galContainer, photo, user, null);
                }
            }
        });
    }
}


// Appends the photo and add event handler
function appendPhoto(galContainer, photo, user, vote) {
    let photoHtml = generatePhoto(photo, user, vote);

    galContainer.append(photoHtml);
    galContainer.find(`> :last-child > :nth-child(2)`).click({photo: photo, user: user}, updatePhotoModal);
}


function generatePhoto(photo, user, vote) {
    let profileLink = `profile.php?userId=${user.id}`;
    let score = getPhotoScore(photo.upvotes, photo.downvotes);
    let appendingInProfile = getPageString() === "profile.php";
    let avatar = user.avatar === "" ? "images/user.jpg" : user.avatar;

    let photoHtml = `
            <div class='gal-photo-container'>
                <span hidden>${photo.id}</span>
                <div class='pointer'>  
                    <img class='gal-photo' src="${photo.url}">
                </div>`;

    if (isLogged() && getLoggedUserId() != photo.userId) {
        let negativeIco = vote !== null && !vote.positive ?
            `<i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `<i id='gal-negative-vote-ico-${photo.id}' class="fa fa-minus-circle fa-inverse" aria-hidden="true"></i>`;

        let positiveIco = vote !== null && vote.positive ?
            `<i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse color-pink" aria-hidden="true"></i>` :
            `<i id='gal-positive-vote-ico-${photo.id}' class="fa fa-plus-circle fa-inverse" aria-hidden="true"></i>`;

        photoHtml += appendingInProfile ? "" : `
                <a class='photo-overlay photo-overlay-l' href="${profileLink}">
                    <img class='profile-pic mr-2 ml-1' src="${avatar}" width='27.5px' height='27.5px'>
                    <span>@${user.user}</span>
                </a>`;

        photoHtml += `
                <div class='photo-overlay photo-overlay-r'>
                    <button type='button' class='btn btn-vote' onclick='downvote($(this).parent().siblings().first().text())'>
                        ${negativeIco}
                    </button>
                    <span id='gal-photo-score-${photo.id}'>${score}</span>
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
                    <img class='profile-pic mr-2 ml-1' src="${avatar}" width='27.5px' height='27.5px'>
                    <span>@${user.user}</span>
                </a>`;

        photoHtml += `
                <div class='photo-overlay photo-overlay-r'>
                    <span id='gal-photo-score-${photo.id}' class='mr-2'>${score}</span>
                </div>
            </div>`;
    }

    return photoHtml;
}