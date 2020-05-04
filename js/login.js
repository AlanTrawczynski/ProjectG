function loadLogin() {
    $("#login-form").submit(function (event) {
        event.preventDefault();

        let errors = 0;

        let email = $("#login-email").val();
        let password = $("#login-password").val();

        if (email === "" || !(email.includes("@"))) {
            errors++;
        }

        if (password === "" || password.length < 5 || password.length > 25) {
            errors++;
        }

        if (errors === 0) {
            let login_data = {
                email,
                password,
            };

            $.ajax({
                url: "http://localhost:3000/login",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(login_data),
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
    storeToken(token);
    window.location.href = "index.php";
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
    $("#login-error").hide();
    $("#login-input-error").show();
    $("#login-password").val("");
}