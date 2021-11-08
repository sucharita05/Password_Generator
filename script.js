const lengthRange = document.getElementById('lengthRange');
const lengthNumber = document.getElementById('lengthNumber');
const includeUppercaseElement = document.getElementById('uppercase');
const includeLowercaseElement = document.getElementById('lowercase');
const includeNumberElement = document.getElementById('number');
const includeSymbolElement = document.getElementById('symbols');
const form = document.getElementById('passwordGenerator');
const passwordDisplay = document.getElementById('password');
const clipboardElement = document.getElementById('clipboard');


const UPPERCASE_CHAR_CODE = arrayFromLowtoHigh(65, 90);
const LOWERCASE_CHAR_CODE = arrayFromLowtoHigh(97, 122);
const NUMBER_CHAR_CODE = arrayFromLowtoHigh(48, 57);

const symbols = '!@#$%^&*(){}[]=<>/,.';
const SYMBOL_CHAR_CODE = arrayFromString(symbols);

lengthRange.addEventListener('input', syncPasswordLength);
lengthNumber.addEventListener('input', syncPasswordLength);


/*copy clipboard*/
function copyToClipboard() {
    let result = document.getElementById("password");
    let newpassword = result.innerText;
    navigator.clipboard.writeText(newpassword);
    let copyPassword = document.getElementById("passwordDisplay");
    copyPassword.classList.add("active");
    setTimeout(function(){
        copyPassword.classList.remove("active");
    }, 2500);
}


form.addEventListener('submit', e => {
    const passwordLength = lengthNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeLowercase = includeLowercaseElement.checked;
    const includeNumber = includeNumberElement.checked;
    const includeSymbols = includeSymbolElement.checked;
    e.preventDefault();
    if (!includeUppercase && !includeLowercase && !includeNumber && !includeSymbols) {
        alert("Please select at least one option to generate a password");
    } else {
        const password = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbols);
        passwordDisplay.innerText = password;
    }
})


/* Generate Password */
function generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbols) {
    let charCode = [];
    if (includeUppercase) charCode = charCode.concat(UPPERCASE_CHAR_CODE);
    if (includeLowercase) charCode = charCode.concat(LOWERCASE_CHAR_CODE);
    if (includeNumber) charCode = charCode.concat(NUMBER_CHAR_CODE);
    if (includeSymbols) charCode = charCode.concat(SYMBOL_CHAR_CODE);

    const passwordCharacter = [];
    for (let i = 0; i < passwordLength; i++) {
        const character = charCode[Math.floor(Math.random() * charCode.length)];
        passwordCharacter.push(String.fromCharCode(character));
    }
    return passwordCharacter.join('');
}


function arrayFromLowtoHigh(low, high) {
    const arr = [];
    for (let i = low; i <= high; i++) {
        arr.push(i);
    }
    return arr;
}

function arrayFromString(str) {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
}

function syncPasswordLength(e) {
    const value = e.target.value;
    lengthRange.value = value;
    lengthNumber.value = value;
}
