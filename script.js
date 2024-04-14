const output = document.querySelector(".generator__generated_element");
const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
const generateButton = document.querySelector("#generator__button_element");
const slider = document.querySelector(".generator__length-container");
const sliderValue = document.querySelector(".generator__title_element[data-length]");

let toastBox = document.querySelector(".toast-box");

const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: '!;,.%/(){}#+-:_"@|`$=*^[]?&~'
}

slider.querySelector("input").addEventListener("input", (e) => {
    sliderValue.setAttribute("data-length", e.target.value);
})

const generatePassword = () => {
    let password = "";
    let passwordLength = sliderValue.dataset.length;
    let selection = "";

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selection += characters[checkbox.id.split("__")[1]];
        }
    });

    if (!selection) {
        output.value = "Select Password Settings";
    } else {
        for (let i = 0; i < passwordLength; i++) {
            password += selection[Math.floor(Math.random() * selection.length)];
        }

        output.value = password;
    }  
}

const copyPassword = (action) => {
    output.select();
    output.setSelectionRange(0, 20)
    document.execCommand("copy");
    
    let toastMessage = '';

    if(action === 'copied') {
        toastMessage = '<i class="fa-solid fa-check"></i>Copied Password';
    } 

    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = toastMessage;
    toastBox.appendChild(toast);

    setTimeout(() => {
        toastBox.removeChild(toast);
    }, 3000);
}

generateButton.addEventListener("click", generatePassword);
