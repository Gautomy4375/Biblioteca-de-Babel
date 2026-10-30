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


    let username1 = document.getElementById('username1');
    username1.textContent = 'USERNAME1';
    username1.href = '../pagina_perfil_ajeno_sinlog/pagina_perfil_ajeno_sinlog.html'

    let fotoperfil1 = document.getElementById('fotoperfil1')
    fotoperfil1.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

    let username2 = document.getElementById('username2');
    username2.textContent = 'USERNAME2';
    username2.href = '../pagina_perfil_ajeno_sinlog/pagina_perfil_ajeno_sinlog.html'

    let fotoperfil2 = document.getElementById('fotoperfil2')
    fotoperfil2.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

    let username3 = document.getElementById('username3');
    username3.textContent = 'USERNAME3';
    username3.href = '../pagina_perfil_ajeno_sinlog/pagina_perfil_ajeno_sinlog.html'

    let fotoperfil3 = document.getElementById('fotoperfil3')
    fotoperfil3.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';
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
