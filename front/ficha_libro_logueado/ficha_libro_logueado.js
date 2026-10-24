const titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let nombre = titleDesdePaginaanterior.get('google_id');
console.log(nombre);

let reviewOverlay = document.getElementById('reviewOverlay')




function openreview() {
    reviewOverlay.classList.remove('hidden');
}

reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
});




async function datosLibro(nombre) {

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else {
        console.log('hubo un error');

    }

    return datos;
}

let cargador = document.getElementById('cargadorCon');

async function cargarDatos() {
    let ob = await datosLibro(nombre);

    cargador.classList.add('hidden');

    if (!ob) {
        console.log('no se pudieron cargar los datos');
        return;
    }

    console.log(ob.title);


    let titulo = document.getElementById('titulo');
    titulo.textContent = ob.title;



    let tapa = document.getElementById('tapa')

    tapa.src = ob.portada;

    let autor = document.getElementById('autor');
    autor.textContent = ob.authors;

    let descripcion = document.getElementById('desc');
    descripcion.innerHTML = ob.description;

    let idioma = document.getElementById('idioma');
    idioma.textContent = ob.idioma;

    let año = document.querySelectorAll('.anio');
    año.forEach(element => {
        element.textContent = ob.publishedDate;
    });

    let genero = document.getElementById('genero');
    genero.textContent = ob.categorias;

    let hojas = document.getElementById('hojas');
    hojas.textContent = ob.cantidad_paginas;

    let promedio = document.getElementById('promedio');
    promedio.textContent = '3.4';

    // ytsma: datos de las reseñas

    let tituloRes = document.getElementById('titulo_reseña');
    tituloRes.textContent = ob.title

    let anioRes = document.getElementById('anio_reseña');
    anioRes.textContent = new Date();

    let portadaRes = document.getElementById('portadaReseña');
    portadaRes.src = ob.portada;

    let link1 = document.getElementById('link1');
    link1.href = 'https://cuspide.com/';

    let link2 = document.getElementById('link2');
    link2.href = 'https://cuspide.com/';

    let link3 = document.getElementById('link3');
    link3.href = 'https://cuspide.com/';

    let link4 = document.getElementById('link4');
    link4.href = 'https://archive.org/';


    let username1 = document.getElementById('username1');
    username1.textContent = 'USERNAME1';
    username1.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

    let fotoperfil1 = document.getElementById('fotoperfil1')
    fotoperfil1.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

    let username2 = document.getElementById('username2');
    username2.textContent = 'USERNAME2';
    username2.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

    let fotoperfil2 = document.getElementById('fotoperfil2')
    fotoperfil2.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

    let username3 = document.getElementById('username3');
    username3.textContent = 'USERNAME3';
    username3.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

    let fotoperfil3 = document.getElementById('fotoperfil3')
    fotoperfil3.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

}

cargarDatos();

let puntuacion = null;

let unaEstrella = document.getElementById('star1')
let dosEstrellas = document.getElementById('star2');
let tresEstrellas = document.getElementById('star3');
let cuatroEstrellas = document.getElementById('star4');
let cincoEstrellas = document.getElementById('star5');

let botonLeido = document.getElementById('botonLeido');
let botonPor = document.getElementById('botonPor');
let botonLey = document.getElementById('botonLeyendo');
let idUsuario = localStorage.getItem('userId');

unaEstrella.addEventListener('click', function () {
    puntuacion = unaEstrella.value;
    console.log(puntuacion);
})
dosEstrellas.addEventListener('click', function () {
    puntuacion = dosEstrellas.value;
})
tresEstrellas.addEventListener('click', function () {
    puntuacion = tresEstrellas.value;
})
cuatroEstrellas.addEventListener('click', function () {
    puntuacion = cuatroEstrellas.value;
})
cincoEstrellas.addEventListener('click', function () {
    puntuacion = cincoEstrellas.value;
})

// si el usuario ya le puso estrellas a este libro, las marco
async function traerProgreso() {
    let endpoint = `${BASE_URL}/api/libros/progreso?google_id=${encodeURIComponent(nombre)}&id_usuario=${idUsuario}`;
    let respuesta = await fetch(endpoint);
    let datos = {};

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    return datos;
}

async function cargarPuntuacion() {
    let datos = await traerProgreso();
    // el README dice { Progreso } pero el backend manda el objeto directo, acepto las dos
    let progreso = datos && datos.Progreso ? datos.Progreso : datos;

    if (progreso && progreso.puntuacion > 0) {
        puntuacion = progreso.puntuacion;
        let estrella = document.getElementById(`star${progreso.puntuacion}`);
        if (estrella) {
            estrella.checked = true;
        }
    }
    if (progreso && progreso.estado_libro) {
        estado = progreso.estado_libro;
        marcarEstado(estado);
    }
}
cargarPuntuacion();

let estado = null;

async function crearEstado() {
    let endpoint = `${BASE_URL}/api/libros/progreso?google_id=${encodeURIComponent(nombre)}`;

    let data = {
        estado_libro: estado,
        id_usuario: idUsuario,
        puntuacion: puntuacion,

    }

    let respuesta = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let datos = null;

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else {
        console.log('hubo un error :(');
    }
    return datos;

}

// pinta de verde el boton del estado actual (no_empezado = Por Leer)
function marcarEstado(est) {
    botonLeido.classList.toggle('activo', est === 'leido');
    botonPor.classList.toggle('activo', est === 'no_empezado');
    botonLey.classList.toggle('activo', est === 'leyendo');
}

async function guardarEstado(nuevoEstado) {
    estado = nuevoEstado;
    let resultado = await crearEstado();
    if (resultado) {
        marcarEstado(estado);
        alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
    }
    else {
        console.log('hubo otro error');
    }
}

botonLeido.addEventListener('click', function (e) {
    e.preventDefault();
    guardarEstado('leido');
})

botonPor.addEventListener('click', function (e) {
    e.preventDefault();
    // el backend no acepta 'porleer', el estado de "por leer" es 'no_empezado'
    guardarEstado('no_empezado');
})

botonLey.addEventListener('click', function (e) {
    e.preventDefault();
    guardarEstado('leyendo');
})

let selectLista = document.getElementById('selectLista');
let botonLista = document.getElementById('botonLista');

async function traerMisListas() {
    let endpoint = `${BASE_URL}/api/usuarios/${idUsuario}/${idUsuario}/listas`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else {
        console.log('hubo un error');
    }
    return datos;
}

async function cargarMisListas() {
    let datos = await traerMisListas();

    if (datos) {
        datos.listas.forEach(lista => {
            let opcion = document.createElement('option');
            opcion.value = lista.id_lista;
            opcion.textContent = lista.nombre;
            selectLista.appendChild(opcion);
        });
    }

    let crear = document.createElement('option');
    crear.value = 'crear';
    crear.textContent = '+ Crear lista';
    selectLista.appendChild(crear);
}
cargarMisListas();

function irACrearLista() {
    window.location.href = `../crear_lista/crear_lista.html?google_id=${encodeURIComponent(nombre)}`;
}

selectLista.addEventListener('change', function () {
    if (selectLista.value === 'crear') {
        irACrearLista();
    }
})

botonLista.addEventListener('click', async function (e) {
    e.preventDefault();

    if (selectLista.value === 'crear') {
        irACrearLista();
        return;
    }

    let endpoint = `${BASE_URL}/api/listas/${selectLista.value}/libros`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), google_id: nombre })
    });

    if (respuesta.ok) {
        alert('Agregaste este libro a la lista');
    }
    else if (respuesta.status === 409) {
        alert('Este libro ya está en la lista');
    }
    else {
        console.log('hubo un error');
    }
})

// HAGO LOS FETCH DE LAS RESEÑAS

let idUsuarioReseña = localStorage.getItem('userId');

let puntuacionReseña = null;

let unaReseña = document.getElementById('star1res');
let dosReseñas = document.getElementById('star2res');
let tresReseñas = document.getElementById('star3res');
let cuatroReseñas = document.getElementById('star4res');
let cincoReseñas = document.getElementById('star5res');

let textoReseña = document.getElementById('reviewText');
let enviarReseña = document.getElementById('reviewbtnsend');

unaReseña.addEventListener('click', function () {
    puntuacionReseña = unaReseña.value;

    console.log(puntuacionReseña);
})

dosReseñas.addEventListener('click', function () {
    puntuacionReseña = dosReseñas.value;
    console.log(puntuacionReseña);
})

tresReseñas.addEventListener('click', function () {
    puntuacionReseña = tresReseñas.value;
    console.log(puntuacionReseña);
})

cuatroReseñas.addEventListener('click', function () {
    puntuacionReseña = cuatroReseñas.value;
    console.log(puntuacionReseña);
})

cincoReseñas.addEventListener('click', function () {
    puntuacionReseña = cincoReseñas.value;
    console.log(puntuacionReseña);
})


async function crearResenia() {

    let endpoint = `${BASE_URL}/api/libros/resenias?google_id=${nombre}`

    let dataReseñas = {
        id_usuario: idUsuarioReseña,
        contenido: textoReseña.value,
    }

    let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataReseñas)
    });
    let datosReseña = null;

    if (respuesta.ok) {
        datosReseña = await respuesta.json();
    }
    else {
        console.log('hubo un error :(');
    }
    return datosReseña;

}
enviarReseña.addEventListener('click', function (e) {
    e.preventDefault();

    let resultado = crearResenia();

    if (resultado) {
        alert(`Creaste una reseña para el libro ${ob.title}`)
    }
})

