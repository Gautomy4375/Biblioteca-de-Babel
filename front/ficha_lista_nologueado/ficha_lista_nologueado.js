let parametros = new URLSearchParams(window.location.search);
let idLista = parametros.get('id');

const librosGrid = document.getElementById('libros-grid');
const plantilla = document.getElementById('libro-template');

document.getElementById('heart-btn').addEventListener('click', function(e){
    e.preventDefault();
    opensignup();
});

async function traerLista(idLista){
    let endpoint = `${BASE_URL}/api/listas/${idLista}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datos;
}
async function traerAutor(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datos;
}

let cargador = document.getElementById('cargadorCon');

async function cargarLista(){
    let lista = await traerLista(idLista);

    if(!lista){
        document.getElementById('list-name').textContent = 'Hubo un error';
        cargador.classList.add('hidden');
        return;
    }

    document.getElementById('list-name').textContent = lista.nombre;
    document.getElementById('descripcion').textContent = lista.descripcion;

    let autor = await traerAutor(lista.id_usuario);
    if(autor){
        document.getElementById('author-name').textContent = autor.username;
    }

    document.getElementById('nrodelikes').textContent = lista.likes.length;

    lista.libros.forEach((item) => {
        const clon = plantilla.content.cloneNode(true);
        clon.querySelector('img').src = item.libro.portada;
        clon.querySelector('p').textContent = item.libro.title;
        librosGrid.appendChild(clon);
    });

    cargador.classList.add('hidden');
}
cargarLista();
