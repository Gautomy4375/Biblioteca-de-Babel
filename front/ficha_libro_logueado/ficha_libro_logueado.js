// google_id del libro que viene en la url
let nombre = new URLSearchParams(window.location.search).get('google_id');
let idUsuario = localStorage.getItem('userId');
let nombreLibro = '';

let puntuacion = '';
let estado = '';

const FOTO_DEFAULT = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

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
    let respuesta = await fetch(`${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`);

    if (!respuesta.ok) {
        window.location.href='../pagina_error_log/pagina_error.html';
        return '';
    }
    return respuesta.json();
}



// traduce un texto del ingles al español con la api de MyMemory
// si falla devuelve el texto original
async function traducir(texto) {
    try {
        let respuesta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`);
        let datos = await respuesta.json();

        if (datos.responseStatus == 200) {
            return datos.responseData.translatedText;
        }
    }
    catch (error) {
        console.log('no se pudo traducir', error);
    }
    return texto;
}


function nombreIdioma(codigo) {
    try {
        let nombre = new Intl.DisplayNames(['es'], { type: 'language' }).of(codigo);
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    }
    catch (error) {
        return codigo;
    }
}


async function traerReseñas(nombre){
    let endpoint = `${BASE_URL}/api/libros/reseñas?google_id=${nombre}`;

    let respuesta = await fetch(respuesta);

    let datos = {reseñas: []};

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }

    return datos;
}

async function cargarDatos() {
    let ob = await datosLibro(nombre);

    document.getElementById('cargadorCon').classList.add('hidden');

    if (!ob) {
        console.log('no se pudieron cargar los datos');
        return;
    }

    document.getElementById('titulo').textContent = ob.title;
    document.getElementById('tapa').src = ob.portada;
    document.getElementById('autor').textContent = ob.authors;
    document.getElementById('idioma').textContent = nombreIdioma(ob.idioma);
    document.getElementById('hojas').textContent = ob.cantidad_paginas;

    if (ob.description && ob.description.trim() !== '') {
        document.getElementById('desc').innerHTML = ob.description;
    } else {
        document.getElementById('desc').innerHTML = 'No hay descripción disponible';
    }

    document.querySelectorAll('.anio').forEach(element => {
        element.textContent = ob.publishedDate;
    });

    if (ob.categorias && ob.categorias.length > 0) {
        let genero = document.getElementById('genero');
        // muestro la original y la cambio cuando llega la traduccion
        genero.textContent = ob.categorias[0];
        traducir(ob.categorias[0]).then(traducida => {
            genero.textContent = traducida;
        });
    }

    // ytsma: datos de las reseñas

    let tituloRes = document.getElementById('titulo_reseña');
    tituloRes.textContent = ob.title

    let anioRes = document.getElementById('anio_reseña');
    anioRes.textContent = new Date();

    let portadaRes = document.getElementById('portadaReseña');
    portadaRes.src = ob.portada;

    // links para conseguir el libro
    let titulo = encodeURIComponent(ob.title);

    let link1 = document.getElementById('link1');
    link1.href = `https://www.yenny-elateneo.com/search/?q=${titulo}`;

    let link2 = document.getElementById('link2');
    link2.href = `https://cuspide.com/?s=${titulo}&post_type=product`;

    let link3 = document.getElementById('link3');
    if (ob.link_compra === undefined) {
        link3.href = `https://www.google.com/search?q=${titulo}+comprar`;
    }
    else {
        link3.href = ob.link_compra;
    }

    let link4 = document.getElementById('link4');
    if (ob.link_gratis === undefined) {
        link4.href = `https://www.google.com/search?q=${titulo}+libro+leer+gratis`;
    }
    else {
        link4.href = ob.link_gratis;
    }


    for (let i = 1; i <= 3; i++) {
        let username = document.getElementById(`username${i}`);
        username.textContent = `USERNAME${i}`;
        username.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html';

        document.getElementById(`fotoperfil${i}`).src = FOTO_DEFAULT;
    }


    
}

cargarDatos();



async function traerRanking() {
    let endpoint = `${BASE_URL}/api/libros/ranking?google_id=${nombre}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else if (respuesta.status !== 404) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}

async function cargarPromedio() {
    let datos = await traerRanking();

    if (!datos) {
        return;
    }

    document.getElementById('promedio').textContent = datos.promedio;

    let estrellasLlenas = Math.round(datos.promedio);
    let estrellas = document.querySelectorAll('.star-promedio .star');

    for (let i = 0; i < estrellas.length; i++) {
        if (i < estrellasLlenas) {
            estrellas[i].classList.remove('grey');
        }
        else {
            estrellas[i].classList.add('grey');
        }
    }
}

cargarPromedio();



let unaEstrella = document.getElementById('star1');
let dosEstrellas = document.getElementById('star2');
let tresEstrellas = document.getElementById('star3');
let cuatroEstrellas = document.getElementById('star4');
let cincoEstrellas = document.getElementById('star5');

unaEstrella.addEventListener('click', function () {
    puntuacion = unaEstrella.value;
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

// ---------- ESTADO ----------

let botonLeido = document.getElementById('botonLeido');
let botonPor = document.getElementById('botonPor');
let botonLeyendo = document.getElementById('botonLeyendo');

// la clase activo lo pinta de verde
function marcarEstado(est) {
    botonLeido.classList.remove('activo');
    botonPor.classList.remove('activo');
    botonLeyendo.classList.remove('activo');

    if (est === 'leido') {
        botonLeido.classList.add('activo');
    }
    else if (est === 'no_empezado') {
        botonPor.classList.add('activo');
    }
    else if (est === 'leyendo') {
        botonLeyendo.classList.add('activo');
    }
}

async function guardarEstado(nuevoEstado) {
    estado = nuevoEstado;

    let respuesta = await fetch(`${BASE_URL}/api/libros/progreso?google_id=${encodeURIComponent(nombre)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado_libro: estado, id_usuario: idUsuario, puntuacion: puntuacion })
    });

    if (!respuesta.ok) {
        window.location.href='../pagina_error_log/pagina_error.html';
        return;
    }

    marcarEstado(estado);
    alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
}

botonLeido.addEventListener('click', function (e) {
    e.preventDefault();
    guardarEstado('leido');
})

botonPor.addEventListener('click', function (e) {
    e.preventDefault();
    guardarEstado('no_empezado');
})

botonLeyendo.addEventListener('click', function (e) {
    e.preventDefault();
    guardarEstado('leyendo');
})

async function traerProgreso() {
    let endpoint = `${BASE_URL}/api/libros/progreso?google_id=${nombre}&id_usuario=${idUsuario}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else if (respuesta.status !== 404 && respuesta.status !== 400) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}

async function cargarProgreso() {
    let progreso = await traerProgreso();

    if (progreso) {
        estado = progreso.estado_libro;
        marcarEstado(estado);
    }
}

cargarProgreso();

let selectLista = document.getElementById('selectLista');
let botonLista = document.getElementById('botonLista');

async function traerMisListas() {
    let endpoint = `${BASE_URL}/api/usuarios/${idUsuario}/${idUsuario}/listas`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else if (respuesta.status !== 404) {
        window.location.href='../pagina_error_log/pagina_error.html';
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

    botonLista.disabled = true;

    let endpoint = `${BASE_URL}/api/listas/${selectLista.value}/libros`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), google_id: nombre })
    });

    botonLista.disabled = false;

    if (respuesta.ok) {
        alert('Agregaste este libro a la lista');
    }
    else if (respuesta.status === 409) {
        alert('Este libro ya está en la lista');
    }
    else {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
})

// HAGO LOS FETCH DE LAS RESEÑAS

let idUsuarioReseña = localStorage.getItem('userId');

let puntuacionReseña = '';

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
        puntuacion: puntuacionReseña
    }
    console.log(dataReseñas);
    console.log(nombre);

    let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataReseñas)
    });
    let datosReseña = '';

    if (respuesta.ok) {
        datosReseña = await respuesta.json();
    }
    else if (respuesta.status !== 400) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datosReseña;

}
enviarReseña.addEventListener('click', async function (e) {
    e.preventDefault();

    enviarReseña.disabled = true;

    nombreLibro = await datosLibro(nombre);

    let resultado = await crearResenia();

    if (resultado) {
        alert(`Creaste una reseña para el libro ${nombreLibro.title}`)
    }
    else {
        enviarReseña.disabled = false;
    }
})

