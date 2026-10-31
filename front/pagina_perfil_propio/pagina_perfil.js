let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

let id = localStorage.getItem('userId');

async function datosPerfil(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        window.location.href='../pagina_error_log/pagina_error.html';
    }

    return datos;

}
async function traerSeguidores(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/seguidores`
    let respuesta = await fetch(endpoint);
    let datosSeguidores = '';

    if (respuesta.ok){
        datosSeguidores = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosSeguidores
}

async function traerSeguidos(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/seguidos`;
    let respuesta = await fetch(endpoint);
    let datosSeguidos = { cantidad: 0 };

    if(respuesta.ok){
        datosSeguidos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosSeguidos

}
async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = { libros: [] }; 

    if(respuesta.ok){
        libros = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    console.log(libros);
    return libros
}
 async function datosLibro(nombre){

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }

    return datos;
}

// arma las 5 estrellas de una reseña: las que pasan la puntuacion quedan grises
function armarEstrellas(puntuacion){
    let estrellas = '';

    for (let i = 1; i <= 5; i++){
        let clases = 'star';

        if (i > Number(puntuacion)){
            clases = 'star grey';
        }

        estrellas += `
        <svg viewBox="0 0 1280 1181" class="${clases}">
            <g transform="translate(0.000000,1181.000000) scale(0.100000,-0.100000)">
                <path d="M6327 11292 c-60 -180 -161 -489 -227 -687 -65 -198 -233 -709 -373-1135 -141 -426 -367 -1114 -503 -1527 l-248 -753 -2358 0 c-1297 0 -2358 -3-2358 -7 0 -5 170 -130 378 -279 207 -149 1057 -758 1887 -1353 831 -596 1518-1091 1528 -1100 20 -19 55 94 -420 -1346 -187 -570 -344 -1047 -628 -1910-141 -429 -286 -869 -322 -978 -36 -109 -63 -201 -60 -204 7 -6 -236 -180 1912 1362 1012 726 1855 1331 1872 1343 l33 23 762 -548 c2447 -1758 3053-2191 3056 -2188 2 2 -46 153 -106 337 -61 183 -216 655 -346 1048 -511 1556-712 2168 -811 2470 -145 440 -185 563 -185 575 0 6 855 623 1900 1373 1045 750 1900 1368 1900 1373 0 5 -909 10 -2357 11 l-2356 3 -164 500 c-90 275-272 826 -403 1225 -131 399 -383 1166 -560 1705 -177 539 -325 983 -329 987-4 5 -55 -139 -114 -320z"/>
            </g>
        </svg>
        `
    }

    return estrellas;
}

async function traerResenias(id){

    let endpoint = `${BASE_URL}/api/usuarios/${id}/resenias`;
    let respuesta = await fetch(endpoint);
    let datos = { reseñas: [] };

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}


async function traerListas(idDueño, idSolicitante){
    let endpoint = `${BASE_URL}/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    let respuesta = await fetch(endpoint);
    let datosListas = { listas: [] };

    if(respuesta.ok){
        datosListas = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosListas;
}
function mostrarListas(listas){
    let calis = document.querySelectorAll('.cali');

    for(let i = 0; i < calis.length && i < listas.length; i++){
        calis[i].querySelector('.nombre').textContent = listas[i].nombre;
        calis[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${listas[i].id_lista}`;
        });

        let portadas = calis[i].querySelectorAll('.librito');
        for(let j = 0; j < portadas.length && j < listas[i].libros.length; j++){
            portadas[j].src = listas[i].libros[j].libro.portada;
        }
    }
}

async function traerFavoritos(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/preferencias`

    let respuesta = await fetch(endpoint);

    let datos = { libros_elegidos: [] };

    if(respuesta.ok){
        datos = await respuesta.json();

    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}

async function traerPorLeer(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/progreso`;

    let respuesta = await fetch(endpoint);
    let porLeer = []; 

    if(respuesta.ok){
        let progreso = (await respuesta.json()).progreso;
        

        for(let item of progreso) {
            if (item.estado_libro === 'no_empezado') {
               porLeer.push(item.google_id);
            }
        }
        console.log(porLeer);
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return porLeer;
}


async function cargarDatos(){
    let objeto = await datosPerfil(id);
    let todoSeguidores = await traerSeguidores(id);
    let todoSeguidos = await traerSeguidos(id);

    ;
    
    console.log(objeto);
    console.log('avatar:', objeto.avatar);

    let foto_perfil = document.getElementById('foto_perfil');
    foto_perfil.src = objeto.avatar;

    let nombre = document.getElementById('nom');
    nombre.textContent = objeto.username;

    

    

    let seguidores = document.getElementById('seguidores');
    seguidores.textContent = todoSeguidos.cantidad;
    let seguidos = document.getElementById('seguidos');
    seguidos.textContent =todoSeguidores.cantidad;

    let listas = document.getElementById('listas');
    let todoListas = await traerListas(id, id);
    if(todoListas){
        listas.textContent = todoListas.listas.length;
        mostrarListas(todoListas.listas);
    }
    else{
        listas.textContent = '0';
    }

    let contenedor = document.getElementById('lele')

    let idLeidos = await traerLeidos(id);


    let leidosArray = idLeidos.libros;

    let leidos = document.getElementById('leidos');
    leidos.textContent = leidosArray.length;

    let cincoLeidos = leidosArray.slice(0,5);

    console.log(cincoLeidos);

    let clases = ['libr uno', 'libr dos', 'libr tres', 'libr cuatro', 'libr cinco'];

    contenedor.innerHTML= '';

    for(let i = 0; i < cincoLeidos.length; i++){

        let ob = await datosLibro(cincoLeidos[i]);

        contenedor.innerHTML+=`
        <img src='${ob.portada}' class='${clases[i]}' onclick="irAFicha('${cincoLeidos[i]}')"></img>
        
        `
    }

    let reseniasUsuarioObjeto = await traerResenias(id);
    let reseniasUsuarioArray = reseniasUsuarioObjeto.reseñas
    let res = reseniasUsuarioArray.slice(0,4);
    let cont = document.getElementById('todo');
    console.log(res);

    cont.innerHTML = '';

    for (let i = 0; i < res.length; i++){

        let ob = await datosLibro(res[i].google_id);
        cont.innerHTML += `
         <section class="res">
            <img src='${ob.portada}' class="imagen" onclick="irAFicha('${res[i].google_id}')"></img>
            <div class="ladoim">
                <article class="til">${ob.title}</article>
                <article class="datos">${armarEstrellas(res[i].puntuacion)}</article>
                <article class="des" >${res[i].contenido}</article>
            </div>
        </section>
        `
    }

    let favoritosUsuarioObjeto = await traerFavoritos(id);
    let favoritos = favoritosUsuarioObjeto.libros_elegidos;

    console.log('peruti',favoritos);
    let conte = document.getElementById('libs');

    conte.innerHTML='';

    for(let i = 0; i < favoritos.length; i++){
        let ob = await datosLibro(favoritos[i].google_id);
        conte.innerHTML += `
        <img src="${ob.portada}" class="lib" onclick="irAFicha('${favoritos[i].google_id}')"></img>
        `
    }


    let arrayPorLeer = await traerPorLeer(id);
    let librosPorLeer = arrayPorLeer.slice(0,6);

    console.log(librosPorLeer);

    let clasesPl = ['book one', 'book two', 'book three', 'book four', 'book five', 'book six'];

    let conten = document.getElementById('plpl');

    conten.innerHTML='';

    for(let i = 0; i < librosPorLeer.length; i++){
        let ob = await datosLibro(librosPorLeer[i]);

        conten.innerHTML+=`
          <img src='${ob.portada}' class='${clasesPl[i]}' onclick="irAFicha('${librosPorLeer[i]}')"></img>
        `
    }

    



}

//carga de todo + gif (lit ya lo usamos en cuarenta mil paginas :)

let cargador = document.getElementById('cargadorCon');

async function cargarTodo() {
    try {
        await cargarDatos();
    } catch (error) {
        console.error("Error cargando el perfil", error);
    }
    cargador.classList.add('hidden');
}
cargarTodo();

function irAFicha(google_id) {
    window.location.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${google_id}`
}

let masResenias = document.getElementById('masReseñas');

masResenias.addEventListener('click', function(e){
    e.preventDefault();

    window.location.href=`../ver mas reseñas/ver_masr.html?idUsu=${id}`

})
let vermLeidos = document.getElementById('verm');

vermLeidos.addEventListener('click', function(e){
    e.preventDefault();

    window.location.href= `../Ver más leidos/mas_leidos.html?q=${id}`;
})

let vermp = document.getElementById('vermp');

vermp.addEventListener('click', function(e){
    e.preventDefault();

    window.location.href = `../Ver más por leer/mas_leer.html?q=${id}`;
})







function logout() {
    const userChoice = confirm("⚠ ALERTA ⚠ Vas a cerrar sesión, quieres continuar?");

    if (userChoice) {
        localStorage.removeItem('userId');
        localStorage.removeItem('usernameSession');
        window.location.replace("../home/home.html");
        } else {
    }

}




//TETSEO