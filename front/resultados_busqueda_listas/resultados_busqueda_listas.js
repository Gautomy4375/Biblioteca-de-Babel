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

    cargador.style.display = 'block';

    let endpoint = `http://localhost:3000/api/listas?titulo=${encodeURIComponent(palabra)}`;

    let respuesta = await fetch(endpoint);

    cargador.style.display = 'none';

    if (respuesta.ok){
        let listas = await respuesta.json();
        console.log("Datos recibidos del backend:", listas);

        if (listas.listas && listas.listas.length > 0){
            mostrarlistas(listas.listas);
            
        }
        else{
            conLi.textContent = 'No se encontraron listas'
        }
    }
    else{
        conLi.textContent = 'Hubo un error'
        
    }
}

function mostrarlistas(listas){
    
    conLi.innerHTML = '';

    listas.forEach(libro =>{
        let divs = document.createElement('a');
        divs.href= `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${encodeURIComponent(libro.google_id)}`
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

    let titul = libro.google_id;

    if(titul){
        window.location.href = `../resultados_busqueda_listas/resultados_busqueda_listas.html?q=${encodeURIComponent(titul)}`
    }

})