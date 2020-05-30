$(function () {
    let tagName = getUrlValue('tag');

    getTagByName(tagName).then(function (response) {
        let tagId = response.data.length === 0 ? null : response.data[0].id;

        if (tagId != null) {
            getPhotosByTagId(tagId, true).then(function (photos) {
                let len = photos === null ? 0 : photos.length;

                showResults(tagName, len);
                if (len > 0) {
                    appendPhotos($("#search-gal"), photos);
                }
            })
        }
        else {
            showResults(tagName, 0);
        }
    });
});

function showResults(tagName, resultsLen) {
    let tagHtml = generateGreyTag(tagName);

    if (resultsLen > 0) {
        $("#search-results").append(`${resultsLen} results searching for ` + tagHtml);
    }
    else {
        $("#search-results").append("0 results searching for " + tagHtml);
    }

}