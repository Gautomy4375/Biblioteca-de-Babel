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
    const endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let datosNuevos = '';
    
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEditar)
    });

    if(respuesta.ok){
       console.log('actualizado');
       datosNuevos = true;
     }
    else if(respuesta.status !== 400 && respuesta.status !== 409){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
      return datosNuevos
     }





formTodo.addEventListener('submit', function(e){
    e.preventDefault(); 

    cambiarNombreAvatar(inputUsuario.value, inputFoto.value);

    console.log(inputUsuario.value);

    alert('Datos actualizados con éxito. Los cambios deberían reflejarse en tu perfil');


})

async function matarCuenta(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`

    let respuesta = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })

    let datos = '';
    if(respuesta.ok){
        datos = true;
    }
    else{
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return datos;
}

let eliminarCuenta = document.getElementById('eliminarCuenta');

eliminarCuenta.addEventListener('click', async function(e){
    e.preventDefault();

    const userChoice = confirm("⚠ ALERTA ⚠ Vas a borrar tu cuenta, no la podrás recuperar, ¿Estás seguro de que querés borrarla?");

    if (userChoice) {
        eliminarCuenta.disabled = true;
        let cuentaBorrada = await matarCuenta(id);
        if(cuentaBorrada){
            localStorage.removeItem('userId');
            localStorage.removeItem('usernameSession');
            window.location.href= '../home/home.html'
        }
        else{
            eliminarCuenta.disabled = false;
        }
        } else {
    }
})



