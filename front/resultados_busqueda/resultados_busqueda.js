let titu = document.getElementById('palabra-buscada');
let contenedorLibros = document.getElementById('lista');
let paramUrl = new URLSearchParams(window.location.search);
let buscado = paramUrl.get('q');

if (buscado){
    titu.textContent = `"${buscado}"`;

    pedirLibros(buscado);
}
else {
    titu.textContent = "Búsqueda vacía";
    if (contenedorLibros) {
        contenedorLibros.textContent = "Por favor, escribí un término en el buscador.";
    } 
}


async function pedirLibros(palabra) {
    
}