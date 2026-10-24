
let contenedor = document.getElementById('leidos');
let id = localStorage.getItem('userId');

console.log(id);

if(id){
    traerLeidos(id);
}

async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

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

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
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

    for (let i = 0; i < libros.length; i++) {
        let libro = await datosLibro(libros[i]);
        let card = document.createElement('a');
        card.classList.add('libro');
        card.href = `detalle.html?id=${libro.id}`;

        card.innerHTML = `
            <img src="${libro.portada}" alt="${libro.title}">
            <h3 class="titulo">${libro.title}</h3>
            <p class="autor">${libro.authors}</p>
        `;  


        contenedor.appendChild(card);


    }

    
}