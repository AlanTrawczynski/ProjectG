function upvote(photoId) {
    // Get vote
    getVote(photoId, getLoggedUserId()).then(function (response) {
        let voidResponse = response.data.length == 0;

        let isPositive = voidResponse ? null : response.data[0].positive;
        let voteId = voidResponse ? null : response.data[0].id;

        // If vote is already positive, delete it
        if (isPositive) {
            deleteVote(voteId).then(function () {
                HLVotingBtns(photoId, 0);
                updatePhotoVotes(photoId, -1, 0);
            });
        }
        // If vote is negative, patch it
        else if (isPositive !== null) {
            let data = {
                "date": new Date().toISOString(),
                "positive": true
            };

            patchVote(voteId, data).then(function () {
                HLVotingBtns(photoId, 1);
                updatePhotoVotes(photoId, 1, -1);
            });
        }
        // If there is no vote, post it
        else {
            let data = {
                "date": new Date().toISOString(),
                "positive": true,
                "userId": parseInt(getLoggedUserId(), 10),
                "photoId": parseInt(photoId, 10)
            };

            postVote(data).then(function () {
                HLVotingBtns(photoId, 1);
                updatePhotoVotes(photoId, 1, 0);
            });
        }
    });

}


function downvote(photoId) {
    // Get vote
    getVote(photoId, getLoggedUserId()).then(function (response) {
        let voidResponse = response.data.length == 0;

        let isPositive = voidResponse ? null : response.data[0].positive;
        let voteId = voidResponse ? null : response.data[0].id;

        // If vote is already negative, delete it
        if (!isPositive && isPositive !== null) {
            deleteVote(voteId).then(function () {
                HLVotingBtns(photoId, 0);
                updatePhotoVotes(photoId, 0, -1);
            });
        }
        // If vote is positive, patch it
        else if (isPositive) {
            let data = {
                "date": new Date().toISOString(),
                "positive": false
            };

            patchVote(voteId, data).then(function () {
                HLVotingBtns(photoId, -1);
                updatePhotoVotes(photoId, -1, 1);
            });
        }
        // If there is no vote, post it
        else {
            let data = {
                "date": new Date().toISOString(),
                "positive": false,
                "userId": parseInt(getLoggedUserId(), 10),
                "photoId": parseInt(photoId, 10)
            };

            postVote(data).then(function () {
                HLVotingBtns(photoId, -1);
                updatePhotoVotes(photoId, 0, 1);
            });
        }
    });
}

function updatePhotoVotes(photoId, upvotesOffset, downvotesOffset) {
    getPhoto(photoId).then(function (response) {
        let photo = response.data;
        let finalUpvotes = photo.upvotes + upvotesOffset;
        let finalDownvotes = photo.downvotes + downvotesOffset
        let finalSumVotes = finalUpvotes + finalDownvotes;

        let data = {
            "upvotes": finalUpvotes,
            "downvotes": finalDownvotes
        };

        // Update photo upvotes and downvotes in db
        patchPhoto(photoId, data);

        // Update photo score in overlay
        $(`#gal-photo-score-${photo.id}`).text(getPhotoScore(finalUpvotes, finalDownvotes));

        // Update votes info in photo modal
        updateProgressBar(finalUpvotes, finalDownvotes, photo.userId == getLoggedUserId());
        $("#photo-modal-positive-votes").text(finalUpvotes);
        $("#photo-modal-negative-votes").text(finalDownvotes);
        $("#photo-modal-total-votes").text(finalSumVotes);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getPhotoScore(upvotes, downvotes) {
    let sumVotes = upvotes + downvotes;

    return sumVotes == 0 ? 0 : parseFloat(((upvotes - downvotes) / sumVotes).toFixed(3));
}

// HL-Highlight
// n = 1: positive;   n = 0: None;   n = -1: negative
function HLVotingBtns(photoId, n) {
    let galPositiveBtn = $(`#gal-positive-vote-ico-${photoId}`);
    let galNegativeBtn = $(`#gal-negative-vote-ico-${photoId}`);
    let photoModalPositiveBtn = $(`#photo-modal-positive-vote-btn`);
    let photoModalNegativeBtn = $(`#photo-modal-negative-vote-btn`);

    galPositiveBtn.removeClass("color-pink");
    galNegativeBtn.removeClass("color-pink");
    photoModalPositiveBtn.removeClass("bg-pink");
    photoModalNegativeBtn.removeClass("bg-pink");

    if (n == 1) {
        galPositiveBtn.addClass("color-pink");
        photoModalPositiveBtn.addClass("bg-pink");
    }
    else if (n == -1) {
        galNegativeBtn.addClass("color-pink");
        photoModalNegativeBtn.addClass("bg-pink");
    }
}