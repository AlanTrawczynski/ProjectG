function updatePhotoModalEdit(photo, tags) {
    $("#photo-modal-edit-error").hide();

    let tagsInput = $("#photo-modal-edit-tags-input");
    let tagsContainer = $("#photo-modal-edit-tags-container");

    $("#photo-modal-edit-url").val(photo.url);
    $("#photo-modal-edit-title").val(photo.title);
    $("#photo-modal-edit-description").val(photo.description);

    tagsContainer.empty();
    for (tag of tags) {
        let tagHtml = generatePinkTag(tag.name, "photo-modal-edit-tag");

        tagsContainer.append(tagHtml);
        addTagEdition(tagsInput, tagsContainer)
    }

    if (photo.public) {
        $("#photo-modal-edit-public").prop("checked", true);
    } else {
        $("#photo-modal-edit-private").prop("checked", true);
    }

    if (!tagsInput.hasClass("auto-append-added")) {
        addTagAutoAppend(tagsInput, tagsContainer, "photo-modal-edit-tag");
        tagsInput.addClass("auto-append-added");
    }

    updateEditHandlers(photo, tags);
}


// Handlers must be updated with current photo data
function updateEditHandlers(photo, tags) {
    let deletePhotoBtn = $("#photo-modal-delete-photo-btn");
    let editForm = $("#photo-modal-edit-form");

    // Remove previous handlers
    deletePhotoBtn.off("click");
    editForm.off("submit");

    // Add new click handler to deletePhotoBtn
    deletePhotoBtn.click({ tags: tags }, function (event) {
        let tags = event.data.tags;
        let photoId = $("#photo-modal-photo-id").text();

        fetch('http://localhost:3000/photos/' + photoId, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(function () {
                deleteTagsIfVoid(tags.map(tag => { return tag.id })).then(function () {
                    location.reload();
                });
            })
            .catch(function (error) {
                console.log(`Error al eliminar la foto con id ${photoId}: ` + error);
            });
    });

    // Reset url autoValidation
    editForm.removeClass("autoValidationAdded");
    removeAutoValidation($("#photo-modal-edit-url"));

    // Add new submit handler to editForm
    editForm.submit({ photo: photo, tags: tags }, function (event) {
        event.preventDefault();
        $("#photo-modal-edit-error").hide();

        let photo = event.data.photo;
        let oldTags = event.data.tags;
        let errors = 0;

        let url = $("#photo-modal-edit-url");
        let title = $("#photo-modal-edit-title");

        let urlVal = url.val();
        let titleVal = title.val().trim().replace(/\s\s+/g, ' ');
        let descriptionVal = $("#photo-modal-edit-description").val().trim();
        let newTagsNames = getTagsArray("photo-modal-edit-tag");
        let publicVal = $("#photo-modal-edit-visibility input:checked").val() == "public" ? true : false;

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
                            let resolvedTags = []
                            let tagsNamesToResolve = [...newTagsNames];
                            let tagsIdsToCheck = [];

                            for (let i = 0; i < oldTags.length; i++) {
                                if (newTagsNames.includes(oldTags[i].name)) {
                                    resolvedTags.push(oldTags[i]);
                                    tagsNamesToResolve.splice(tagsNamesToResolve.indexOf(oldTags[i].name), 1);
                                }
                                else {
                                    tagsIdsToCheck.push(oldTags[i].id);
                                }
                            }

                            resolveTags(tagsNamesToResolve).then(function (response) {
                                let newTags = resolvedTags.concat(response);
                                let resolvedTagsIds = newTags.map(tag => { return tag.id });

                                let photoData = {
                                    "tags": resolvedTagsIds
                                };

                                // Add modified data
                                if (urlVal != photo.url) {
                                    photoData.url = urlVal;
                                }
                                if (titleVal != photo.title) {
                                    photoData.title = titleVal;
                                }
                                if (descriptionVal != photo.description) {
                                    photoData.description = descriptionVal;
                                }
                                if (publicVal != photo.public) {
                                    photoData.public = publicVal;
                                }

                                fetch('http://localhost:3000/photos/' + photo.id, {
                                    method: "PATCH",
                                    body: JSON.stringify(photoData),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + getToken(),
                                    }
                                })
                                    .then(function () {
                                        getPhoto(photo.id).then(function (response) {
                                            let updatedPhoto = response.data;

                                            deleteTagsIfVoid(tagsIdsToCheck).then(function () {
                                                if (publicVal == photo.public) {
                                                    updateEditableData(updatedPhoto, newTagsNames);
                                                    updateEditHandlers(updatedPhoto, newTags);
                                                    switchPhotoModalTo(0);
                                                }
                                                else {
                                                    location.reload();
                                                }
                                            })
                                        });

                                    })
                                    .catch(function () {
                                        $("#photo-modal-edit-error").text("An error occurred. Please try again.");
                                        $("#photo-modal-edit-error").show();
                                    });
                            });
                        }
                        else {
                            $("#photo-modal-edit-error").text("Please, do not use offensive words in description: " + badword);
                            $("#photo-modal-edit-error").show();
                        }
                    });
                }
                else {
                    $("#photo-modal-edit-error").text("Please, do not use offensive words in title: " + badword);
                    $("#photo-modal-edit-error").show();
                }
            });
        }
    });
}