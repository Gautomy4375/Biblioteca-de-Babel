let parametros = new URLSearchParams(window.location.search);
let idLista = parametros.get('id');

const librosGrid = document.getElementById('libros-grid');
const plantilla = document.getElementById('libro-template');
let corazon = document.getElementById('heart-btn');
let nroLikes = document.getElementById('nrodelikes');

async function traerLista(idLista){
    let endpoint = `${BASE_URL}/api/listas/${idLista}`;
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
async function traerAutor(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}

let cargador = document.getElementById('cargadorCon');

async function cargarLista(){
    let lista = await traerLista(idLista);

    if(!lista){
        return;
    }

    document.getElementById('list-name').textContent = lista.nombre;
    document.getElementById('descripcion').textContent = lista.descripcion;

    let autor = await traerAutor(lista.id_usuario);
    if(autor){
        document.getElementById('author-name').textContent = autor.username;
    }

    nroLikes.textContent = lista.likes.length;

    lista.libros.forEach((item) => {
        const clon = plantilla.content.cloneNode(true);
        clon.querySelector('img').src = item.libro.portada;
        clon.querySelector('img').onclick = function(){
            irAFicha(item.libro.google_id);
        }

        clon.querySelector('p').textContent = item.libro.title;
        librosGrid.appendChild(clon);
    });

    cargador.classList.add('hidden');
}
cargarLista();

// sin log no se puede dar like: abrimos el popup de sign up
corazon.addEventListener('click', function(e){
    e.preventDefault();
    opensignup();
});

function irAFicha(google_id) {
    window.location.href = `../ficha_libro_nologueado/ficha_libro_nologueado.html?google_id=${google_id}`
}
