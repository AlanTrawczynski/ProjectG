function storeToken(token) {
    return new Promise(function(resolve, reject) {
        let userId = jwt_decode(token).sub;

        localStorage.setItem("token", token);
        localStorage.setItem("tokenTime", new Date().getTime());
        localStorage.setItem("userId", userId);
    
        $.ajax({
            url: "http://localhost:3000/users/" + userId,
            success: function(data) {
                let username = data.user;
                localStorage.setItem("username", username);
                resolve();
            },
            error: reject,
        });
    });
}


function isLogged() {
    return getToken() !== null;
}


function getToken() {
    let token = localStorage.getItem("token");

    if (token !== null) {
        let currentTime = new Date().getTime();
        let tokenTime = localStorage.getItem("tokenTime");
        difference = (currentTime - tokenTime) / (1000 * 60 * 60);

        if (difference > 1) {
            token = null;
            logout();
        }
    }
    return token;
}


function getLoggedUser() {
    return axios.get(`http://localhost:3000/users/` + getLoggedUserId());
}

function getLoggedUserId() {
    return localStorage.getItem("userId");
}

function getLoggedUsername() {
    return localStorage.getItem("username");
}


function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
    localStorage.removeItem("userId");

    window.location.href = "index.php";
}