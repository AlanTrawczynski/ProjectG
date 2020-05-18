$(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tagName = urlParams.get('tag');

    getTagByName(tagName).then(function (response) {
        let tagId = response.data.length != 0 ? response.data[0].id : null;

        if (tagId != null) {
            axios.get(`http://localhost:3000/photos?tags_like=${tagId}`)
            .then(function (response) {
                let photos = response.data.filter(photo => photo.tags.includes(tagId));
                let len = photos.length;

                showResults(tagName, len);
                if (len > 0) {
                    appendPhotos("search-gal", photos);
                }
            })
            .catch(function (error) {
                console.log(`Error al pedir las fotos con etiqueta ${tagName}: ` + error);
            });
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