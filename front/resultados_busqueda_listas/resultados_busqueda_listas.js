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
        window.location.href='../pagina_error_log/pagina_error.html';
    }
}
 async function datosLibro(nombre){

    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${encodeURIComponent(nombre)}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    

    return datos;
}
async function datosPerfil(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    

    return datos;

}

async function traerLeidos(id){
    let endpoint = `${BASE_URL}/api/libros/${id}/leidos`;

    let respuesta = await fetch(endpoint);
    let libros = { libros: [] }; 

    if(respuesta.ok){
        libros = await respuesta.json();
    }
    else if(respuesta.status !== 404){
        window.location.href='../pagina_error_log/pagina_error.html';
    }
    console.log(libros);
    return libros
}

async function mostrarlistas(listas){

    //conLi.innerHTML = '';

    for(let i = 0; i < listas.length; i++){
        console.log('primer ciclo')
        let nombre = listas[i].nombre;
        let datosPer = await datosPerfil(listas[i].id_usuario);
        let autor = datosPer?.username || "Usuario";
        let libros = listas[i].libros;
        let id_lista = listas[i].id_lista
        let arrayPortadas = [];

        for(let j = 0; j < libros.length; j++ ){
            console.log('segundo ciclio')
            let ob = await datosLibro(libros[j].google_id);
            let portada = ob?.portada || ''; 
            arrayPortadas.push(portada);
        }
        let divs = document.createElement('a');
        divs.href= `../ficha_lista_logueado/ficha_lista_logueado.html?id=${id_lista}`
        divs.classList.add('cali');

        divs.innerHTML = `
        <div class="minilista">
                <img class="librito uno" src="${arrayPortadas[0] || ''}">
                <img class="librito dos" src="${arrayPortadas[1] || ''}">
                <img class="librito tres" src="${arrayPortadas[2] || ''}">
                <img class="librito cuatro" src="${arrayPortadas[3] || ''}">
                <img class="librito cinco" src="${arrayPortadas[4] || ''}">
                <img class="librito seis" src="${arrayPortadas[5] || ''}">
            </div>
            <article class="nombre">${nombre}</article>
            <p class="autor">${autor}</p>
         `;

        document.getElementById('lista').appendChild(divs); 
        
        
    }
}
