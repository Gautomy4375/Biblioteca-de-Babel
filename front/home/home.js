//signup
let usernamesusave = "";
let mailsusave = "";
let passwordsusave = "";

// Fixed: Target the correct element IDs
const usernamesu = document.getElementById("usernamesu");
const mailsu = document.getElementById("mailsu"); 
const passwordsu = document.getElementById("passwordsu"); 

const subtnsend = document.getElementById("signupbtnsend");

subtnsend.addEventListener("click", () => {
    usernamesusave = usernamesu.value;
    mailsusave = mailsu.value;
    passwordsusave = passwordsu.value;

    if (!mailsusave.includes("@")) {
        console.log("ERROR: el mail no tiene @");
    } else if (usernamesusave.includes("@")) {
        console.log("ERROR: el usuario tiene @"); // Fixed text to match username check
    } else {
        console.log("Saved:", usernamesusave);
        console.log("Saved:", mailsusave);
        console.log("Saved:", passwordsusave);
    }
});

//signin
let usernamesisave = "";
let mailsisave = "";
let passwordsisave = "";

// Fixed: Target the correct element IDs
const usernamesi = document.getElementById("usernamesi");
const mailsi = document.getElementById("mailsi"); 
const passwordsi = document.getElementById("passwordsi"); 

const sibtnsend = document.getElementById("signinbtnsend");

sibtnsend.addEventListener("click", () => {
    usernamesisave = usernamesi.value;
    passwordsisave = passwordsi.value;

        console.log("Saved:", usernamesisave);
        console.log("Saved:", passwordsisave);
    }
);

//VISUALES

function opensignup () {
    signupOverlay.classList.remove('hidden');
}

function opensignin () {
    signinOverlay.classList.remove('hidden');
}


// Hide the form ONLY when clicking the gray background overlay
signupOverlay.addEventListener('click', (event) => {
// event.target ensures they clicked the background, not the nested .signup1 elements
if (event.target === signupOverlay) {
    signupOverlay.classList.add('hidden');
}
});

// Hide the form ONLY when clicking the gray background overlay
signinOverlay.addEventListener('click', (event) => {
// event.target ensures they clicked the background, not the nested .signin1 elements
if (event.target === signinOverlay) {
    signinOverlay.classList.add('hidden');
}
});

        // hacer un addeventlistener, que cuando lo tocas manda la info a backend (esto lo haces dsp), vas a recibir si fue exitoso o no y haces un programa que edite el texto de respuesta dependiendo si fue exitoso o no.
        // si no fue exitoso pones contraseña O usuario incorrecto, 