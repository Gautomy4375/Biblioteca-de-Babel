let id = localStorage.getItem('userId');

async function traerListas(idDueño, idSolicitante){
    let endpoint = `${BASE_URL}/api/usuarios/${idDueño}/${idSolicitante}/listas`;
    console.log('MIS LISTAS - id del usuario:', idDueño);
    console.log('MIS LISTAS - endpoint:', endpoint);
    let respuesta = await fetch(endpoint);
    console.log('MIS LISTAS - status:', respuesta.status);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
        console.log('MIS LISTAS - datos:', datosListas);
    }
    else{
        console.log('MIS LISTAS - hubo un error:', await respuesta.text());
    }
    return datosListas;
}

async function cargarMisListas(){
    let datosListas = await traerListas(id, id);

    if(!datosListas){
        return;
    }

    let grillaMias = document.getElementById('grilla-mias');

    let html = '';
    for(let lista of datosListas.listas){
        let link = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${lista.id_lista}`;
        html = html + crearTarjeta(lista, '', link);
    }
    grillaMias.innerHTML = html;
}

async function traerPopulares(){
    let endpoint = `${BASE_URL}/api/listas/likes`;
    console.log('POPULARES - endpoint:', endpoint);
    let respuesta = await fetch(endpoint);
    console.log('POPULARES - status:', respuesta.status);
    let datosListas = null;

    if(respuesta.ok){
        datosListas = await respuesta.json();
        console.log('POPULARES - datos:', datosListas);
    }
    else{
        console.log('POPULARES - hubo un error:', await respuesta.text());
    }
    return datosListas;
}
async function traerAutor(id){
    let endpoint = `${BASE_URL}/api/usuarios/${id}`;
    console.log('AUTOR - endpoint:', endpoint);
    let respuesta = await fetch(endpoint);
    console.log('AUTOR - status:', respuesta.status);
    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
        console.log('AUTOR - datos:', datos);
    }
    else{
        console.log('AUTOR - hubo un error:', await respuesta.text());
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

        let link = `../ficha_lista_logueado/ficha_lista_logueado.html?id=${lista.id_lista}`;
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
    await cargarMisListas();
    await cargarPopulares();
    cargador.classList.add('hidden');
}
cargarTodo();
