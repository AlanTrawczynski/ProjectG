function storeToken(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenTime", new Date().getTime());
    localStorage.setItem("userId", jwt_decode(token).sub);
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


function logout(reload = false) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
    localStorage.removeItem("id");

    if (reload) {
        location.reload();
    }
}