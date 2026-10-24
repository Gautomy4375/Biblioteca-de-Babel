let tituloPaginaAnterior = new URLSearchParams(window.location.search);
let titu = tituloPaginaAnterior.get('q');

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista');


if (titu){

    if (conTi){
        conTi.textContent = `"${titu}"`;

            buscarlistas(titu);

    }
}
else{
    conLi.textContent = `Por favor, escribí un término en el buscador`;
}

async function buscarlistas(palabra) {

    let endpoint = `${BASE_URL}/api/listas/buscar/${encodeURIComponent(palabra)}`;

    let respuesta = await fetch(endpoint);

    if (respuesta.ok){
        let listas = await respuesta.json();
        console.log("Datos recibidos del backend:", listas);

        mostrarlistas(listas.listas);
    }
    else if (respuesta.status === 404){
        conLi.textContent = 'No se encontraron listas'
    }
    else{
        conLi.textContent = 'Hubo un error'

    }
}

function mostrarlistas(listas){

    conLi.innerHTML = '';

    listas.forEach(lista =>{
        let divs = document.createElement('a');
        divs.href= `../ficha_lista_nologueado/ficha_lista_nologueado.html?id=${lista.id_lista}`
        divs.classList.add('boton_libro');

        divs.innerHTML = `
        <h3 class="nomLibro" >${lista.nombre}</h3>
         `;

        conLi.appendChild(divs);
    })
}
