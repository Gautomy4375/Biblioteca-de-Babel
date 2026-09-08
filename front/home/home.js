//signup
let usernamesusave = "";
let mailsusave = "";
let passwordsusave = "";

const usernamesu = document.getElementById("usernamesu");
const mailsu = document.getElementById("mailsu"); 
const passwordsu = document.getElementById("passwordsu"); 

const subtnsend = document.getElementById("signupbtnsend");

subtnsend.addEventListener("click", () => {
    usernamesusave = usernamesu.value;
    mailsusave = mailsu.value;
    passwordsusave = passwordsu.value;

    if (!mailsusave.includes("@")) {
        mensajesu.innerText = "Este e-mail no es válido."
        mensajesu.style.color = "red"
    } else if (usernamesusave.includes("@")) {
        mensajesu.innerhtml = 'El nombre de usuario no puede tener "@".'
        mensajesu.style.color = "red"
    } else {
        console.log("Saved:", usernamesusave);
        console.log("Saved:", mailsusave);
        console.log("Saved:", passwordsusave);
        //aca se manda al back
        let status = "201" //lo pongo a mano para probar, pero llega del back
        if (status === "201") { //todo bien
            mensajesu.innerHTML = "Creación de cuenta exitosa.<br>Bienvenido username!" //donde dice "username" va el username
            mensajesu.style.color = "green"
            //window.location.href = "link del dashboard de usuario";
            } else if (status === "409") { //400 es la contraseña mal y 404 es el usuario no existe
            mensajesu.innerText = "Este nombre de usuario o un usuario con este mail ya existe."
            mensajesu.style.color = "red"
            } 
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

    //aca se manda al back
    let status = "200" //lo pongo a mano para probar, pero llega del back
    if (status === "200") { //todo bien
        mensajesi.innerText = "Bienvenido " + "username" +" !" //donde dice "username" va el username
        mensajesi.style.color = "green"
        //window.location.href = "link del dashboard de usuario";
     } else if (status === "400"||status === "404") { //400 es la contraseña mal y 404 es el usuario no existe
        mensajesi.innerText = "El nombre de usuario, el mail y/o la contarseña son incorrectos."
        mensajesi.style.color = "red"
     } 
    
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