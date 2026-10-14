let inputUsuario = document.getElementById('username');
let inputFoto = document.getElementById('avatar');
let formTodo = document.getElementById('avUs');
let id = localStorage.getItem('userId');




async function cambiarNombreAvatar(usuario, foto){

    let datosEditar = {};
    if(usuario){
        datosEditar.username = usuario;
    }
    if(foto){
        datosEditar.avatar = foto;
    }

    const endpoint = `http://localhost:3000/usuarios/${id}`;
    let datosNuevos = null;

    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEditar)
    });

    if(respuesta.ok){
        datosNuevos = await respuesta.json();

    }
    else{
        console.log('hubo un error');
    }
    return datosNuevos
}





formTodo.addEventListener('submit', function(e){
    e.preventDefault(); 

    cambiarNombreAvatar(inputUsuario.value, inputFoto.files[0].name);

    console.log(inputUsuario.value)


})



