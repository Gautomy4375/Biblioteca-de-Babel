let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

let nombredesdepaginaanterior = new URLSearchParams(window.location.search);
let id = nombredesdepaginaanterior.get('id');

let idTuyo = localStorage.getItem('userId')

async function datosPerfil(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = {datos: []};

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
    let datosSeguidores = {seguidores: []};

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
    let datosSeguidos= {seguidos: []};

    if(respuesta.ok){
        datosSeguidos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosSeguidos

}
async function traerListas(idDueño, idSolicitante){
    let endpoint = `${BASE_URL}/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    let respuesta = await fetch(endpoint);
    let datosListas = {Listas: []};

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
async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = {libros: []};

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
    let datos = {libros: 0};

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }

    return datos;
}
async function traerResenias(id){

    let endpoint = `${BASE_URL}/api/usuarios/${id}/resenias`;
    let respuesta = await fetch(endpoint);
    let datos = {reseñas: []};

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}
async function seguir(id){

    let endpoint = `${BASE_URL}/api/usuarios/${id}/seguir`;

    let data = {
        Seguido: idTuyo
    }

    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let datosSeguir = '';

    if(respuesta.ok){
        datosSeguir = await respuesta.json();
    }
    else if(respuesta.status !== 404 && respuesta.status !== 400 && respuesta.status !== 409){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosSeguir;
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


async function cargarDatos(){

    console.log('me fijo si funciona la funcion')
    let objeto = await datosPerfil(id);
    let todoSeguidores = await traerSeguidores(id);
    let todoSeguidos = await traerSeguidos(id);

    console.log(todoSeguidos);
    

    let foto_perfil = document.getElementById('foto_perfil');
    foto_perfil.src = objeto.avatar;

    console.log('fijo');

    let nombre = document.getElementById('nom');
    nombre.textContent = objeto.username;

    console.log('fijo1');

    let seguidores = document.getElementById('seguidores');
    seguidores.textContent = todoSeguidos.cantidad;
    let seguidos = document.getElementById('seguidos');
    seguidos.textContent = todoSeguidores.cantidad;
    let listas = document.getElementById('listas');
    let todoListas = await traerListas(id, id);
    if(todoListas){
        listas.textContent = todoListas.listas.length;
        mostrarListas(todoListas.listas);
    }
    else{
        listas.textContent = '0';
    }
   
    
    console.log('fijo2');

    let contenedor = document.getElementById('lele')

    let idLeidos = await traerLeidos(id);

    console.log(idLeidos)


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

    let favoritosUsuarioObjeto = await traerFavoritos(id);
    let favoritos = favoritosUsuarioObjeto.libros_elegidos;

    console.log('peruti',favoritos);
    let conte = document.getElementById('libs');

    conte.innerHTML='';

    for(let i = 0; i < favoritos.length; i++){
        let ob = await datosLibro(favoritos[i].google_id);
        conte.innerHTML += `
        <img src="${ob.portada}" class="lib"></img>
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
          <img src='${ob.portada}' class='${clasesPl[i]}' ></img>
        `
    }
}
let cargador = document.getElementById('cargadorCon');

async function cargarTodo() {
    console.log('aver');
    try {
        await cargarDatos();
    } catch (error) {
        console.error("Error cargando el perfil", error);
    }
    cargador.classList.add('hidden');
}
cargarTodo();



let btnSeguir = document.getElementById('seguir');
    console.log('me fijo si funciona el bo', btnSeguir)

    btnSeguir.addEventListener('click', async function(e){
        e.preventDefault();

        console.log('me fijo si funciona cuando clickeo');

        let resultado = await seguir(id);

        let nombreSeguido = await datosPerfil(id);

        if(resultado){
            alert(`Ahora estas siguiendo a ${nombreSeguido.username}`)
        }
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
