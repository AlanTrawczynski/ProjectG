$(function(){
    $("#indexNavbar-login-form").submit(function (event) {
        event.preventDefault();
    
        let errors = false;
        let email = $("#login-email").val();
        let password = $("#login-password").val();
    
        if (!(email.includes("@"))) {
            errors = true;
        }
    
        if (password.length < 5 || password.length > 25) {
            errors = true;
        }
    
        if (!errors){
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
        else{
            //informar de que no se han introducido datos correctos
        }
    });
});

function handleLogin(data) {
    let token = data.accessToken;
    storeToken(token);
    window.location.href = "index.php";
}


//temporal
function handleLoginError(error) {
    console.log("Ha ocurrido un error en el login: " + error);
}