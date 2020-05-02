function loadSignup() {
    $("#signup-form").submit(function (event) {
        event.preventDefault();

        let errors = false;

        let firstName = $("#signup-firstName");
        let lastName = $("#signup-lastName");
        let email = $("#signup-email");
        let username = $("#signup-username");
        let password = $("#signup-password");
        let phoneNum = $("#signup-phoneNum");

        let firstNameVal = firstName.val().trim().replace(/\s\s+/g, ' ');
        let lastNameVal = lastName.val().trim().replace(/\s\s+/g, ' ');
        let emailVal = email.val().trim().replace(/\s+/g, '');
        let usernameVal = username.val().trim().replace(/\s+/g, '');
        let passwordVal = password.val();
        let phoneNumVal = phoneNum.val().trim().replace(/\s\s+/g, ' ');

        firstName.val(firstNameVal);
        lastName.val(lastNameVal);
        email.val(emailVal);
        username.val(usernameVal);
        password.val(passwordVal);
        phoneNum.val(phoneNumVal);

        if (!checkFirstName(firstNameVal)) {
            errors = true;
            firstName.addClass("is-invalid");
            addInputEvent(firstName, checkFirstName);
        }

        if (!checkLastName(lastNameVal)) {
            errors = true;
            lastName.addClass("is-invalid");
            addInputEvent(lastName, checkLastName);
        }

        if (!checkEmail(emailVal)) {
            errors = true;
            email.addClass("is-invalid");
            addInputEvent(email, checkEmail);
        }

        if (!checkUsername(usernameVal)) {
            errors = true;
            username.addClass("is-invalid");
            addInputEvent(username, checkUsername);
        }

        if (!checkPassword(passwordVal)) {
            errors = true;
            password.addClass("is-invalid");
            addInputEvent(password, checkPassword);
        }

        if (!checkPhoneNum(phoneNumVal)) {
            errors = true;
            phoneNum.addClass("is-invalid");
            addInputEvent(phoneNum, checkPhoneNum);
        }

        if (!errors) {
            let signup_data = {
                "name": firstNameVal,
                "surname": lastNameVal,
                "phone": phoneNumVal,
                "email": emailVal,
                "password": passwordVal,
                "user": usernameVal
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
}


function handleRegister(data) {
    let token = data.accessToken;
    storeToken(token);
    window.location.href = "index.php";
}

//temporal
function handleSignupError(error) {
    console.log("Ha ocurrido un error en el registro: " + error);
}


function checkFirstName(data) {
    return data !== "" && data.length >= 3 && data.length <= 25;
}

function checkLastName(data) {
    return data !== "" && data.length >= 3 && data.length <= 40;
}

function checkEmail(data) {
    return data !== "" && data.includes("@");
}

function checkUsername(data) {
    return data !== "" && data.length >= 5 && data.length <= 15;
}

function checkPassword(data) {
    return data !== "" && data.length >= 5 && data.length <= 25;
}

function checkPhoneNum(data) {
    return data !== "" && new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(data);
}


function addInputEvent(input, checker){
    input.on("input", function () {
        if(checker(this.value)){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
        }   else{
            input.addClass("is-invalid");
            input.removeClass("is-valid");
        }
    });
}