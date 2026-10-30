let formulario = document.querySelector('form');
let idUsuario = localStorage.getItem('userId');
let libroDePaginaAnterior = new URLSearchParams(window.location.search).get('google_id');

let searchInput = document.getElementById('nuevo_libro');
let resultsList = document.getElementById('resultsList');
let tapasContainer = document.getElementById('tapasContainer');
let botonCrear = document.querySelector('.crear-lista-button');

let idsElegidos = [];
let librosElegidos = [];

async function crearLista(nombre, descripcion) {
    let endpoint = `${BASE_URL}/api/listas`;
    let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), nombre: nombre, descripcion: descripcion })
    });
    let datos = '';

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else if (respuesta.status !== 400) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}
async function agregarLibro(idLista, google_id) {
    let endpoint = `${BASE_URL}/api/listas/${idLista}/libros`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), google_id: google_id })
    });

    if (!respuesta.ok) {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return respuesta.ok;
}

function renderizarTapas() {
    tapasContainer.innerHTML = '';

    for (let i = 0; i < librosElegidos.length; i++) {
        let libro = librosElegidos[i];
        tapasContainer.innerHTML += `
        <div class="libro-container lora-font">
            <img src="${libro.portada}" alt="${libro.titulo}">
            <p class="lora-font">${libro.titulo}</p>
        </div>
        `;
    }
}

function mostrarResultadosDropdown(libros) {
    resultsList.innerHTML = '';

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        let titulo = 'Sin título';
        if (libro.title) {
            titulo = libro.title;
        }

        let autores = 'Autor desconocido';
        if (Array.isArray(libro.authors)) {
            autores = libro.authors.join(', ');
        }
        else if (libro.authors) {
            autores = libro.authors;
        }

        let portada = 'https://via.placeholder.com/32x45?text=Sin+Tapa';
        if (libro.portada) {
            portada = libro.portada;
        }
        if (portada.startsWith('http://')) {
            portada = portada.replace('http://', 'https://');
        }

        let item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <img class="title-photo" src="${portada}" alt="${titulo}">
            <div class="result-info">
                <span class="result-title">${titulo}</span>
                <span class="result-author">${autores}</span>
            </div>
        `;

        item.addEventListener('click', function () {
            if (idsElegidos.includes(libro.google_id)) {
                alert('Ya agregaste ese libro');
            }
            else {
                idsElegidos.push(libro.google_id);
                librosElegidos.push({ portada: portada, titulo: titulo });
                renderizarTapas();
            }

            // Limpiar buscador y cerrar menú
            searchInput.value = '';
            resultsList.style.display = 'none';
        });

        resultsList.appendChild(item);
    }

    resultsList.style.display = 'block';
}

searchInput.addEventListener('keydown', async function (event) {
    if (event.key !== 'Enter') {
        return;
    }
    event.preventDefault();

    let query = searchInput.value.trim();

    if (query.length < 2) {
        resultsList.style.display = 'none';
        resultsList.innerHTML = '';
        return;
    }

    resultsList.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; padding: 12px;">
            <img src="../loading_gif.gif" alt="Cargando..." style="height: 13.4vh; width: auto;">
        </div>
    `;
    resultsList.style.display = 'block';

    try {
        let endpoint = `${BASE_URL}/api/libros?titulo=${encodeURIComponent(query)}`;
        let respuesta = await fetch(endpoint);

        if (respuesta.ok) {
            let data = await respuesta.json();

            if (data.libros && data.libros.length > 0) {
                mostrarResultadosDropdown(data.libros);
            }
            else {
                resultsList.innerHTML = `<div style="padding: 10px; color: #666; font-size: 13px; text-align: center;">No se encontraron libros</div>`;
            }
        }
        else if (respuesta.status === 404) {
            resultsList.innerHTML = `<div style="padding: 10px; color: #666; font-size: 13px; text-align: center;">No existe un libro con este nombre, buscá otro</div>`;
        }
        else {
            window.location.href='../pagina_error_log/pagina_error.html';
        }
    }
    catch (error) {
        console.error('Error de conexión:', error);
        resultsList.innerHTML = `<div style="padding: 10px; color: #dc2626; font-size: 13px; text-align: center;">Error de conexión con el servidor</div>`;
    }
});

// Ocultar desplegable si se hace clic fuera
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !resultsList.contains(event.target)) {
        resultsList.style.display = 'none';
    }
});

formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    botonCrear.disabled = true;

    let nombre = document.getElementById('nombre_lista').value.trim();
    let descripcion = document.getElementById('descripcion').value.trim();

    let lista = await crearLista(nombre, descripcion);

    if (!lista) {
        botonCrear.disabled = false;
        return;
    }

    if (libroDePaginaAnterior) {
        let agregado = await agregarLibro(lista.id_lista, libroDePaginaAnterior);
        if (!agregado) {
            return;
        }
    }

    for (let i = 0; i < idsElegidos.length; i++) {
        let googleId = idsElegidos[i];
        // si es el mismo libro de la pagina anterior, ya se agrego
        if (googleId !== libroDePaginaAnterior) {
            let agregado = await agregarLibro(lista.id_lista, googleId);
            if (!agregado) {
                return;
            }
        }
    }

    window.location.replace(`../pantalla_carga_log/pantalla_carga_log.html?id=${lista.id_lista}`);
});
