function loadSignupValidation() {
    $("#signup-form").submit(function (event) {
        event.preventDefault();

        $("#signup-register-error").hide();
        $("#signup-input-error").hide();

        let errors = 0;

        let firstName = $("#signup-firstName");
        let lastName = $("#signup-lastName");
        let email = $("#signup-email");
        let username = $("#signup-username");
        let password = $("#signup-password1");
        let password2 = $("#signup-password2");
        let phoneNum = $("#signup-phoneNum");

        let firstNameVal = firstName.val().trim().replace(/\s\s+/g, ' ');
        let lastNameVal = lastName.val().trim().replace(/\s\s+/g, ' ');
        let emailVal = email.val().trim().replace(/\s+/g, '');
        let usernameVal = username.val().trim().replace(/\s+/g, '');
        let passwordVal = password.val();
        let password2Val = password2.val();
        let phoneNumVal = phoneNum.val().trim().replace(/\s\s+/g, ' ');

        firstName.val(firstNameVal);
        lastName.val(lastNameVal);
        email.val(emailVal);
        username.val(usernameVal);
        phoneNum.val(phoneNumVal);

        if (!($(this).hasClass("autoValidationAdded"))) {
            addAutoValidation(firstName, checkFirstName);
            addAutoValidation(lastName, checkLastName);
            addAutoValidation(email, checkEmail);
            addAutoValidation(username, checkUsername);
            addAutoValidation(password, checkPassword);
            addAutoValidation(password2, checkPassword);
            addAutoValidation(phoneNum, checkPhoneNum);
            $(this).addClass("autoValidationAdded");
        }

        errors += checkErrors(firstName, checkFirstName);
        errors += checkErrors(lastName, checkLastName);
        errors += checkErrors(email, checkEmail);
        errors += checkErrors(username, checkUsername);
        errors += checkErrors(password, checkPassword);
        errors += checkErrors(password2, checkPassword);
        errors += checkErrors(phoneNum, checkPhoneNum);

        if (errors === 0) {
            // Check if email is already taken
            axios.get(`http://localhost:3000/users?email=${emailVal}`)
                .then(function (response) {
                    if (response.data.length !== 0) {
                        handleInputError(emailVal + " is already taken.");
                    }
                    else {
                        // Check if username is already taken
                        axios.get(`http://localhost:3000/users?user=${usernameVal}`)
                            .then(function (response) {
                                if (response.data.length !== 0) {
                                    handleInputError("@" + usernameVal + " is already taken.")
                                }
                                else {
                                    // Check if passwords match
                                    if (!(password === password2)) {
                                        handleInputError("Passwords do not match.")
                                        isInvalid(password);
                                        isInvalid(password2);
                                        password.val("");
                                        password2.val("");
                                    }
                                    else {
                                        // Send form data if email and username are unique and passwords match
                                        let signupData = {
                                            "name": firstNameVal,
                                            "surname": lastNameVal,
                                            "phone": phoneNumVal,
                                            "email": emailVal,
                                            "password": passwordVal,
                                            "user": usernameVal,
                                            "avatar": "",
                                            "following": []
                                        }

                                        $.ajax({
                                            url: "http://localhost:3000/register",
                                            method: "POST",
                                            data: JSON.stringify(signupData),
                                            contentType: "application/json",
                                            success: handleRegister,
                                            error: handleRegisterError
                                        });
                                    }
                                }
                            })
                            .catch(function () {
                                handleRegisterError();
                            });
                    }
                })
                .catch(function () {
                    handleRegisterError();
                });
        }
    });
}


function handleRegister(data) {
    let token = data.accessToken;

    storeToken(token).then(function () {
        window.location.href = "index.php";
    });
}

function handleRegisterError() {
    $("#signup-register-error").show();
}

function handleInputError(msg) {
    let inputErrorContainer = $("#signup-input-error");

    inputErrorContainer.text(msg);
    inputErrorContainer.show();
}