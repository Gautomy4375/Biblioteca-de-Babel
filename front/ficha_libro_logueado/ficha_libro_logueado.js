function openreview () {
    reviewOverlay.classList.remove('hidden');
}


async function traerDatosBack(titulo) {

    let endpoint = '/api/libros' /*YTSMA ES UN EJEMPLO PORQUE GAUDIO NO TRAE LOS ENDPOINTS*/

    let res = await fetch(endpoint);
    let libro = null;

    if (res.ok){
        libro = await res.json();
    }
    else{
        console.log('Hubo un error');
    }
    
}
reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });

let titulo = document.querySelectorAll('.book-title');
titulo.forEach(element => {
    element.textContent = 'El Principito'; 
    });
    
let tapa = document.getElementById('tapa')
tapa.src = libro.tapa ; //falta parametro de verdad que obtendremos del endpoint (lo mismo en todas las siguentes).

let autor = document.getElementById('autor');
autor.textContent = libro.autor;

let descripcion = document.getElementById('desc');
descripcion.textContent = libro.descripcion;

let idioma = document.getElementById('idioma');
idioma.textContent = libro.idioma;

let año = document.querySelectorAll('.anio');
año.forEach(element => {
    element.textContent = '1957'; 
    });

let genero = document.getElementById('genero');
genero.textContent = libro.genero;

let hojas = document.getElementById('hojas');
hojas.textContent = libro.cantidadhojas;

let promedio = document.getElementById('promedio');
promedio.textContent = '3.4';



let link1 = document.getElementById('link1');
link1.href = 'https://cuspide.com/';

let link2 = document.getElementById('link2');
link2.href = 'https://cuspide.com/';

let link3 = document.getElementById('link3');
link3.href = 'https://cuspide.com/';

let link4 = document.getElementById('link4');
link4.href = 'https://archive.org/';


let username1 = document.getElementById('username1');
username1.textContent = 'USERNAME1';
username1.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

let fotoperfil1 = document.getElementById('fotoperfil1')
fotoperfil1.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

let username2 = document.getElementById('username2');
username2.textContent = 'USERNAME2';
username2.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

let fotoperfil2 = document.getElementById('fotoperfil2')
fotoperfil2.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';

let username3 = document.getElementById('username3');
username3.textContent = 'USERNAME3';
username3.href = '../pagina_perfil_ajeno/pagina_perfil_ajeno.html'

let fotoperfil3 = document.getElementById('fotoperfil3')
fotoperfil3.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail';





































































































































    libro = 'harry potter y la odisea'
    ////async function(libro) {
    //    let descripcion = await fetch(`/api/libros/:${libro}`)
    //} 
    //let descicipon = descripcion.descripcion 