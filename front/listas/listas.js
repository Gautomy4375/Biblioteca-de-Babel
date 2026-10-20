let nombresLista = document.querySelectorAll('.al_1');

let uno = nombresLista[0];
let dos = nombresLista[1];
let tres = nombresLista[2];
let cuatro = nombresLista[3];

uno.textContent = 'Nombre';
dos.textContent = 'Nombre';
tres.textContent = 'Nombre';
cuatro.textContent = 'Nombre';

let autoresLista = document.querySelectorAll('.al_2');

let one = autoresLista[0];
let two = autoresLista[1];
let three = autoresLista[2];
let four = autoresLista[3];

one.textContent = 'Nombre del autor';
two.textContent = 'Nombre del autor';
three.textContent = 'Nombre del autor';
four.textContent = 'Nombre del autor';


let im = document.querySelectorAll('.libro');

im[0].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[1].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[2].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[3].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[4].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[5].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[6].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[7].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[8].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[9].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[10].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[11].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[12].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[13].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[14].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[15].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[16].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[17].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[18].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[19].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[20].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[21].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[22].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';
im[23].src = 'https://images.cdn1.buscalibre.com/fit-in/360x360/c6/78/c678ab2c90ed50d7d8849e30bc92b05a.jpg';




let id = localStorage.getItem('userId');

async function traerListas(idDueño, idSolicitante){
    let endpoint = `http://localhost:3000/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    let respuesta = await fetch(endpoint);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datosListas;
}

async function cargarMisListas(){
    let datosListas = await traerListas(id, id);

    if(!datosListas){
        return;
    }

    let misListas = document.querySelectorAll('.mis_li');

    for(let i = 0; i < misListas.length && i < datosListas.listas.length; i++){
        let lista = datosListas.listas[i];

        misListas[i].querySelector('.aml_1').textContent = lista.nombre;
        misListas[i].querySelector('.aml_2').textContent = localStorage.getItem('usernameSession');
        misListas[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${lista.id_lista}`;
        });

        let portadas = misListas[i].querySelectorAll('.mlibro');
        for(let j = 0; j < portadas.length && j < lista.libros.length; j++){
            portadas[j].src = lista.libros[j].libro.portada;
        }
    }
}
cargarMisListas();

async function traerMasLikeadas(){
    let endpoint = `http://localhost:3000/api/listas/likes`;
    let respuesta = await fetch(endpoint);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
    }
    else{
        console.log('hubo un error');
    }
    return datosListas;
}
async function traerAutor(id){
    let endpoint = `http://localhost:3000/api/usuarios/${id}`;
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

async function cargarMasLikeadas(){
    let datosListas = await traerMasLikeadas();

    if(!datosListas){
        return;
    }

    let medios = document.querySelectorAll('.medios');

    for(let i = 0; i < medios.length && i < datosListas.listas.length; i++){
        let lista = datosListas.listas[i];

        medios[i].querySelector('.nom_res').textContent = lista.nombre;
        medios[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${lista.id_lista}`;
        });

        let autor = await traerAutor(lista.id_usuario);
        if(autor){
            medios[i].querySelector('.aut_res').textContent = autor.username;
        }

        let portadas = medios[i].querySelectorAll('.lib');
        for(let j = 0; j < portadas.length && j < lista.libros.length; j++){
            portadas[j].src = lista.libros[j].libro.portada;
        }
    }
}
cargarMasLikeadas();
