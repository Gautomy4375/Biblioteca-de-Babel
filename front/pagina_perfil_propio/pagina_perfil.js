let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

let id = localStorage.getItem('userId');

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
async function traerLeidos(id){
    let endpoint = `http://localhost:3000/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = null

    if(respuesta.ok){
        libros = await respuesta.json();
        mostrarLibros(libros.libros);
    }
    else{
        console.log('hubo un eror')
    }
    console.log(libros);
    return libros
}
async function datosLibro(nombre){

    let endpoint = `http://localhost:3000/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
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


async function cargarDatos(){
    let objeto = await datosPerfil(id);
    let todoSeguidores = await traerSeguidores(id);
    let todoSeguidos = await traerSeguidos(id);
    
    console.log(objeto);

    let foto_perfil = document.getElementById('foto_perfil');
    foto_perfil.src = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png';

    let nombre = document.getElementById('nom');
    nombre.textContent = localStorage.getItem('usernameSession');

    let fecha = document.getElementById('fecha');
    fecha.textContent = `Usuario en Babel desde ${objeto.fecha_registro}`;

    

    let seguidores = document.getElementById('seguidores');
    seguidores.textContent = todoSeguidores.cantidad;
    let seguidos = document.getElementById('seguidos');
    seguidos.textContent = todoSeguidos.cantidad;
    let leidos = document.getElementById('leidos');
    leidos.textContent = '27';
    let listas = document.getElementById('listas');
    listas.textContent = '12';

    let idLeidos = await traerLeidos(id);

    

    

    
    

                 
}
cargarDatos();







function logout() {
    const userChoice = confirm("⚠ ALERTA ⚠ Vas a cerrar sesión, quieres continuar?");

    if (userChoice) {
        localStorage.removeItem('userId');
        localStorage.removeItem('usernameSession');
        window.location.replace("../home/home.html");
        } else {
    }

}


//TETSEO