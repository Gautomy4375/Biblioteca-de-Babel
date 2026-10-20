let formulario = document.querySelector('form');
let idUsuario = localStorage.getItem('userId');

async function crearLista(nombre, descripcion){
    let endpoint = `http://localhost:3000/api/listas`;
    let respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), nombre: nombre, descripcion: descripcion })
    });
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datos;
}
async function buscarLibro(titulo){
    let endpoint = `http://localhost:3000/api/libros?titulo=${encodeURIComponent(titulo)}`;
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
async function agregarLibro(idLista, google_id){
    let endpoint = `http://localhost:3000/api/listas/${idLista}/libros`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), google_id: google_id })
    });

    if(!respuesta.ok){
        console.log('hubo un error');
    }
}

formulario.addEventListener('submit', async function(event){
    event.preventDefault();

    let nombre = document.getElementById('nombre_lista').value.trim();
    let tituloLibro = document.getElementById('nuevo_libro').value.trim();
    let descripcion = document.getElementById('descripcion').value.trim();

    let lista = await crearLista(nombre, descripcion);

    if(!lista){
        return;
    }

    if(tituloLibro){
        let libros = await buscarLibro(tituloLibro);
        if(libros){
            await agregarLibro(lista.id_lista, libros.libros[0].google_id);
        }
    }

    window.location.href = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${lista.id_lista}`;
});
