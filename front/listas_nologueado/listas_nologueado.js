async function traerPopulares(){
    let endpoint = `${BASE_URL}/api/listas/likes`;
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
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
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

async function cargarPopulares(){
    let datosListas = await traerPopulares();

    if(!datosListas){
        return;
    }

    let grillaPopulares = document.getElementById('grilla-populares');

    let html = '';
    for(let lista of datosListas.listas){
        let nombreAutor = '';
        let autor = await traerAutor(lista.id_usuario);
        if(autor){
            nombreAutor = autor.username;
        }

        let link = `../ficha_lista_nologueado/ficha_lista_nologueado.html?id=${lista.id_lista}`;
        html = html + crearTarjeta(lista, nombreAutor, link);
    }
    grillaPopulares.innerHTML = html;
}

// arma el html de una tarjeta de lista (la misma para populares y mis listas)
// si autor viene vacio no se pone el nombre del autor
function crearTarjeta(lista, autor, link){
    let htmlAutor = '';
    if(autor){
        htmlAutor = `<div class="al_2">${autor}</div>`;
    }

    // las 5 tapas superpuestas
    let posiciones = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
    let htmlTapas = '';
    let numero = 0;
    for(let posicion of posiciones){
        if(numero < lista.libros.length){
            let portada = lista.libros[numero].libro.portada;
            htmlTapas = htmlTapas + `<img class="libro ${posicion}" src="${portada}">`;
        }
        else{
            // si la lista tiene menos de 5 libros queda la tapa gris
            htmlTapas = htmlTapas + `<img class="libro ${posicion}">`;
        }
        numero = numero + 1;
    }

    let html = `
        <article class="listas clickeable" onclick="window.location.href='${link}'">
            <div class="arriba_lista">
                <div class="al_1">${lista.nombre}</div>
                ${htmlAutor}
            </div>
            <div class="abajo_lista">
                <div class="listillas">
                    ${htmlTapas}
                </div>
            </div>
        </article>
    `;

    return html;
}

let cargador = document.getElementById('cargadorCon');

async function cargarTodo(){
    await cargarPopulares();
    cargador.classList.add('hidden');
}
cargarTodo();
