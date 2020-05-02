$(function(){
    $("#signup-form").submit(function (event) {
        event.preventDefault();
    
        let errors = false;
        let firstName = $("#signup-firstName").val().trim();
        let lastName = $("#signup-lastName").val().trim();
        let email = $("#signup-email").val().trim();
        let username = $("#signup-username").val().trim();
        let password = $("#signup-password").val();
        let phoneNum = $("#signup-phoneNum").val().trim();
    
        if (lastName.split(" ").length > 1) {
            let splt = lastName.split(" ");
            lastName = "";
    
            for (let i = 0; i < splt.length; i++) {
                if (splt[i] != "") {
                    lastName += splt[i] + " ";
                }
            } lastName = lastName.trim();
        }
    
        if (firstName.length < 3 || firstName.length > 25) {
            errors = true;
        }
    
        if (lastName.length < 3 || firstName.length > 40) {
            errors = true;
        }
    
        if (!(email.includes("@"))) {
            errors = true;
        }
    
        if (username.length < 5 || username.length > 15) {
            errors = true;
        }
    
        if (password.length < 5 || password.length > 25) {
            errors = true;
        }
    
        if (!new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(phoneNum)) {
            errors = true;
        }
    
        if (!errors) {
            let signup_data = {
                "name": firstName,
                "surname": lastName,
                "phone": phoneNum,
                "email": email,
                "password": password,
                "user": username
            }
    
            $.ajax({
                url: "http://localhost:3000/register",
                method: "POST",
                data: JSON.stringify(signup_data),
                contentType: "application/json",
                success: handleRegister,
                error: handleSignupError
            });
        }
    });
});


function handleRegister(data) {
    let token = data.accessToken;
    storeToken(token);
    window.location.href = "index.php";
}


//temporal
function handleSignupError(error) {
    console.log("Ha ocurrido un error en el registro: " + error);
}