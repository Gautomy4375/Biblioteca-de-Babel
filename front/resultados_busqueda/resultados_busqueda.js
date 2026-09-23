let titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let titu = titleDesdePaginaanterior.get('q');

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista')
if (titu){

    if (conTi){
        conTi.textContent = `"${titu}"`;

        buscarLibros(titu);
    }
}
else{
    conLi.textContent = `Por favor, escribir un título en la barra de búsqueda`
}

async function buscarLibros(palabra) {

    let endpoint = `/api/libros?titulo=${titu}`;

    let respuesta = await fetch(endpoint);

    if (respuesta.ok){
        let libros = await respuesta.json();

        if (libros.length > 0){
            mostrarLibros(libros);
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

    let i = 0;

    if (i < libros.length){
        let divs = document.createElement('a');
        divs.classList.add('boton_libro');
        divs.href= `../ficha_libro_logueado/ficha_libro_logueado.html?id=${libros.id}`

        divs.innerHTML=`
        <img src='${libros.portada}'><img>
        <h3>${libros.title}<h3>
        `
        i++
    } 
}

let buscarLista = document.getElementById('listas');

buscarLista.addEventListener('click', function(event){
    event.preventDefault();

    let titul = titu;

    if(titul){
        window.location.href = `../resultados_busqueda_listas/resultados_busqueda_listas.html?q=${encodeURIComponent(titul)}`
    }

})