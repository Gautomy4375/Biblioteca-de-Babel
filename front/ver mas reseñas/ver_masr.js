


let id = localStorage.getItem('userId');

async function traerResenias(id){

    let endpoint = `${BASE_URL}/api/usuarios/${id}/resenias`;
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
async function datosLibro(nombre){

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
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

async function cargarDatos(){
let reseniasUsuarioObjeto = await traerResenias(id);
    let res = reseniasUsuarioObjeto.reseñas || []
    let cont = document.getElementById('todo');
    console.log(res);

    cont.innerHTML = '';

    for (let i = 0; i < res.length; i++){

        let ob = await datosLibro(res[i].google_id);
        cont.innerHTML += `
         <section class="res">
            <img src='${ob.portada}' class="imagen" onclick="irAFicha('${res[i].google_id}')"></img>
            <div class="ladoim">
                <article class="til">${ob.title}</article>
                <article class="datos"></article>
                <article class="des" >${res[i].contenido}</article>
            </div>
        </section>
        `
    }
};
cargarDatos();

function irAFicha(google_id) {
    window.location.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${google_id}`
}