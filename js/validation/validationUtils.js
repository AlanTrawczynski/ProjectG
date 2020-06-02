// Returns 1 when input is not in a correct format.
function checkErrors(input, checker, addFeedback = true) {
    if (checker(input.val())) {
        if (addFeedback) {
            isValid(input);
        }
        return 0;
    }
    else {
        if (addFeedback) {
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

function isValid(input) {
    input.removeClass("is-invalid");
    input.addClass("is-valid");
}

function isInvalid(input) {
    input.addClass("is-invalid");
    input.removeClass("is-valid");
}

function removeAutoValidation(input) {
    input.removeClass("is-valid");
    input.removeClass("is-invalid");
    input.off("input");
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

function checkUrl(data) {
    return data !== "" && new RegExp("(https?:\/\/.*\.(?:png|jpeg|jpg))").test(data);
}

function checkIfVoid(data) {
    return data !== "";
}


// returns bad word if found, else returns null
async function checkBadwords(text) {
    let words = text.trim().replace(/(\r?\n)+/g, " ").split(/\s+/);
    let foundBadword = null;

    await axios.get(`http://localhost:3000/badwords`)
        .then(function (response) {
            let badwords = response.data;

            for (word of words) {              
                if (badwords.includes(word.trim())) {
                    foundBadword = word.trim();
                    break;
                }
            }
        })
        .catch(function (error) {
            console.log(`Error al pedir las palabras ofensivas: ` + error);
        });
    
    return foundBadword;
}