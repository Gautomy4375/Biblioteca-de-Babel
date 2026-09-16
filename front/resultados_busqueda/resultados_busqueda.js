let titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let titu = titleDesdePaginaanterior.get('q');

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista')
if (titu){

    if (conTi){
        conTi.textContent = `Resultados de búsqueda para: "${titu}"`;

        buscarLibros(titu);
    }
}
else{
    conLi.textContent = `Por favor, escribir un título en la barra de búsqueda`
}

async function buscarLibros(palabra) {
    
}


/*
GAUDIO:
COMO TIENE QUE FUNCIONAR:
1. CONSIGUE LA BUSQUEDA DEL USUARIO MEDIANTE UN ADDEVENTLISTENER 'ENTER' QUE PONEN EN LA LUPA DE BUSQUEDAS
2. HACE UN FETCH DE ESE TITULO A LA API QUE ESTA EN EL README QUE GAUDIS PASO. EL UNICO PARAMETRO ES EL TITULO DEL LIBRO
3. DEVOLVER DATOS AL USUARIO

*/