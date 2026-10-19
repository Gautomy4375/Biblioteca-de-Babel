
let contenedor = document.getElementById('leidos');
let id = localStorage.getItem('userId');

if(id){
    traerLeidos(id);
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

async function mostrarLibros(libros){
    contenedor.innerHTML = '';

    libros.forEach(libro, async function(e){ //esto lo tengo q cambiar por un for
        let datos = await datosLibro(libro);
        let divs = document.createElement('a');
        divs.href= `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${encodeURIComponent(libro.google_id)}`
        divs.classList.add('boton_libro');
        let port = datos.portada

        

        divs.innerHTML = `
        <img src="${port}" alt="${datos.title}" />
        <h3 class="nomLibro" >${datos.title}</h3>
         `;

         contenedor.appendChild(divs);
    })
}