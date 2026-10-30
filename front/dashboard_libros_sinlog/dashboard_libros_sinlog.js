let pos = 0;

function siguiente() {
    let imagenes = document.getElementById("container-puntuados");

    if (pos < 4) {
        pos++;

        if (pos == 4) {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        } else {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        }
    }
}
function anterior() {
    let imagenes = document.getElementById("container-puntuados");
    if (pos > 0) {
        pos--;
        imagenes.style.transform = `translateX(-${pos * 14}vw)`;
    }
}

let posi = 0;

function sig() {
    let imag = document.getElementById("container-likeados");

    if (posi < 4) {
        posi++;

        if (posi == 4) {
            imag.style.transform = `translateX(-${posi * 14}vw)`;
        } else {
            imag.style.transform = `translateX(-${posi * 14}vw)`;
        }
    }
}
function ant() {
    let imag = document.getElementById("container-likeados");
    if (posi > 0) {
        posi--;
        imag.style.transform = `translateX(-${posi * 14}vw)`;
    }
}

//Hasta aca es el coso del carrusel, YTSMA empiezo con la dinamización (ya adopte el nuevo sistema :) )

function irAFicha(google_id) {
    window.location.href = `../ficha_libro_nologueado/ficha_libro_nologueado.html?google_id=${google_id}`
}

let puntuados = []

async function buscarPuntuados() {
    let containerPuntuados = document.getElementById("container-puntuados");
    let endpoint = `${BASE_URL}/api/libros/puntuados`;
    let respuesta;
    try {
        respuesta = await fetch(endpoint);
    } catch (error) {
        console.log("Error al obtener los libros puntuados", error);
        containerPuntuados.textContent = 'Hubo un error al cargar los mejores puntuados';
        return;
    }
    if (respuesta.ok) {
        puntuados = (await respuesta.json()).libros;
        console.log(puntuados);
        await mostrarPuntuados();
    } else if (respuesta.status === 404) {
        containerPuntuados.textContent = 'Hubo un error al cargar los mejores puntuados';
    } else {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
}

async function mostrarPuntuados() {
    let containerPuntuados = document.getElementById("container-puntuados");
    containerPuntuados.innerHTML = '';
    for (let puntuado of puntuados.slice(0, 10)) {
        containerPuntuados.innerHTML += `
        <img class="imag" src="${puntuado.portada}" alt="${puntuado.titulo}" onclick="irAFicha('${puntuado.google_id}')">
        `
    }
}

let likeados = []

async function buscarLikeados() {
    let endpoint = `${BASE_URL}/api/libros/likes`;
    let respuesta = await fetch(endpoint);
    if (respuesta.ok) {
        likeados = (await respuesta.json()).libros;
        console.log(likeados);
    } else if (respuesta.status !== 404) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    await mostrarLikeados();
}

async function mostrarLikeados() {
    let containerLikeados = document.getElementById("container-likeados");
    containerLikeados.innerHTML = '';
    for (let likeado of likeados.slice(0, 10)) {
        containerLikeados.innerHTML += `
        <img class="imag" src="${likeado.portada}" alt="${likeado.title}" onclick="irAFicha('${likeado.google_id}')">
        `
    }
}

//carga de todo + gif

let cargador = document.getElementById('cargadorCon');

async function cargarTodo() {
    try {
        await Promise.all([buscarPuntuados(), buscarLikeados()]);
    } catch (error) {
        console.error("Error cargando el dashboard", error);
    }
    cargador.classList.add('hidden');
}
cargarTodo();


//BUSQUEDA DE CATEGORIAS

const fromCategorias = document.getElementById("categorias");

fromCategorias.addEventListener("click", (e) => {
    const boton = e.target.closest("button");
    if (!boton) return;
    e.preventDefault();
    localStorage.setItem("categoria_value", boton.value);
    localStorage.setItem("categoria", boton.textContent);
    window.location.href = "../categoria_sinlog/categoria_sinlog.html";
});

