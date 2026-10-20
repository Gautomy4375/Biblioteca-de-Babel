let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

let nombredesdepaginaanterior = new URLSearchParams(window.location.search);
let id = nombredesdepaginaanterior.get('id');

async function datosPerfil(id){
    let endpoint = `http://localhost:3000/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('HUBO UN ERROR :(');
    }

    return datos;

}
async function traerSeguidores(id){
    let endpoint = `http://localhost:3000/api/usuarios/${id}/seguidores`
    let respuesta = await fetch(endpoint);
    let datosSeguidores = null;

    if (respuesta.ok){
        datosSeguidores = await respuesta.json();
    }
    else{
        console.log('hubo un error');

    }
    return datosSeguidores
}
async function traerSeguidos(id){
    let endpoint = `http://localhost:3000/api/usuarios/${id}/seguidos`;
    let respuesta = await fetch(endpoint);
    let datosSeguidos= null;

    if(respuesta.ok){
        datosSeguidos = await respuesta.json();
    }
    else{
        console.log('hubo un error')
    }
    return datosSeguidos

}
async function traerListas(idDueño, idSolicitante){
    let endpoint = `http://localhost:3000/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    let respuesta = await fetch(endpoint);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datosListas;
}
function mostrarListas(listas){
    let calis = document.querySelectorAll('.cali');

    for(let i = 0; i < calis.length && i < listas.length; i++){
        calis[i].querySelector('.nombre').textContent = listas[i].nombre;
        calis[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${listas[i].id_lista}`;
        });

        let portadas = calis[i].querySelectorAll('.librito');
        for(let j = 0; j < portadas.length && j < listas[i].libros.length; j++){
            portadas[j].src = listas[i].libros[j].libro.portada;
        }
    }
}

async function cargarDatos(){
    let objeto = await datosPerfil(id);
    let todoSeguidores = await traerSeguidores(id);
    let todoSeguidos = await traerSeguidos(id);
    console.log(objeto, todoSeguidores, todoSeguidos);

    let foto_perfil = document.getElementById('foto_perfil');
    foto_perfil.src = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png';

    let nombre = document.getElementById('nom');
    nombre.textContent = objeto.username;

    let seguidores = document.getElementById('seguidores');
    seguidores.textContent = todoSeguidores.cantidad;
    let seguidos = document.getElementById('seguidos');
    seguidos.textContent = todoSeguidos.cantidad;
    let leidos = document.getElementById('leidos');
    leidos.textContent = '27';
    let listas = document.getElementById('listas');
    let todoListas = await traerListas(id, localStorage.getItem('userId'));
    if(todoListas){
        listas.textContent = todoListas.listas.length;
        mostrarListas(todoListas.listas);
    }
    else{
        listas.textContent = '0';
    }


}
cargarDatos();