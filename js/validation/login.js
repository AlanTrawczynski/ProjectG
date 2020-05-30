function loadLoginValidation() {
    $("#login-form").submit(function (event) {
        event.preventDefault();

        let errors = 0;

        let email = $("#login-email");
        let password = $("#login-password");

        let emailVal = email.val();
        let passwordVal = password.val();

        errors += checkErrors(email, checkEmail, false);
        errors += checkErrors(password, checkPassword, false);

        if (errors === 0) {
            let loginData = {
                "email": emailVal,
                "password": passwordVal
            };

            $.ajax({
                url: "http://localhost:3000/login",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(loginData),
                success: handleLogin,
                error: handleLoginError
            });
        }
        else {
            incorrectLoginInput();
        }
    });
}


function handleLogin(data) {
    let token = data.accessToken;

    storeToken(token).then(function () {
        window.location.href = "index.php";
    });
}

function handleLoginError(error) {
    if (error.status == 400) {
        incorrectLoginInput();
    } else {
        $("#login-error").show();
        $("#login-input-error").hide();
    }
}

function incorrectLoginInput() {
    let passwordInput = $("#login-password");

    $("#login-error").hide();
    $("#login-input-error").show();
    passwordInput.val("");
    passwordInput.focus();
}