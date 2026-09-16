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

    let endpoint = '/api/libros'; //ES UN EJEMPLO ACA VA LO DE GAUDIO

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

        divs.innerHTML=`
        <img><img>
        <h3><h3>



        `
    } //aca voy a poner los endpoints que me da gaudio (NO ME LO DA PORQUE NO SE NO LE SALE)
}


/*
GAUDIO:
COMO TIENE QUE FUNCIONAR:
1. CONSIGUE LA BUSQUEDA DEL USUARIO MEDIANTE UN ADDEVENTLISTENER 'ENTER' QUE PONEN EN LA LUPA DE BUSQUEDAS
2. HACE UN FETCH DE ESE TITULO A LA API QUE ESTA EN EL README QUE GAUDIS PASO. EL UNICO PARAMETRO ES EL TITULO DEL LIBRO
3. DEVOLVER DATOS AL USUARIO

*/