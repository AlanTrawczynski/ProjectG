function loadTagEditValidation() {
    $("#editTag-form").submit(function (event) {
        event.preventDefault();

        let errorContainer = $("#editTag-error");
        let successContainer = $("#editTag-success");
        errorContainer.hide()
        successContainer.hide()

        let errors = 0;

        let oldTagInput = $("#editTag-oldTagName");
        let newTagInput = $("#editTag-newTagName");

        let oldTagName = oldTagInput.val().trim().replace(/\s+/g, '');
        let newTagName = newTagInput.val().trim().replace(/\s+/g, '');

        oldTagInput.val(oldTagName);
        newTagInput.val(newTagName);

        if (!($(this).hasClass("autoValidationAdded"))) {
            addAutoValidation(oldTagInput, checkIfVoid);
            addAutoValidation(newTagInput, checkIfVoid);
            $(this).addClass("autoValidationAdded");
        }

        errors += checkErrors(oldTagInput, checkIfVoid);
        errors += checkErrors(newTagInput, checkIfVoid);

        if (errors === 0) {
            getTagByName(oldTagName).then(function (response) {
                let oldTag = response.data.length === 0 ? null : response.data[0];
                let oldTagExists = oldTag === null ? false : true;

                if (oldTagExists) {
                    getTagByName(newTagName).then(function (response) {
                        let newTagExists = response.data.length === 0 ? false : true;

                        if (!newTagExists) {
                            fetch('http://localhost:3000/tags/' + oldTag.id, {
                                method: "PATCH",
                                body: JSON.stringify({ "name": newTagName }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + getToken(),
                                }
                            })
                                .then(function () {
                                    successContainer.text(oldTagName + " has been correctly modified.");
                                    successContainer.show();
                                    oldTagInput.val("");
                                    oldTagInput.removeClass("is-valid");
                                    newTagInput.val("");
                                    newTagInput.removeClass("is-valid");
                                })
                                .catch(function (error) {
                                    console.log(`Error al actualizar el voto con id ${id}: ` + error);
                                });
                        }
                        else {
                            errorContainer.text(newTagName + " already exists.");
                            errorContainer.show();
                        }
                    });
                }
                else {
                    errorContainer.text(oldTagName + " does not exist.");
                    errorContainer.show();
                }
            });
        }
    });
}