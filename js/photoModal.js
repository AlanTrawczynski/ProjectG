'use strict';

function updatePhotoModal(photoId) {
    axios.get(`http://localhost:3000/photos/${photoId}`).then(function (response) {
        if (response.status == 200) {
            let photo = response.data;

            axios.get(`http://localhost:3000/users/${photo.userId}`).then(function (response) {
                if (response.status == 200) {
                    let user = response.data;

                    showData(photo, user);
                }
            }).catch(function (error) {
                console.log("Error al pedir el username: " + error);
            });
        }
    }).catch(function (error) {
        console.log("Error al pedir la foto: " + error);
    });
}


function showData(photo, user) {
    $("#photo-modal-username").text("@" + user.user);
    $("#photo-modal-img").attr("src", photo.url);
    $("#photo-modal-title").text(photo.title);
    $("#photo-modal-description").text(photo.description);

    let votesHtml = $("#photo-modal-votes");
    let sumVotes = photo.upvotes + photo.downvotes;
    let percVotes = ((photo.upvotes*100)/sumVotes).toFixed(2);
    if(photo.upvotes < photo.downvotes){
        votesHtml.text(`${photo.downvotes}/${sumVotes} (${100 - percVotes}%) negative votes`);
        votesHtml.attr("style",`width: ${100 - percVotes}%`);
        votesHtml.addClass("custom-negative-progress-bar");
    }   else{
        votesHtml.text(`${photo.upvotes}/${sumVotes} (${percVotes}%) positive votes`);
        votesHtml.attr("style",`width: ${percVotes}%`);
        votesHtml.removeClass("custom-negative-progress-bar");
    }
}
