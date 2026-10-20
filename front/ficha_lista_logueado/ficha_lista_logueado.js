let parametros = new URLSearchParams(window.location.search);
let idLista = parametros.get('id');
let idUsuario = localStorage.getItem('userId');

const librosGrid = document.getElementById('libros-grid');
const plantilla = document.getElementById('libro-template');
let corazon = document.getElementById('heart-btn');
let nroLikes = document.getElementById('nrodelikes');

async function traerLista(idLista, idUsuario){
    let endpoint = `http://localhost:3000/api/listas/${idLista}?id_usuario=${idUsuario}`;
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
    let endpoint = `http://localhost:3000/api/usuarios/${id}`;
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

async function cargarLista(){
    let lista = await traerLista(idLista, idUsuario);

    if(!lista){
        document.getElementById('list-name').textContent = 'Hubo un error';
        return;
    }

    document.getElementById('list-name').textContent = lista.nombre;
    document.getElementById('descripcion').textContent = lista.descripcion;

    let autor = await traerAutor(lista.id_usuario);
    if(autor){
        document.getElementById('author-name').textContent = autor.username;
    }

    nroLikes.textContent = lista.likes.length;
    corazon.checked = lista.likes.includes(Number(idUsuario));

    lista.libros.forEach((item) => {
        const clon = plantilla.content.cloneNode(true);
        clon.querySelector('img').src = item.libro.portada;
        clon.querySelector('p').textContent = item.libro.title;
        librosGrid.appendChild(clon);
    });
}
cargarLista();

corazon.addEventListener('change', async function(){
    let endpoint = `http://localhost:3000/api/listas/${idLista}/like`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario) })
    });

    if(respuesta.ok){
        let lista = await traerLista(idLista, idUsuario);
        nroLikes.textContent = lista.likes.length;
    }
    else{
        console.log('hubo un error');
    }
});
