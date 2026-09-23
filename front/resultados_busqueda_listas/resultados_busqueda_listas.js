let tituloPaginaAnterior = URLSearchParams(window.location.search);
let titu = tituloPaginaAnterior.get('q');

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista');

if(titu){

    conTi.textContent= `'${titu}'`;

    buscarListas(titu);
}

async function buscarlistas(titu){

    let endpoint = '/api'; //GAUDIO DAME LOS ENDPOINTSS

    let respuesta = await fetch(endpoint);

    if (respuesta.ok){
        let listas = await respuesta.json();

        if (listas.length > 0){
            mostrarListas(libros);
        }
        else{
            conLi.textContent = 'No se encontraron listas'
        }
    }
    else{
        conLi.textContent = 'Hubo un error'
    }
}

function mostrarListas(libros){
    conLi.innerHTML = '';

    let i = 0;

    if (i < listas.length){
        let divs = document.createElement('a');
        divs.classList.add('boton_lista');
        //acava el href de las listas


        divs.innerHTML=`
        <img src='${listas.portada}'><img>
        <h3>${listas.title}<h3>
        `
        i++
    } 
}