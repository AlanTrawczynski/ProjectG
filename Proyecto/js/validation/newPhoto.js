function loadNewPhotoValidation() {
    addTagAutoAppend($("#newPhoto-tags-input"), $("#newPhoto-tags-container"), "newPhoto-tag");

    $("#newPhoto-form").submit(function (event) {
        event.preventDefault();

        $("#newPhoto-error").hide();

        getUserPhotos(getLoggedUserId())
            .then(function (response) {
                if (response.data.length < 50) {
                    let errors = 0;

                    let url = $("#newPhoto-url");
                    let title = $("#newPhoto-title");

                    let urlVal = url.val();
                    let titleVal = title.val().trim().replace(/\s\s+/g, ' ');
                    let descriptionVal = $("#newPhoto-description").val().trim();
                    let date = new Date().toISOString();
                    let tagsNames = getTagsArray("newPhoto-tag");
                    let publicVal = $("#newPhoto-visibility input:checked").val() == "public" ? true : false;
                    let userId = parseInt(getLoggedUserId(), 10);

                    title.val(titleVal);

                    if (!($(this).hasClass("autoValidationAdded"))) {
                        addAutoValidation(url, checkUrl);
                        $(this).addClass("autoValidationAdded");
                    }

                    errors += checkErrors(url, checkUrl);

                    if (errors === 0) {

                        checkBadwords(titleVal).then(function (badword) {
                            if (badword === null) {

                                checkBadwords(descriptionVal).then(function (badword) {
                                    if (badword === null) {

                                        resolveTags(tagsNames).then(function (tags) {
                                            let tagsIds = tags.map(tag => { return tag.id });

                                            let photoData = {
                                                "url": urlVal,
                                                "title": titleVal,
                                                "description": descriptionVal,
                                                "date": date,
                                                "upvotes": 0,
                                                "downvotes": 0,
                                                "tags": tagsIds,
                                                "public": publicVal,
                                                "userId": userId
                                            };

                                            $.ajax({
                                                url: "http://localhost:3000/photos/",
                                                method: "POST",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + getToken(),
                                                },
                                                data: JSON.stringify(photoData),
                                                success: handleNewPhoto,
                                                error: handleNewPhotoError
                                            });
                                        });
                                    }
                                    else {
                                        $("#newPhoto-error").text("Please, do not use offensive words in description: " + badword);
                                        $("#newPhoto-error").show();
                                    }
                                });
                            }
                            else {
                                $("#newPhoto-error").text("Please, do not use offensive words in title: " + badword);
                                $("#newPhoto-error").show();
                            }
                        });
                    }
                }
                else {
                    $("#newPhoto-error").text("The maximum number of photos allowed is 50 per user.");
                    $("#newPhoto-error").show();
                }
            })
            .catch(function () {
                handleNewPhotoError();
            });
    });
}


function handleNewPhoto() {
    window.location.href = "index.php";
}

function handleNewPhotoError() {
    $("#newPhoto-error").text("An error occurred. Please try again.");
    $("#newPhoto-error").show();
}