async function resolveTags(tagsNames) {
    let tags = [];

    for (tagName of tagsNames) {
        await resolveTag(tagName)
            .then(function (response) {
                tags.push(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return tags;
}

// If tag with tagName does not exist, creates it. Returns tagId.
function resolveTag(tagName) {
    return new Promise(function (resolve, reject) {
        axios.get(`http://localhost:3000/tags?name=${tagName}`)
            .then(function (response) {
                // If tag exists in db, gets its id
                if (response.data.length != 0) {
                    let tag = response.data[0];

                    resolve(tag);
                }
                // Else creates the tag and then gets its id
                else {
                    let data = { "name": tagName };

                    fetch('http://localhost:3000/tags/', {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + getToken(),
                        }
                    })
                        .then(function () {
                            waitForResponse(tagName).then(function (tag) {
                                resolve(tag);
                            });
                        })
                        .catch(function (error) {
                            reject(`Error al crear la etiqueta con nombre ${tagName}: ` + error);
                        });
                }
            })
            .catch(function (error) {
                reject(`Error al consultar la etiqueta con nombre ${tagName}: ` + error);
            });
    });
}

async function waitForResponse(tagName) {
    let tag = null;

    while (tag === null) {
        await getTagByName(tagName).then(function (response) {
            if (response.data.length !== 0) {
                tag = response.data[0];
            }
        });
    }

    return tag;
}


async function deleteTagsIfVoid(ids) {
    for (id of ids) {
        await getPhotosByTagId(id).then(function (photos) {
            if (photos === null) {
                fetch('http://localhost:3000/tags/' + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + getToken()
                    }
                }).catch(function (error) {
                    console.log(`Error al eliminar la etiqueta con id ${id}: ` + error);
                });
            }
        });
    }
}


/////////////////////////////////////////////////////////////////////////////////////////


function generatePinkTag(tagName, tagClass) {
    return `
        <div class="badge badge-pink">
            <span class='${tagClass} pointer'>${tagName}</span>
            <span class='ml-2 pointer' onclick='$(this).parent().remove()' aria-hidden="true">&times;</span>
        </div>`;
}


function generateGreyTag(tagName) {
    if (isLogged()) {
        return `
            <div class="badge badge-grey">
                <a href='search.php?tag=${tagName}'>${tagName}</a>
            </div>`;
    }
    else {
        return `
            <div class="badge badge-grey">
                <span>${tagName}</span>
            </div>`;
    }
}


// Allows to auto-append written tags in tagsInput to tagsContainer
function addTagAutoAppend(tagsInput, tagsContainer, tagsClass) {
    tagsInput.keydown(function (event) {

        if (event.keyCode == 32 || event.keyCode == 13) {
            let tagsArray = getTagsArray(tagsClass);
            let tagText = $(this).val().trim().replace(/\s+/g, '');

            $(this).val("");

            // Prevent form submit
            if (event.keyCode == 13) {
                event.preventDefault();
                $(this).blur();
            }

            if (tagText !== "" && !tagsArray.includes(tagText)) {
                let tagHtml = generatePinkTag(tagText, tagsClass);

                tagsContainer.append(tagHtml);
                addTagEdition($(this), tagsContainer);
            }
        }
    });
}

// Returns content of all tags that contain tagsClass class
function getTagsArray(tagsClass) {
    return jQuery.map($(`.${tagsClass}`), function (element) {
        return element.textContent;
    });
}

// Adds edition to last append tag in tagsContainer
function addTagEdition(tagsInput, tagsContainer) {
    tagsContainer.children().last().click(function () {
        let tagText = $(this).children()[0].textContent;

        tagsInput.val(tagText);
        $(this).remove();
        tagsInput.focus();
    });
}