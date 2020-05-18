async function resolveTagsIds(tagsNames) {
    let tagsIds = [];

    for (tagName of tagsNames) {
        await resolveTagId(tagName)
            .then(function (response) {
                tagsIds.push(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return tagsIds;
}

function resolveTagId(tagName) {
    return new Promise(function (resolve, reject) {
        axios.get(`http://localhost:3000/tags?name=${tagName}`)
            .then(function (response) {
                // If tag exists in db, gets its id
                if (response.data.length != 0) {
                    let tag = response.data[0];

                    resolve(tag.id);
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
                                resolve(tag.id);
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


/////////////////////////////////////////////////////////////////////////////////////////


function generateGreyTag(tagName) {
    return `
        <div class="badge badge-grey">
            <span>${tagName}</span>
        </div>`;
}