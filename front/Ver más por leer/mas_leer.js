
                          

let contenedor = document.getElementById('pleer');
let nombredesdepaginaanterior = new URLSearchParams(window.location.search);
let id = nombredesdepaginaanterior.get('q');

console.log(id);

if(id){
    traerPorLeer(id);
}

async function traerPorLeer(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}/progreso`;

    let respuesta = await fetch(endpoint);
    let porLeer = []; 

    if(respuesta.ok){
        let progreso = (await respuesta.json()).progreso;
        

        for(let item of progreso) {
            if (item.estado_libro === 'no_empezado') {
               porLeer.push(item.google_id);
            }
        }
        console.log(porLeer);
        mostrarLibros(porLeer);
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    return porLeer;
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
            <img class='imagen' src="${libro.portada}" alt="${libro.title}">
            <h3 class="titulo">${libro.title}</h3>
        `;  


        contenedor.appendChild(card);


    }

    
}