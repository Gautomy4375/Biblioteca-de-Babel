let titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let titu = titleDesdePaginaanterior.get('titulo');

console.log('el titulo es '+ titu)

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista')
let cargador = document.getElementById('cargadorCon')
if (titu){

    if (conTi){
        conTi.textContent = `"${titu}"`;

            buscarLibros(titu);
             
    }
}
else{
    conLi.textContent = `Por favor, escribí un término en el buscador`;
}

async function buscarLibros(titu) {

    cargador.style.display = 'block';

    let endpoint = `${BASE_URL}/api/libros?titulo=${(encodeURIComponent(titu))}`;

    let respuesta = await fetch(endpoint);

    cargador.style.display = 'none';

    if (respuesta.ok){
        let libros = await respuesta.json();
        console.log("Datos recibidos del backend:", libros);

        if (libros.libros && libros.libros.length > 0){
            mostrarLibros(libros.libros);
            
        }
        else{
            conLi.textContent = 'No se encontraron libros'
        }
    }
    else{
        conLi.textContent = 'Hubo un error'
        
    }
}

function mostrarLibros(libros){
    
    conLi.innerHTML = '';

    libros.forEach(libro =>{
        let divs = document.createElement('a');
        divs.href= `../ficha_libro_nologueado/ficha_libro_nologueado.html?google_id=${encodeURIComponent(libro.google_id)}`
        divs.classList.add('boton_libro');
        let port = libro.portada

        

        divs.innerHTML = `
        <img src="${port}" alt="${libro.title}" />
        <h3 class="nomLibro" >${libro.title}</h3>
         `;

         conLi.appendChild(divs);
    })
}

let buscarLista = document.getElementById('listas');

buscarLista.addEventListener('click', function(event){
    event.preventDefault();

    let titul = titu;

    if(titul){
        window.location.href = `../resultados_busqueda_listas_sinlog/resultados_busqueda_listas_sinlog.html?q=${encodeURIComponent(titul)}`
    }

})

let buscarUsuario = document.getElementById('usuarios');

buscarUsuario.addEventListener('click', function(event){
    event.preventDefault();

    let nombre = titu;

    if(titu){
        window.location.href = `../resultados_busqueda_usuario_sinlog/resultados_busqueda_usuario_sinlog.html?q=${encodeURIComponent(titu)}`
    }

})