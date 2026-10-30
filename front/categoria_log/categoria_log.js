const cargador = document.getElementById("cargadorCon");
const conLi = document.getElementById("lista");

const categoria = localStorage.getItem("categoria");
const categoria_value = localStorage.getItem("categoria_value");
const tituloElemento = document.getElementById("categoria-buscada");

if (categoria) {
    if (tituloElemento) {
        tituloElemento.innerText = "Categoria: " + categoria;
    } 
    
    buscarLibros(categoria);
} else {
    tituloElemento.innerText = "No elegiste ninguna categoría, podes encontrarlas en la pestaña de 'Libros'";
    console.log("No se seleccionó ninguna categoría.");
}

async function buscarLibros(categoriaSeleccionada) {
    if (cargador) cargador.style.display = 'block';

    let endpoint = `${BASE_URL}/api/categorias/${encodeURIComponent(categoria_value)}/libros`;

    try {
        let respuesta = await fetch(endpoint);
        if (cargador) cargador.style.display = 'none';

        if (respuesta.ok) {
            let datos = await respuesta.json();
            console.log("Datos recibidos del backend:", datos);

            let listaLibros = datos.libros || datos;

            if (listaLibros && listaLibros.length > 0) {
                mostrarLibros(listaLibros);
            }
        } else if (respuesta.status !== 404) {
            window.location.href='../pagina_error_log/pagina_error.html';
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        if (cargador) cargador.style.display = 'none';
    }
}


function mostrarLibros(librosAInterar) {
    if (conLi) conLi.innerHTML = '';

    librosAInterar.forEach(libro => {
        let divs = document.createElement('a');
        divs.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${encodeURIComponent(libro.google_id)}`;
        divs.classList.add('boton_libro');

        let port = libro.portada;

        divs.innerHTML = `
            <img src="${port}" alt="${libro.title}" />
            <h3 class="nomLibro">${libro.title}</h3>
        `;

        if (conLi) conLi.appendChild(divs);
    });
}
