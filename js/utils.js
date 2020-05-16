// Photos
function getPhoto(id) {
    return axios.get(`http://localhost:3000/photos/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir la foto con id ${id}: ` + error);
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

function getUserPhotos(userId, public = true) {
    return axios.get(`http://localhost:3000/photos?userId=${userId}&public=${public}`)
        .catch(function (error) {
            console.log(`Error al pedir las fotos del usuario con id ${userId}: ` + error);
        });
}


// Users
function getUser(id) {
    return axios.get(`http://localhost:3000/users/${id}`)
        .catch(function (error) {
            console.log(`Error al pedir el username con id ${id}: ` + error);
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
            'Authorization': 'Bearer ' + getToken(),
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