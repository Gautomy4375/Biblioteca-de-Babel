const titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let nombre = titleDesdePaginaanterior.get('google_id');
console.log(nombre);

async function datosLibro(nombre){

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
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

// traduce un texto del ingles al español con la api de MyMemory
// si falla devuelve el texto original
async function traducir(texto) {
    try {
        let endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`;
        let respuesta = await fetch(endpoint);
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

// pasa el codigo del idioma (es, en, fr...) al nombre completo en español
// si el codigo no es valido devuelve el codigo tal cual
function nombreIdioma(codigo) {
    try {
        let nombres = new Intl.DisplayNames(['es'], { type: 'language' });
        let nombre = nombres.of(codigo);
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    }
    catch (error) {
        return codigo;
    }
}

let cargador = document.getElementById('cargadorCon');

async function cargarDatos(){
    let ob = await datosLibro(nombre);

    cargador.classList.add('hidden');

    if(!ob){
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
    idioma.textContent = nombreIdioma(ob.idioma);

    let año = document.querySelectorAll('.anio');
    año.forEach(element => {
        element.textContent = ob.publishedDate;
        });

    let genero = document.getElementById('genero');
    if (ob.categorias && ob.categorias.length > 0) {
        // muestro la original y la cambio cuando llega la traduccion
        genero.textContent = ob.categorias[0];
        traducir(ob.categorias[0]).then(traducida => {
            genero.textContent = traducida;
        });
    }

    let hojas = document.getElementById('hojas');
    hojas.textContent = ob.cantidad_paginas;

    let link1 = document.getElementById('link1');
    link1.href = `https://www.yenny-elateneo.com/search/?q=${encodeURIComponent(ob.title)}`;

    let link2 = document.getElementById('link2');
    link2.href = `https://cuspide.com/?s=${encodeURIComponent(ob.title)}&post_type=product`;

    let link3 = document.getElementById('link3');
    if (ob.link_compra === undefined) {
        link3.href = `https://www.google.com/search?q=${encodeURIComponent(ob.title)}+comprar`;
    } else {
        link3.href = ob.link_compra;
    }

    let link4 = document.getElementById('link4');
    if (ob.link_gratis === undefined) {
        link4.href = `https://www.google.com/search?q=${encodeURIComponent(ob.title)}+libro+leer+gratis`;
    } else {
        link4.href = ob.link_gratis;
    }
}

cargarDatos();

async function traerReseñas(nombre){
    let endpoint = `${BASE_URL}/api/libros/resenias?google_id=${nombre}`;
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

async function cargarReseñas() {
    let datos = await traerReseñas(nombre);
    let reseñas = datos.reseñas;
    let lista = document.getElementById('lista-reseñas');
    let plantilla = document.getElementById('reseña-template');

    if (reseñas.length === 0) {
        lista.textContent = 'Todavía no hay reseñas';
        return;
    }

    for (let i = 0; i < reseñas.length; i++) {
        // la linea que separa una reseña de la otra
        if (i > 0) {
            let linea = document.createElement('hr');
            linea.classList.add('hr-reseñas');
            lista.appendChild(linea);
        }

        let clon = plantilla.content.cloneNode(true);

        let estrellas = clon.querySelectorAll('.star');
        for (let j = 0; j < estrellas.length; j++) {
            if (j >= reseñas[i].puntuacion) {
                estrellas[j].classList.add('grey');
            }
        }

        clon.querySelector('.profile_pic').src = reseñas[i].autor.avatar;

        let username = clon.querySelector('.username');
        username.textContent = reseñas[i].autor.username;
        username.href = `../pagina_perfil_ajeno_sinlog/pagina_perfil_ajeno_sinlog.html?id=${reseñas[i].autor.id}`;

        clon.querySelector('.texto').textContent = reseñas[i].contenido;

        lista.appendChild(clon);
    }
}

cargarReseñas();

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
