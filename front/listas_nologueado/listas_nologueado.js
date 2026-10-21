async function traerMasLikeadas(){
    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/listas/likes`;
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
async function traerAutor(id){
    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/usuarios/${id}`;
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

async function cargarMasLikeadas(){
    let datosListas = await traerMasLikeadas();

    if(!datosListas){
        return;
    }

    let medios = document.querySelectorAll('.medios');

    for(let i = 0; i < medios.length && i < datosListas.listas.length; i++){
        let lista = datosListas.listas[i];

        medios[i].querySelector('.nom_res').textContent = lista.nombre;
        medios[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_nologueado/ficha_lista_nologueado.html?id=${lista.id_lista}`;
        });

        let autor = await traerAutor(lista.id_usuario);
        if(autor){
            medios[i].querySelector('.aut_res').textContent = autor.username;
        }

        let portadas = medios[i].querySelectorAll('.lib');
        for(let j = 0; j < portadas.length && j < lista.libros.length; j++){
            portadas[j].src = lista.libros[j].libro.portada;
        }
    }
}
cargarMasLikeadas();
