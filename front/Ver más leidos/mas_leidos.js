
                          

let contenedor = document.getElementById('leidos');
let nombredesdepaginaanterior = new URLSearchParams(window.location.search);
let id = nombredesdepaginaanterior.get('q');

console.log(id);

if(id){
    traerLeidos(id);
}

async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = ''

    if(respuesta.ok){
        libros = await respuesta.json();
        mostrarLibros(libros.libros);
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    console.log(libros);
    return libros
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

async function mostrarLibros(libros){
    contenedor.innerHTML = '';

    for (let i = 0; i < libros.length; i++) {
        let libro = await datosLibro(libros[i]);
        let card = document.createElement('a');
        card.classList.add('libro');
        card.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${encodeURIComponent(libro.google_id)}`;

        card.innerHTML = `
            <img src="${libro.portada}" alt="${libro.title}">
            <h3 class="titulo">${libro.title}</h3>
            <p class="autor">${libro.authors}</p>
        `;  


        contenedor.appendChild(card);


    }

    
}