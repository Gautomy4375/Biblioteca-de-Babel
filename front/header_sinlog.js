// 1. Funciones globales para que los onclick="" del HTML las encuentren
window.opensignup = function () {
    const signupOverlay = document.getElementById('signupOverlay');
    if (signupOverlay) signupOverlay.classList.remove('hidden');
  };
  
  window.opensignin = function () {
    const signinOverlay = document.getElementById('signinOverlay');
    if (signinOverlay) signinOverlay.classList.remove('hidden');
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const headerContent = `
        <!-- CSS STYLES FOR THE HEADER -->
        <style>
    .barra {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: #842739;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 30px;
      padding: 0 20px;
      box-sizing: border-box;
      z-index: 1000;
    }
    .barra .logo { width: 40px; height: 40px; position: relative; }
    .barra .nombre { font-size: 2.5rem; font-weight: 400; }
    .barra .buscador-container {
      position: relative;
      display: inline-block;
      width: 23%;
      padding-right: 10%;
      height: 39px;
    }
    @media (width < 1500px) {
      .barra .buscador-container { padding-right: 0%; }
    }
    .barra .buscador-container .buscador {
      border-radius: 21000px;
      border-style: solid;
      border-color: white;
      height: 39px;
      width: 100%;
      padding: 10px 12px;
      padding-left: 40px;
      box-sizing: border-box;
    }
    .barra .buscador-container .lupita {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      pointer-events: none;
    } 
      .barralinks {
      width: 70vw;
      display: flex;
      
      .menu {
        position: relative;
        width: 40%;
        display: flex;
        flex-direction: row;
        gap: 35%;
        font-size: 30px;
        padding-right: clamp(20px, 5%, 50px);
        button {
          width: 30vh;
          height: 40px;
          border-radius: 8px;
          background: #FFF;
          border-style: solid;
          border-color: #FFF;
  
          a {
            color: #000000;
            text-decoration: none;
            text-wrap: nowrap;
            font-size: 20px;
          }
        }
      }
    }
  
    .signup, .signin {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: rgba(128, 128, 128, .5);
      z-index: 10000;
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    .signup.hidden, .signin.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .signup .signup1, .signin .signin1 {
      z-index: 100000;
      display: flex;
      flex-direction: column;
      height: 40%;
      aspect-ratio: 1/2;
      background-color: cyan;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
    }
    </style>
  
    <!-- POPUPS Y HEADER -->
    <article id="signupOverlay" class="signup hidden">
        <section class="signup1">
            <h1>Sign Up</h1>
            <div class="cat">
                <div class="dato">Nombre de Usuario</div>
                <input type="text" class="input-text" id="usernamesu">
            </div>
            <div class="cat">
                <div class="dato">E-Mail</div>
                <input type="text" class="input-text" id="mailsu">
            </div>
            <div class="cat">
                <div class="dato">Contraseña</div>
                <input type="password" class="input-text" id="passwordsu">
            </div>
            <button class="dato boton" id="signupbtnsend">Sign Up</button>
            <div id="mensajesu" class="mensajesu"></div>
        </section>
    </article>
  
    <article id="signinOverlay" class="signin hidden">
        <section class="signin1">
            <h1>Sign In</h1>
            <div class="cat">
                <div class="dato">Nombre de Usuario o E-Mail</div>
                <input type="text" class="input-text" id="usernamesi">
            </div>
            <div class="cat">
                <div class="dato">Contraseña</div>
                <input type="password" class="input-text" id="passwordsi">
            </div>
            <button class="boton" id="signinbtnsend">Sign in</button>
            <div id="mensajesi" class="mensajesi"></div>
        </section> 
    </article>
  
    <section class="barra">
        <img class="logo" src="../logo.svg" alt="">
        <div class="nombre lora-font">Babel</div>
        <!-- Agregado el tag <form> con ID para evitar el error JS -->
        <form id="busca" class="buscador-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wiYOfiSl6tCHwpDPn72D9SZys0KGLXcgtrD5GIAWJQ&s=10" alt="Icono" class="lupita">
            <input id="buscador" class="buscador plus-jakarta-sans" type="text" placeholder="Buscar...">
        </form>
        <div class="barralinks">
            <nav class="menu plus-jakarta-sans">
                <button class="botonmenu plus-jakarta-sans"><a href="#" style="color:black; text-decoration:none;">Libros</a></button>
                <button class="botonmenu plus-jakarta-sans"><a href="#" style="color:black; text-decoration:none;">Listas</a></button>
                <!-- Removidas las etiquetas <a> internas para evitar conflicto de clicks -->
                <button onclick="opensignin()" class="botonmenu plus-jakarta-sans">Sign In</button>
                <button onclick="opensignup()" class="botonmenu plus-jakarta-sans">Sign Up</button>
            </nav>
        </div>
    </section>
    `;
  
    // Insertar HTML al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerContent);
  
    // Capturar elementos
    const signupOverlay = document.getElementById('signupOverlay');
    const signinOverlay = document.getElementById('signinOverlay');
    const mensajesu = document.getElementById("mensajesu");
    const mensajesi = document.getElementById("mensajesi");
  
    // Cierre al hacer click en el fondo oscuro
    signupOverlay.addEventListener('click', (event) => {
      if (event.target === signupOverlay) signupOverlay.classList.add('hidden');
    });
  
    signinOverlay.addEventListener('click', (event) => {
      if (event.target === signinOverlay) signinOverlay.classList.add('hidden');
    });
  
    // Lógica del buscador
    const formBusca = document.getElementById('busca');
    const inputBusca = document.getElementById('buscador');
  
    if (formBusca) {
      formBusca.addEventListener('submit', function (event) {
        event.preventDefault();
        let titulo = inputBusca.value.trim();
        if (titulo) {
          window.location.href = `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(titulo)}`;
        }
      });
    }
  
    // Lógica de Envío Sign Up
    const subtnsend = document.getElementById("signupbtnsend");
    subtnsend.addEventListener("click", () => {
      const usernamesu = document.getElementById("usernamesu").value;
      const mailsu = document.getElementById("mailsu").value;
      const passwordsu = document.getElementById("passwordsu").value;
  
      if (!mailsu.includes("@")) {
        mensajesu.innerText = "Este e-mail no es válido.";
        mensajesu.style.color = "red";
      } else if (usernamesu.includes("@")) {
        mensajesu.innerHTML = 'El nombre de usuario no puede tener "@".';
        mensajesu.style.color = "red";
      } else {
        let status = "201"; // Simulación de backend
        if (status === "201") {
          mensajesu.innerHTML = `Creación de cuenta exitosa.<br>Bienvenido ${usernamesu}!`;
          mensajesu.style.color = "green";
          window.location.href = "../user_dashboard/user_dashboard.html";
        }
      }
    });
  
    // Lógica de Envío Sign In
    const sibtnsend = document.getElementById("signinbtnsend");
    sibtnsend.addEventListener("click", () => {
      const usernamesi = document.getElementById("usernamesi").value;
      const passwordsi = document.getElementById("passwordsi").value;
  
      let status = "200"; // Simulación de backend
      if (status === "200") {
        mensajesi.innerText = "Bienvenido " + usernamesi + " !";
        mensajesi.style.color = "green";
        window.location.href = "../user_dashboard/user_dashboard.html";
      }
    });
  });