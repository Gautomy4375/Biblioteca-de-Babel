let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

let id = localStorage.getItem('userId');

async function datosPerfil(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('HUBO UN ERROR :(');
    }

    return datos;

}
async function traerSeguidores(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/seguidores`
    let respuesta = await fetch(endpoint);
    let datosSeguidores = null;

    if (respuesta.ok){
        datosSeguidores = await respuesta.json();
    }
    else{
        console.log('hubo un error');

    }
    return datosSeguidores
}

async function traerSeguidos(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/seguidos`;
    let respuesta = await fetch(endpoint);
    let datosSeguidos= null;

    if(respuesta.ok){
        datosSeguidos = await respuesta.json();
    }
    else{
        console.log('hubo un error')
    }
    return datosSeguidos

}
async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = null

    if(respuesta.ok){
        libros = await respuesta.json();
    }
    else{
        console.log('hubo un eror')
    }
    console.log(libros);
    return libros
}
async function datosLibro(nombre){

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
        
    }

    return datos;
}

async function traerResenias(id){

    let endpoint = `${BASE_URL}/api/usuarios/${id}/resenias`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datos;
}


async function traerListas(idDueño, idSolicitante){
    let endpoint = `${BASE_URL}/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    let respuesta = await fetch(endpoint);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
    }
    else{
        console.log('hubo un error');
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


async function cargarDatos(){
    let objeto = await datosPerfil(id);
    let todoSeguidores = await traerSeguidores(id);
    let todoSeguidos = await traerSeguidos(id);

    ;
    
    console.log(objeto);

    let foto_perfil = document.getElementById('foto_perfil');
    foto_perfil.src = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png';

    let nombre = document.getElementById('nom');
    nombre.textContent = localStorage.getItem('usernameSession');

    

    

    let seguidores = document.getElementById('seguidores');
    seguidores.textContent = todoSeguidores.cantidad;
    let seguidos = document.getElementById('seguidos');
    seguidos.textContent = todoSeguidos.cantidad;
    let leidos = document.getElementById('leidos');
    leidos.textContent = '27';
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

    let cincoLeidos = leidosArray.slice(0,5);

    console.log(cincoLeidos);

    let clases = ['libr uno', 'libr dos', 'libr tres', 'libr cuatro', 'libr cinco'];

    contenedor.innerHTML= '';

    for(let i = 0; i < cincoLeidos.length; i++){

        let ob = await datosLibro(cincoLeidos[i]);

        contenedor.innerHTML+=`
        <img src='${ob.portada}' class='${clases[i]}'></img>
        
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
            <img src='${ob.portada}' class="imagen" ></img>
            <div class="ladoim">
                <article class="til">${ob.title}</article>
                <article class="datos"></article>
                <article class="des" >${res[i].contenido}</article>
            </div>
        </section>
        `
    }


                 
}
cargarDatos();







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