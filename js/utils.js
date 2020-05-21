// Users
function getUser(id) {
    return axios.get(`http://localhost:3000/users/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir el username con id ${id}: ` + error);
        });
}



// Tags
function getTag(id) {
    return axios.get(`http://localhost:3000/tags/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir la etiqueta con id ${id}: ` + error);
        });
}

async function getTags(tagsIds) {
    let tags = [];

    for (tagId of tagsIds) {
        await getTag(tagId).then(function (response) {
            tags.push(response.data);
        });
    }

    return tags;
}

function getTagByName(tagName) {
    return axios.get(`http://localhost:3000/tags?name=${tagName}`)
        .catch(function (error) {
            console.log(`Error al pedir la etiqueta con nombre ${tagName}: ` + error);
        });
}


// Photos
function getPhoto(id) {
    return axios.get(`http://localhost:3000/photos/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir la foto con id ${id}: ` + error);
        });
}

async function getPhotosByTagId(tagId) {
    let res = null;

    await axios.get(`http://localhost:3000/photos?tags_like=${tagId}`)
        .then(function (response) {
            let photos = response.data.filter(photo => photo.tags.includes(tagId));

            if (photos.length > 0) {
                res = photos;
            }
        })
        .catch(function (error) {
            console.log(`Error al pedir las fotos con etiqueta ${tagName}: ` + error);
        });
    
    return res;
}

function getUserPhotos(userId, public = true) {
    return axios.get(`http://localhost:3000/photos?userId=${userId}&public=${public}`)
        .catch(function (error) {
            console.log(`Error al pedir las fotos del usuario con id ${userId}: ` + error);
        });
}

function patchPhoto(id, data) {
    return fetch('http://localhost:3000/photos/' + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    }).catch(function (error) {
        console.log(`Error al actualizar la foto con id ${id}: ` + error);
    });
}


// Votes
function getVote(photoId, userId) {
    return axios.get(`http://localhost:3000/votes?photoId=${photoId}&userId=${userId}`)
        .catch(function (error) {
            console.log(`Error al pedir el voto con photoId ${photoId} y userId ${userId}: ` + error);
        });
}

function deleteVote(id) {
    return fetch('http://localhost:3000/votes/' + id, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).catch(function (error) {
        console.log(`Error al eliminar el voto con id ${id}: ` + error);
    });
}

function patchVote(id, data) {
    return fetch('http://localhost:3000/votes/' + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    }).catch(function (error) {
        console.log(`Error al actualizar el voto con id ${id}: ` + error);
    });
}

function postVote(data) {
    return fetch('http://localhost:3000/votes/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    }).catch(function (error) {
        console.log(`Error al crear el voto con id ${id}: ` + error);
    });
}