// google_id del libro que viene en la url
let nombre = new URLSearchParams(window.location.search).get('google_id');
let idUsuario = localStorage.getItem('userId');
let nombreLibro = null;

let puntuacion = null;
let estado = null;

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

// ---------- DATOS DEL LIBRO ----------

async function datosLibro(nombre) {
    let respuesta = await fetch(`${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`);

    if (!respuesta.ok) {
        console.log('hubo un error');
        return null;
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

    document.getElementById('link1').href = `https://www.yenny-elateneo.com/search/?q=${titulo}`;
    document.getElementById('link2').href = `https://cuspide.com/?s=${titulo}&post_type=product`;
    document.getElementById('link3').href = ob.link_compra ?? `https://www.google.com/search?q=${titulo}+comprar`;
    document.getElementById('link4').href = ob.link_gratis ?? `https://www.google.com/search?q=${titulo}+libro+leer+gratis`;


    for (let i = 1; i <= 3; i++) {
        let username = document.getElementById(`username${i}`);
        username.textContent = `USERNAME${i}`;
        username.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html';

        document.getElementById(`fotoperfil${i}`).src = FOTO_DEFAULT;
    }
}

cargarDatos();



async function traerRanking() {
    let endpoint = `${BASE_URL}/api/libros/ranking?google_id=${encodeURIComponent(nombre)}`;
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

async function cargarPromedio() {
    let datos = await traerRanking();

    if (!datos) {
        return;
    }

    document.getElementById('promedio').textContent = datos.promedio;

    // pinto doradas tantas estrellas como el promedio redondeado, el resto grises
    let estrellasLlenas = Math.round(datos.promedio);
    let estrellas = document.querySelectorAll('.star-promedio .star');

    estrellas.forEach((estrella, i) => {
        estrella.classList.toggle('grey', i >= estrellasLlenas);
    });
}

cargarPromedio();

// ---------- ESTRELLAS ----------

for (let i = 1; i <= 5; i++) {
    let estrella = document.getElementById(`star${i}`);
    estrella.addEventListener('click', function () {
        puntuacion = estrella.value;
    });
}

// ---------- ESTADO (leido / por leer / leyendo) ----------

// no_empezado = Por Leer
let botonesEstado = {
    leido: document.getElementById('botonLeido'),
    no_empezado: document.getElementById('botonPor'),
    leyendo: document.getElementById('botonLeyendo'),
};

// pinta de verde el boton del estado actual
function marcarEstado(est) {
    for (let clave in botonesEstado) {
        botonesEstado[clave].classList.toggle('activo', clave === est);
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
        console.log('hubo un error :(');
        return;
    }

    marcarEstado(estado);
    alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
}

for (let clave in botonesEstado) {
    botonesEstado[clave].addEventListener('click', function (e) {
        e.preventDefault();
        guardarEstado(clave);
    });
}

// si el usuario ya tiene estrellas o estado en este libro, los marco
async function cargarProgreso() {
    let respuesta = await fetch(`${BASE_URL}/api/libros/progreso?google_id=${encodeURIComponent(nombre)}&id_usuario=${idUsuario}`);
    if (!respuesta.ok) {
        return;
    }

    let datos = await respuesta.json();
    // el README dice { Progreso } pero el backend manda el objeto directo, acepto las dos
    let progreso = datos && datos.Progreso ? datos.Progreso : datos;
    if (!progreso) {
        return;
    }

    if (progreso.puntuacion > 0) {
        puntuacion = progreso.puntuacion;
        let estrella = document.getElementById(`star${progreso.puntuacion}`);
        if (estrella) {
            estrella.checked = true;
        }
    }

    if (progreso.estado_libro) {
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
    let datosReseña = null;

    if (respuesta.ok) {
        datosReseña = await respuesta.json();
    }
    else {
        console.log('hubo un error :(');
    }
    return datosReseña;

}
enviarReseña.addEventListener('click', async function (e) {
    e.preventDefault();

    nombreLibro = await datosLibro(nombre);

    let resultado = await crearResenia();

    if (resultado) {
        alert(`Creaste una reseña para el libro ${nombreLibro.title}`)
    }
})

