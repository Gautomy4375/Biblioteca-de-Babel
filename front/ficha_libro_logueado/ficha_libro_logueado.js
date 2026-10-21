const titleDesdePaginaanterior = new URLSearchParams(window.location.search);
let nombre = titleDesdePaginaanterior.get('google_id');
console.log(nombre);

let reviewOverlay = document.getElementById('reviewOverlay')




function openreview () {
    reviewOverlay.classList.remove('hidden');
}

reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });


    

    async function datosLibro(nombre){

        let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
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

    console.log(ob.title);
    

    let titulo = document.getElementById('titulo');
    titulo.textContent = ob.title;

    let tituloRes = document.getElementById('titulo_reseña');
    tituloRes.textContent = ob.title
        
    let tapa = document.getElementById('tapa')

    tapa.src =  ob.portada;
    
    let autor = document.getElementById('autor');
    autor.textContent = ob.authors;
    
    let descripcion = document.getElementById('desc');
    descripcion.innerHTML = ob.description;
    
    let idioma = document.getElementById('idioma');
    idioma.textContent = ob.idioma;
    
    let año = document.querySelectorAll('.anio');
    año.forEach(element => {
        element.textContent = ob.publishedDate; 
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

let puntuacion = null; 

let unaEstrella = document.getElementById('star1')
let dosEstrellas = document.getElementById('star2');
let tresEstrellas = document.getElementById('star3');
let cuatroEstrellas = document.getElementById('star4');
let cincoEstrellas = document.getElementById('star5');

let botonLeido = document.getElementById('botonLeido');
let botonPor = document.getElementById('botonPor');
let botonLey = document.getElementById('botonLeyendo');
let idUsuario = localStorage.getItem('userId');

unaEstrella.addEventListener('click', function(e){
    e.preventDefault();

    puntuacion = unaEstrella.value;
    console.log(puntuacion);
})
dosEstrellas.addEventListener('click', function(e){
    e.preventDefault();

    puntuacion = dosEstrellas.value;
})
tresEstrellas.addEventListener('click', function(e){
    e.preventDefault();

    puntuacion = tresEstrellas.value;
})
cuatroEstrellas.addEventListener('click', function(e){
    e.preventDefault();

    puntuacion = cuatroEstrellas.value;
})
cincoEstrellas.addEventListener('click', function(e){
    e.preventDefault();

    puntuacion = cincoEstrellas.value;
})

let estado = null;

async function crearEstado(){
    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/libros/progreso?google_id=${encodeURIComponent(nombre)}`;

    let data = {
        estado_libro: estado,
        id_usuario: idUsuario,
        puntuacion:puntuacion,
        
    }

    let respuesta = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('hubo un error :(');
    }
    return datos;

}

botonLeido.addEventListener('click', async function(e){
    e.preventDefault();

    estado = 'leido';
    let resultado = crearEstado();
    if(resultado){
        alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
    }
    else{
        console.log('hubo otro error');
    }
})

botonPor.addEventListener('click', function(e){
    e.preventDefault();

    estado = 'porleer';
    crearEstado();
    alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
})

botonLey.addEventListener('click', function(e){
    e.preventDefault();

    estado = 'leyendo';
    crearEstado();
    alert(`Guardaste este libro como ${estado}, y le diste ${puntuacion} estrella/s`);
})






let selectLista = document.getElementById('selectLista');
let botonLista = document.getElementById('botonLista');

async function traerMisListas(){
    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/usuarios/${idUsuario}/${idUsuario}/listas`;
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

async function cargarMisListas(){
    let datos = await traerMisListas();

    if(!datos){
        return;
    }

    datos.listas.forEach(lista => {
        let opcion = document.createElement('option');
        opcion.value = lista.id_lista;
        opcion.textContent = lista.nombre;
        selectLista.appendChild(opcion);
    });
}
cargarMisListas();

botonLista.addEventListener('click', async function(e){
    e.preventDefault();

    if(!selectLista.value){
        alert('Primero tenés que crear una lista');
        return;
    }

    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/listas/${selectLista.value}/libros`;
    let respuesta = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: Number(idUsuario), google_id: nombre })
    });

    if(respuesta.ok){
        alert('Agregaste este libro a la lista');
    }
    else if(respuesta.status === 409){
        alert('Este libro ya está en la lista');
    }
    else{
        console.log('hubo un error');
    }
})
