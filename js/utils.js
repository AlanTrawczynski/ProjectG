// URLs
function getPageString() {
    let sPath = window.location.pathname;
    return sPath.substring(sPath.lastIndexOf('/') + 1);
}

function getUrlValue(key) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
}


// Users
function getUser(id) {
    return axios.get(`http://localhost:3000/users/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir el user con id ${id}: ` + error);
        });
}

function patchUser(id, data) {
    return fetch('http://localhost:3000/users/' + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    }).catch(function (error) {
        console.log(`Error al actualizar el usuario con id ${id}: ` + error);
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

async function getPhotos(ids) {
    let photos = [];

    for (id of ids) {
        await getPhoto(id).then(function (response) {
            photos.push(response.data);
        })
    }

    return photos;
}

async function getPhotosByTagId(tagId, onlyPublic = false) {
    let res = null;
    let public = onlyPublic ? `&public=true` : ``;

    await axios.get(`http://localhost:3000/photos?tags_like=${tagId}${public}`)
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

function getUserPhotos(userId, public = null) {     // public = null: returns all user photos
    let publicUrl = "";

    if (public !== null) {
        if (public) {
            publicUrl = "&public=true";
        } else if (!public) {
            publicUrl = "&public=false";
        }
    }

    return axios.get(`http://localhost:3000/photos?userId=${userId}${publicUrl}`)
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


// Comments
function getPhotoComments(photoId, start = 0) {
    return axios.get(`http://localhost:3000/comments?photoId=${photoId}&_sort=id&_order=desc&_start=${start}&_limit=10`)
        .catch(function (error) {
            console.log(`Error al pedir los comentarios de la foto con id ${photoId}: ` + error);
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
        console.log(`Error al crear el voto: ` + error);
    });
}