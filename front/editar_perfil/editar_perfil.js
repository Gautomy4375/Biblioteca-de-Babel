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
    let datosNuevos = null;
    
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
    else{
      console.log('hubo un error');
     }
      return datosNuevos
     }





formTodo.addEventListener('submit', function(e){
    e.preventDefault(); 

    cambiarNombreAvatar(inputUsuario.value, inputFoto.value);

    console.log(inputUsuario.value);

    alert('Datos actualizados con éxito. Los cambios deberían reflejarse en tu perfil');


})



