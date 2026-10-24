window.opensignup = function () {
    const signupOverlay = document.getElementById('signupOverlay');
    signupOverlay.classList.remove('hidden');
  };
  
  window.opensignin = function () {
    const signinOverlay = document.getElementById('signinOverlay');
    signinOverlay.classList.remove('hidden');
  };

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
            window.location.href = `../resultados_busqueda_sinlog/resultados_busqueda_sinlog.html?titulo=${encodeURIComponent(titulo)}`; 
        }
      });
    }
    async function datos(mail, usuario, contraseña,) {

      let endpoint = `${BASE_URL}/api/auth/registro`;
      console.log(endpoint);
      let data = {
        email: mail,
        username: usuario,
        password: contraseña,
        
      };
      let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let datitos = {};

  
      let contentType = respuesta.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        datitos = await respuesta.json();
      }
    
      datitos.status = respuesta.status;
      return datitos;
      


    }
    // SignUp
    let usernamesu = document.getElementById("usernamesu");
    let mailsu = document.getElementById("mailsu"); 
    let passwordsu = document.getElementById("passwordsu"); 
    let subtnsend = document.getElementById("signupbtnsend");
    let mensajesu = document.getElementById("mensajesu");

    if (subtnsend) {
      subtnsend.addEventListener("click", async function(e){
        e.preventDefault();
        

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
          
          let objetoDatos = await datos(mailsusave, usernamesusave, passwordsusave);

          console.log(objetoDatos);
          
            if (objetoDatos.status === 200 || objetoDatos.status === 201) {
              let userIDStorage = objetoDatos.id;
              localStorage.setItem('userId', userIDStorage);
              localStorage.setItem('usernameSession', usernamesusave);
                mensajesu.innerHTML = "Creación de cuenta exitosa.<br>Bienvenido " + usernamesusave + "!<br>Redirigiendote...";
                mensajesu.style.color = "green";
                setTimeout(() => {
                  window.location.href="../user_dashboard/user_dashboard.html"; 
              }, 3000);
            } else if (objetoDatos.status === 409) {
                mensajesu.innerText = "Ya existe una cuenta con este mail y/o nombre de usuario.";
                mensajesu.style.color = "red";
            } 
          
            
        }
      });
    }
    
    async function datosLogin(usuario, contraseña,) {
      
      let endpoint = `${BASE_URL}/api/auth/login`;
      
      let data = {
        username: usuario,
        password: contraseña,
        
      };
      let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let datitos = { status: respuesta.status };
      let contentType = respuesta.headers.get('content-type');
  
       
      if (contentType && contentType.includes('application/json')) {
          let respuestaApi = await respuesta.json();
    
          // Si la respuesta es un objeto, la asignamos; si es un texto o número, la guardamos dentro de datitos.data
          if (typeof respuestaApi === 'object' && respuestaApi !== null) {
            datitos = respuestaApi;
          } else {
            datitos.data = respuestaApi;
          }
        }
      datitos.status = respuesta.status;
      return datitos;
      


    }
    

    // SignIn
    const usernamesi = document.getElementById("usernamesi");
    const passwordsi = document.getElementById("passwordsi"); 
    const sibtnsend = document.getElementById("signinbtnsend");
    const mensajesi = document.getElementById("mensajesi");

    if (sibtnsend) {
      sibtnsend.addEventListener("click", async function (e) {

        e.preventDefault();
        let usernamesisave = usernamesi.value;
        let passwordsisave = passwordsi.value;
        let objetoDatos = await datosLogin(usernamesisave, passwordsisave);

        if (objetoDatos.status === 200) {
            mensajesi.innerText = "Bienvenido " + usernamesisave + " !";
            mensajesi.style.color = "green";
            let idUsu = objetoDatos.id;
            localStorage.setItem('userId',idUsu)
            localStorage.setItem('usernameSession', usernamesisave);
            setTimeout(() => {
              window.location.href="../user_dashboard/user_dashboard.html"; //espera y hace que no se pueda hacer para atras
          }, 3000);
        }  else if ([400, 401, 403, 404].includes(objetoDatos.status)) {
             mensajesi.innerText = "El nombre de usuario o la contraseña son incorrectos.";
             mensajesi.style.color = "red";
           } else {
             mensajesi.innerText = "Error en el servidor. Código: " + objetoDatos.status;
             mensajesi.style.color = "red";
           } 
      });
    }

    