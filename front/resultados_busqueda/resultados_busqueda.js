let titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let titu = titleDesdePaginaanterior.get('titulo');

console.log('el titulo es '+ titu)

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista')
if (titu){

    if (conTi){
        conTi.textContent = `"${titu}"`;

            buscarLibros(titu);
             
    }
}
else{
    conLi.textContent = `Por favor, escribí un término en el buscador`;
}

async function buscarLibros(palabra) {

    let endpoint = `http://localhost:3000/api/libros?titulo=${encodeURIComponent(palabra)}`;

    let respuesta = await fetch(endpoint);

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
        divs.href= `../ficha_libro_logueado/ficha_libro_logueado.html?titulo=${encodeURIComponent(libro.title)}`
        divs.classList.add('boton_libro');
        let port = libro.portada

        

        divs.innerHTML = `
        <img src="${port}" alt="${libro.title}" />
        <h3>${libro.title}</h3>
         `;

         conLi.appendChild(divs);
    })
}

let buscarLista = document.getElementById('listas');

buscarLista.addEventListener('click', function(event){
    event.preventDefault();

    let titul = titu;

    if(titul){
        window.location.href = `../resultados_busqueda_listas/resultados_busqueda_listas.html?q=${encodeURIComponent(titul)}`
    }

})