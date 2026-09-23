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
        
        body {
            margin: 0;
        }
        h2, h1, p {
            padding: 0px;
            margin: 0px;
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
                gap: 3vw;
                font-size: 30px;
                padding-right: clamp(20px, 5%, 50px);
                button {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                border-radius: 8px;
                background: #FFF;
                border-style: solid;
                border-color: #FFF;
                
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 8vw;
                    gap: 5px;
                    height: 40px;
                    color: #000000;
                    text-decoration: none;
                    text-wrap: nowrap;
                    font-size: 20px;

                    img {
                    height: 90%;
                    aspect-ratio: 1/1;
                    }
                }
                }
            }

            .botonperfil {
                position: absolute;
                right: 5vw;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30vh;
                height: 40px;
                border-radius: 8px;
                background-color:transparent;
                border-style: none;
                border-color: #FFF;

                a {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                height: 40px;
                color: white;
                text-decoration: none;
                text-wrap: nowrap;
                font-size: 20px;

                img {
                    height: 90%;
                    aspect-ratio: 1/1;
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
            aspect-ratio: 1/2;
            background-color: cyan;
            justify-content: space-between;
            
            .boton {
                width: 65%;
                height: 5%;
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    aspect-ratio: 1/1;
                    height: 65%;
                }
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
            aspect-ratio: 1/2;
            background-color: cyan;
            justify-content: space-between;
            }
      </style>
  
<!-- #region signup y login popups y header -->
    <section class="barra">
        <img class="logo" src="../logo.svg" alt="">
        <div class="nombre lora-font">Babel</div>
        <div class="buscador-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wiYOfiSl6tCHwpDPn72D9SZys0KGLXcgtrD5GIAWJQ&s=10" alt="Icono" class="lupita">
            <form id="busca">
                <input class="buscador plus-jakarta-sans" id="buscador" type="text" placeholder="Buscar...">
            </form>
        </div>
        <div class="barralinks">
            <nav class="menu plus-jakarta-sans">
                <button class="botonmenu plus-jakarta-sans"><a href="../user_dashboard/user_dashboard.html">Dashboard</a></button>
                <button class="botonmenu plus-jakarta-sans"><a href="../dashboard_libros_log/dashboard_libros_log.html">Libros</a></button>
                <button class="botonmenu plus-jakarta-sans"><a href="../listas/listas.html">Listas</a></button>
            </nav>
            <button class="botonperfil plus-jakarta-sans"><a id="username" class="username" href="../pagina_perfil_propio/pagina_perfil.html"> <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/250px-Default_pfp.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail" alt=""></a></button>
        </div>
    </section> 
<!-- #endregion -->
    `;
  
    // lo pone arriba de todo
    document.body.insertAdjacentHTML('afterbegin', headerContent);


    //js de la busqueda
    let enter = document.getElementById('busca');
    let input = document.getElementById('buscador');

    enter.addEventListener('submit', function(event){
    event.preventDefault();

    let titulo = input.value.trim();

    if(titulo){
        window.location.href= `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(titulo)}`; 
    }
})
  });