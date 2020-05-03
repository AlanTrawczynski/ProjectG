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
            $("#login-input-error").css("display", "block");
            $("#login-password").val("");
        }
    });
}

function handleLogin(data) {
    let token = data.accessToken;
    storeToken(token);
    window.location.href = "index.php";
}

function handleLoginError(error) {
    $("#login-error").css("display", "block");
    $("#login-input-error").css("display", "none");
}