//#region signup_login_barra
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
        mensajesu.innerHTML = 'El nombre de usuario no puede tener "@".'
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
            window.location.href = "../user_dashboard/user_dashboard.html";
            } else if (status === "409") { //400 es la contraseña mal y 404 es el usuario no existe
            mensajesu.innerText = "Este ya existe una cuenta con este mail y/o nombre de usuario."
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
        window.location.href = "../user_dashboard/user_dashboard.html";
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

//#endregion

//#region libroslista
const datos = [
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Primera tarjeta" },
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Segunda tarjeta" },
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Tercera tarjeta" }
];

const librosGrid = document.getElementById('libros-grid');
// Seleccionamos la plantilla
const plantilla = document.getElementById('libro-template');

datos.forEach((item) => {
  // 1. Duplicamos/clonamos la estructura de la plantilla
  const clon = plantilla.content.cloneNode(true);

  // 2. Buscamos la img y el p DENTRO del clon y les asignamos los datos
  clon.querySelector('img').src = item.imagen;
  clon.querySelector('p').textContent = item.texto;

  // 3. Insertamos el clon en el contenedor principal
  librosGrid.appendChild(clon);
});
//#endregion