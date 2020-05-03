function loadSignup() {
    $("#signup-form").submit(function (event) {
        event.preventDefault();

        let errors = 0;

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

        errors += checkInput(firstName, checkFirstName);
        errors += checkInput(lastName, checkLastName);
        errors += checkInput(email, checkEmail);
        errors += checkInput(username, checkUsername);
        errors += checkInput(password, checkPassword);
        errors += checkInput(phoneNum, checkPhoneNum);

        if (errors === 0) {
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

function handleSignupError(error) {
    $("#signup-error").css("display", "block");
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


// Returns 1 when input is not in a correct format.
function checkInput(input, checker) {
    addInputEvent(input, checker);

    if (checker(input.val())) {
        input.addClass("is-valid");
        return 0;
    } else{
        input.addClass("is-invalid");
        return 1;
    }
}

function addInputEvent(input, checker) {
    input.on("input", function () {
        if (checker(this.value)) {
            input.removeClass("is-invalid");
            input.addClass("is-valid");
        } else {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
        }
    });
}