let titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let nombre = titleDesdePaginaanterior.get('google_id');
console.log(nombre);




function openreview () {
    reviewOverlay.classList.remove('hidden');
}

reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });


    

    async function datosLibro(nombre){

        let endpoint = `http://localhost:3000/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
        let respuesta = await fetch(endpoint);
        let datos = null;
    
        if(respuesta.ok){
            datos = await respuesta.json();
        }
        else{
            console.log('hubo un error');
            
        }
    
        return datos;
    }

async function cargarDatos(){
    let ob = await datosLibro(nombre);
    console.log(ob.volumeInfo);

    if(!ob){
        console.log('no se pudieron cargar los datos');
        return;
    }
    

    let titulo = document.getElementById('titulo');
    titulo.textContent = ob.volumeInfo.title;
        
    let tapa = document.getElementById('tapa')
    tapa.src = ob.portada;

    
    tapa.src = ob.portada || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/3840px-Default_pfp.svg.png';
    
    let autor = document.getElementById('autor');
    autor.textContent = ob.authors;
    
    let descripcion = document.getElementById('desc');
    descripcion.textContent = ob.description;
    
    let idioma = document.getElementById('idioma');
    idioma.textContent = ob.idioma;
    
    let año = document.querySelectorAll('.anio');
    año.forEach(element => {
        element.textContent = '1957'; 
        });
    
    let genero = document.getElementById('genero');
    genero.textContent = ob.categorias;
    
    let hojas = document.getElementById('hojas');
    hojas.textContent = ob.cantidad_paginas;
    
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
    
}

cargarDatos();