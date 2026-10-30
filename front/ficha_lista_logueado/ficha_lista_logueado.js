let parametros = new URLSearchParams(window.location.search);
let idLista = parametros.get('id');
let idUsuario = localStorage.getItem('userId');

const librosGrid = document.getElementById('libros-grid');
const plantilla = document.getElementById('libro-template');
let corazon = document.getElementById('heart-btn');
let nroLikes = document.getElementById('nrodelikes');

async function traerLista(idLista, idUsuario) {
    let endpoint = `${BASE_URL}/api/listas/${idLista}?id_usuario=${idUsuario}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if (respuesta.ok) {
        datos = await respuesta.json();
    }
    else {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}
async function traerAutor(id) {
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
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

let cargador = document.getElementById('cargadorCon');

async function cargarLista() {
    let lista = await traerLista(idLista, idUsuario);

    if (!lista) {
        return;
    }

    document.getElementById('list-name').textContent = lista.nombre;
    document.getElementById('descripcion').textContent = lista.descripcion;

    let autor = await traerAutor(lista.id_usuario);
    if (autor) {
        document.getElementById('author-name').textContent = autor.username;
    }

    nroLikes.textContent = lista.likes.length;
    corazon.checked = lista.likes.includes(Number(idUsuario));

    lista.libros.forEach((item) => {
        const clon = plantilla.content.cloneNode(true);
        clon.querySelector('img').src = item.libro.portada;
        clon.querySelector('img').onclick = function () {
            irAFicha(item.libro.google_id);
        }

        clon.querySelector('p').textContent = item.libro.title;
        librosGrid.appendChild(clon);
    });

    cargador.classList.add('hidden');
}
cargarLista();

corazon.addEventListener('change', async function () {
    let endpoint = `${BASE_URL}/api/listas/${idLista}/like`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario) })
    });

    if (respuesta.ok) {
        let lista = await traerLista(idLista, idUsuario);
        nroLikes.textContent = lista.likes.length;
    }
    else {
        window.location.href='../pagina_error_log/pagina_error.html';
    }
});

function irAFicha(google_id) {
    window.location.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${google_id}`
}

let btnBorrar = document.getElementById("deleteList")

btnBorrar.addEventListener('click', (e) => {
    e.preventDefault()
    btnBorrar.disabled = true
    borrarLista()


})

async function borrarLista() {
    let endpoint = `${BASE_URL}/api/listas/${idLista}`
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_usuario: idUsuario
        })
    });
    if (response.ok) {
        console.log("Pefeeeeeto")
        window.location.href = `../listas/listas.html`; 

    }
    else {
        btnBorrar.disabled = false
        if (response.status !== 403) {
            window.location.href='../pagina_error_log/pagina_error.html';
        }
    }

}

