// 1. Funciones globales para que las encuentre el onclick="" del HTML
window.opensignup = function () {
    const signupOverlay = document.getElementById('signupOverlay');
    signupOverlay.classList.remove('hidden');
  };
  
  window.opensignin = function () {
    const signinOverlay = document.getElementById('signinOverlay');
    signinOverlay.classList.remove('hidden');
  };
  
  document.addEventListener("DOMContentLoaded", function() {
      const headerContent = `
        <!-- CSS STYLES FOR THE HEADER -->
        <style>
/* fonts */
.lora-font {
    font-family: "Lora", serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  
  .plus-jakarta-sans {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  button {
  cursor: pointer;
  }

  

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
      gap: 30px; /* padding de nombre de app */
    
      padding: 0 20px;
      box-sizing: border-box;
      z-index: 1000;
      
      .logo {
        width: 40px;
        height: 40px;
        position: relative;
      }
      .nombre { /* estilo del "babel" */
          font-size: 2.5rem;
          font-weight: 400;
      }
      .buscador-container { /*esto es para el padding y etc*/
        position: relative;
        display: inline-block;
        width: 23%;
        padding-right: 10%;
        height: 39px;
    
      @media (width<1500px) {
          padding-right: 0%;
        }
        
        .buscador {
          border-radius: 21000px;
          border-style: solid;
          border-color: white;
          height: 39px;
        }
        input { /*estilos para el placeholder e input del buscador*/
            width: 100%;
            padding: 10px 12px;
            padding-left: 40px;
            box-sizing: border-box;
        }
        .lupita {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          pointer-events: none; /* Permite hacer clic a través de la imagen hacia el input */
        }
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
    }
  
    .signup {
      position: fixed;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: rgba(128, 128, 128, .5);
      z-index: 10000;
      
      /* transition */
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .signup.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    
    .signup .signup1 {
      z-index: 100000;
      display: flex;
      flex-direction: column;
      height: 40%;
      width: 30%;
      background-color: #F1EEE7;
      justify-content: space-between;
      align-items: center;

      .cat {
        width: 70%;

        .dato {
          font-size: 1.3rem;
        }
        .input-text {
          width: 100%;
          appearance: none;
          background: white;
          border: none;
          border-bottom: 1.5px solid #c79298;
          border-radius: 0;
          outline: none;
          box-shadow: none;
        }

      }

    
      .boton {
          font-size: 1.5rem;
          text-align: center;
          background-color: white;
          border: none;
          border-radius: 8px;
          padding: 10px;
      }
    }
    
    
    .signin {
      position: fixed;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: rgba(128, 128, 128, .5);
      z-index: 10000;
      
      /* transition */
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .signin.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    
    .signin .signin1 {
      z-index: 100000;
      display: flex;
      flex-direction: column;
      height: 40%;
      width: 30%;
      background-color: #F1EEE7;
      justify-content: space-between;
      align-items: center;

      .cat {
        width: 70%;

        .dato {
          font-size: 1.3rem;
        }
        .input-text {
          width: 100%;
          appearance: none;
          background: white;
          border: none;
          border-bottom: 1.5px solid #c79298;
          border-radius: 0;
          outline: none;
          box-shadow: none;
        }

      }
          
      .boton {
        font-size: 1.5rem;
        text-align: center;
        background-color: white;
        border: none;
        border-radius: 8px;
        padding: 10px;
    }
  }
        </style>
    
          <!-- #region signup y login popups y header -->
          <!-- #region signup popup -->
          <article id="signupOverlay" class="signup hidden">
              <section class="signup1">
                  <h1 class="lora-font">Sign Up</h1>
                  <div class="lora-font cat">
                      <div class="lora-font dato">Nombre de Usuario</div>
                      <input type="text" class="lora-font input-text" name="" id="usernamesu">
                  </div>
                  <div class="lora-font cat">
                      <div class="lora-font dato">E-Mail</div>
                      <input type="text" class="lora-font input-text" name="" id="mailsu">
                  </div>
                  <div class="lora-font cat">
                      <div class="lora-font dato">Contraseña</div>
                      <input type="text" class="lora-font input-text" name="" id="passwordsu">
                  </div>
                  <button class="plus-jakarta-sans dato boton" id="signupbtnsend">Sign Up</button>
                  <div id="mensajesu" class="lora-font mensajesu"></div>
              </section>
          </article>
  
          <!-- #endregion -->
  
          <!-- #region signin popup -->
          <article id="signinOverlay" class="lora-font signin hidden">
              <section class="lora-font signin1">
                  <h1>Sign In</h1>
                  <div class="lora-font cat">
                      <div class="lora-font dato">Nombre de Usuario o E-Mail</div>
                      <input type="text" class="lora-font input-text" name="" id="usernamesi">
                  </div>
  
                  <div class="lora-font cat">
                      <div class="lora-font dato">Contraseña</div>
                      <input type="text" class="lora-font input-text" name="" id="passwordsi">
                  </div>
                  <button class="plus-jakarta-sans boton" id="signinbtnsend">Sign in</button>
  
                  <div id="mensajesi" class="lora-font mensajesi"></div>
              </section> 
          </article>
          <!-- #endregion -->
  
          <section class="lora-font barra">
              <img class="logo" src="../logo.svg" alt="">
              <div class="nombre lora-font">Babel</div>
              <form id="busca" class="buscador-container">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wiYOfiSl6tCHwpDPn72D9SZys0KGLXcgtrD5GIAWJQ&s=10" alt="Icono" class="lupita">
                  <input id="buscador" class="buscador plus-jakarta-sans" type="text" placeholder="Buscar...">
              </form>
              <div class="barralinks">
                  <nav class="menu plus-jakarta-sans">
                      <button class="botonmenu plus-jakarta-sans"><a href="../dashboard_libros_sinlog/dashboard_libros_sinlog.html">Libros</a></button>
                      <button class="botonmenu plus-jakarta-sans"><a href="../listas_nologueado/listas_nologueado.html">Listas</a></button>
                      <button onclick="opensignin()" class="botonmenu plus-jakarta-sans"><a href="javascript:void(0)">Sign In</a></button>
                      <button onclick="opensignup()" class="botonmenu plus-jakarta-sans"><a href="javascript:void(0)">Sign Up</a></button>
                  </nav>
              </div>
          </section> 
          <!-- #endregion -->
      `;
    

      document.body.insertAdjacentHTML('afterbegin', headerContent);
  

      const signupOverlay = document.getElementById('signupOverlay');
      const signinOverlay = document.getElementById('signinOverlay');
  

      if (signupOverlay) {
        signupOverlay.addEventListener('click', (event) => {
          if (event.target === signupOverlay) {
            signupOverlay.classList.add('hidden');
          }
        });
      }
  
      if (signinOverlay) {
        signinOverlay.addEventListener('click', (event) => {
          if (event.target === signinOverlay) {
            signinOverlay.classList.add('hidden');
          }
        });
      }
  
      // JS de la búsqueda
      let enter = document.getElementById('busca');
      let input = document.getElementById('buscador');
  
      if (enter) {
        enter.addEventListener('submit', function(event){
          event.preventDefault();
          let titulo = input ? input.value.trim() : '';
          if (titulo) {
              window.location.href = `../resultados_busqueda_sinlog/resultados_busqueda_sinlog.html?q=${encodeURIComponent(titulo)}`; 
          }
        });
      }
      async function datos(mail, usuario, contraseña,) {

        let endpoint = `/api/auth/registro?username=${usuario}?email=${mail}?password=${contraseña}`;
        let datosPri = await fetch(endpoint);
        let datitos = await datosPri.json();

        return datitos;


      }
      // SignUp
      let usernamesu = document.getElementById("usernamesu");
      let mailsu = document.getElementById("mailsu"); 
      let passwordsu = document.getElementById("passwordsu"); 
      let subtnsend = document.getElementById("signupbtnsend");
      let mensajesu = document.getElementById("mensajesu");
  
      if (subtnsend) {
        subtnsend.addEventListener("click", () => {
          let usernamesusave = usernamesu.value;
          let mailsusave = mailsu.value;
          let passwordsusave = passwordsu.value;
  
          if (!mailsusave.includes("@")) {
              mensajesu.innerText = "Este e-mail no es válido.";
              mensajesu.style.color = "red";
          } else if (usernamesusave.includes("@")) {
              mensajesu.innerHTML = 'El nombre de usuario no puede tener "@".';
              mensajesu.style.color = "red";
          } else {
            let objetoDatos = datos(mailsusave, usernamesusave, passwordsusave);
              if (objetoDatos.created) {
                let userIDStorage = objetoDatos.id;
                localStorage.setItem('idUsu', userIDStorage);
                  mensajesu.innerHTML = "Creación de cuenta exitosa.<br>Bienvenido " + usernamesusave + "!<br>Redirigiendote...";
                  mensajesu.style.color = "green";
                  setTimeout(() => {
                    window.location.href = "../user_dashboard/user_dashboard.html"; 
                }, 3000);
              } else if (status === "409") {
                  mensajesu.innerText = "Ya existe una cuenta con este mail y/o nombre de usuario.";
                  mensajesu.style.color = "red";
              } 
          }
        });
      }
  
      // SignIn
      const usernamesi = document.getElementById("usernamesi");
      const passwordsi = document.getElementById("passwordsi"); 
      const sibtnsend = document.getElementById("signinbtnsend");
      const mensajesi = document.getElementById("mensajesi");
  
      if (sibtnsend) {
        sibtnsend.addEventListener("click", () => {
          let usernamesisave = usernamesi.value;
          let passwordsisave = passwordsi.value;
  
          let status = "200";
          if (status === "200") {
              mensajesi.innerText = "Bienvenido " + usernamesisave + " !";
              mensajesi.style.color = "green";
              window.location.href = "../user_dashboard/user_dashboard.html";
          } else if (status === "400" || status === "404") {
              mensajesi.innerText = "El nombre de usuario, el mail y/o la contraseña son incorrectos.";
              mensajesi.style.color = "red";
          } 
        });
      }
  });