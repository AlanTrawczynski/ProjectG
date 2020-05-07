function loadNewPhotoValidation() {
    $("#newPhoto-form").submit(function (event) {
        event.preventDefault();
        $("#newPhoto-error").hide();

        let errors = 0;

        let url = $("#newPhoto-url");
        let title = $("#newPhoto-title");

        let urlVal = url.val();
        let titleVal = title.val().trim().replace(/\s\s+/g, ' ');
        let descriptionVal = $("#newPhoto-description").val().trim();
        let date = new Date().toISOString();
        let tags = getTagsArray();
        let publicVal = $("#newPhoto-visibility input:checked").val() == "public" ? true : false;
        let userId = getLoggedUserId();

        title.val(titleVal);

        if (!($(this).hasClass("autoValidationAdded"))) {
            addAutoValidation(url, checkUrl);
            $(this).addClass("autoValidationAdded");
        }

        errors += checkErrors(url, checkUrl);

        if (errors === 0) {
            let photoData = {
                "url": urlVal,
                "title": titleVal,
                "description": descriptionVal,
                "date": date,
                "upvotes": 0,
                "downvotes": 0,
                "tags": tags,
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
        }
    });


    $("#newPhoto-tags-input").keydown(function (event) {
        if (event.keyCode == 32) {
            let tagsArray = getTagsArray();
            let tagText = $(this).val().trim();

            $(this).val("");

            if (tagText !== "" && !tagsArray.includes(tagText)) {
                let tagHtml = generateTag(tagText);

                $("#newPhoto-tags-container").append(tagHtml);

                $("#newPhoto-tags-container div:last-child").click(function() {
                    let tagText = $(this).children()[0].textContent;

                    $("#newPhoto-tags-input").val(tagText);
                    $(this).remove();
                });
            }
        }
    });
}


function handleNewPhoto() {
    window.location.href = "index.php";
}

function handleNewPhotoError() {
    $("#newPhoto-error").show();
}


function generateTag(tagText) {
    return `
        <div class="badge badge-pink">
            <span class='newPhoto-tagContent pointer'>${tagText}</span>
            <span class='ml-2 pointer large-font' onclick='$(this).parent().remove()' aria-hidden="true">&times;</span>
        </div>`;
}


function getTagsArray() {
    return jQuery.map($(".newPhoto-tagContent"), function (element) {
        return element.textContent;
    });
}