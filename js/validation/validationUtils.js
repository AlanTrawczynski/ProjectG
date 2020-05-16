// Returns 1 when input is not in a correct format.
function checkErrors(input, checker, addFeedback = true) {
    if (checker(input.val())) {
        if (addFeedback){
            isValid(input);
        }
        return 0;
    }
    else {
        if (addFeedback){
            isInvalid(input);
        }
        return 1;
    }
}

function addAutoValidation(input, checker) {
    input.on("input", function () {
        if (checker(this.value)) {
            isValid(input);
        } else {
            isInvalid(input);
        }
    });
}

function isValid(input){
    input.removeClass("is-invalid");
    input.addClass("is-valid");
}

function isInvalid(input){
    input.addClass("is-invalid");
    input.removeClass("is-valid");
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

function checkRepeatedPassword(password, password2) {
    return password === password2;
}

function checkUrl(data) {
    return data !== "" && new RegExp("(https?:\/\/.*\.(?:png|jpg))").test(data);
}