
let contenedor = document.getElementById('leidos');
let id = localStorage.getItem('userId');

if(id){
    traerLeidos(id);
}

async function traerLeidos(id){
    let endpoint = `http://localhost:3000/api/usuarios/${id}`;

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

async function mostrarLibros(libros){
    conLi.innerHTML = '';

    libros.forEach(libro =>{
        let divs = document.createElement('a');
        divs.href= `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${encodeURIComponent(libro.google_id)}`
        divs.classList.add('boton_libro');
        let port = libro.portada

        

        divs.innerHTML = `
        <img src="${port}" alt="${libro.title}" />
        <h3 class="nomLibro" >${libro.title}</h3>
         `;

         conLi.appendChild(divs);
    })
}