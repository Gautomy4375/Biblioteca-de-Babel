let pos = 0;

function siguiente() {
    let imagenes = document.getElementById("imagenes");

    if (pos < 4) {
        pos++;

        if (pos == 4) {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        } else {
            imagenes.style.transform = `translateX(-${pos * 12.5}vw)`;
        }
    }
}
function anterior() {
    let imagenes = document.getElementById("imagenes");
    if (pos > 0) {
        pos--;
        imagenes.style.transform = `translateX(-${pos * 12.5}vw)`;
    }
}
// cada carrusel de abajo tiene su propia posicion, asi no se mueven entre si
let posiciones = {
    containerLeidos: 0,
    containerLeyendo: 0
};

function sig(idContainer) {
    let imag = document.getElementById(idContainer);
    let posi = posiciones[idContainer];

    if (posi < 6) {
        posi++;

        if (posi === 4) {
            imag.style.transform = `translateX(-${posi * 12}vw)`
        }
        else {
            imag.style.transform = `translateX(-${posi * 10.2}vw)`
        }
    }
    posiciones[idContainer] = posi;
}
function ant(idContainer) {
    let imagenes = document.getElementById(idContainer);
    let posi = posiciones[idContainer];
    if (posi > 0) {
        posi--;
        imagenes.style.transform = `translateX(-${posi * 10.2}vw)`;
    }
    posiciones[idContainer] = posi;
}

//Hasta aca es lo de los carruseles, empiezo con dinamización de datos:



//Pruebita para que sea mas eficiente la dinamización:



//



let userName = document.getElementById('username');

//hasta aca las cosas raras de ytsma
//leidos  A BUE QUE LE DECIS COSAS RARAS A LO QUE HAGO POSTE

async function fetchBookInfo(google_id) {
    let endpoint = `${BASE_URL}/api/libros/especifico?google_id=${google_id}`
    let respuesta = await fetch(endpoint);
    if (respuesta.ok) {
        let libro = await respuesta.json();
        return libro;
    }
}
function irAFicha(google_id) {
    window.location.href = `../ficha_libro_logueado/ficha_libro_logueado.html?google_id=${google_id}`
}

let leidos = [];
async function cargarLeidos() {
    await fetchUltimosLeidos();

}

async function fetchUltimosLeidos() {
    let endpoint = `${BASE_URL}/api/libros/${localStorage.getItem("userId")}/leidos`;
    let respuesta = await fetch(endpoint);
    if (respuesta.ok) {
        leidos = (await respuesta.json()).libros;
        console.log(leidos);
    } else {
        console.error("Error al obtener los últimos leídos");
    }
    await mostrarLeidos();

}

async function mostrarLeidos() {
    containerLeidos = document.getElementById('containerLeidos');
    containerLeidos.innerHTML = '';
    if (!leidos || leidos.length === 0) {
        containerLeidos.innerHTML = `<p class="vacio">No tenés ningún libro leído</p>`;
        return;
    }
    for (let leido of leidos.slice(0, 10)) {
        let libro = await fetchBookInfo(leido)
        containerLeidos.innerHTML += `
        <img class="libros" src="${libro.portada}" onclick="irAFicha('${leido}')"/>

        `
    };
}

//leyendo

let leyendos = [];
async function cargarLeyendo() {
    await fetchLeyendo();
}

async function fetchLeyendo() {
    let endpoint = `${BASE_URL}/api/usuarios/${localStorage.getItem("userId")}/progreso`;
    let respuesta = await fetch(endpoint);
    if (respuesta.ok) {
        let progreso = (await respuesta.json()).progreso;
        for (let item of progreso) {
            if (item.estado_libro === 'leyendo') {
                leyendos.push(item.google_id);
            }
        }
        console.log(leyendos);
    } else {
        console.error("Error al obtener los leyendo");
    }
    await mostrarLeyendo();


}

async function mostrarLeyendo() {
    containerLeyendo = document.getElementById('containerLeyendo');
    containerLeyendo.innerHTML = '';
    if (leyendos.length === 0) {
        containerLeyendo.innerHTML = `<p class="vacio">No tenés ningún libro que estés leyendo</p>`;
        return;
    }
    for (let leyendo of leyendos) {
        let libro = await fetchBookInfo(leyendo)
        containerLeyendo.innerHTML += `
        <img class="libros" src="${libro.portada}" onclick="irAFicha('${leyendo}')"/>

        `
    };
}

//recomendaciones

//lo comento hasta que ande el endpoint. el HTML tiene placeholders.
/*
let recomendaciones = [];
async function cargarRecomendaciones() {
    await fetchRecomendaciones();
}

async function fetchRecomendaciones() {
    let endpoint = `${BASE_URL}/api/usuarios/${localStorage.getItem("userId")}/recomendaciones?limite=5`;
    let respuesta = await fetch(endpoint);
    let datos = await respuesta.json();
    console.log("datos:", datos);

}

async function mostrarRecomendaciones() {
    let containerRecomendaciones = document.getElementById('imagenes');
    containerRecomendaciones.innerHTML = '';
    for (let recomendacion of recomendaciones) {
        let googleId = recomendacion.google_id || recomendacion;
        let libro = await fetchBookInfo(googleId)
        containerRecomendaciones.innerHTML += `
        <img class="ima" src="${libro.portada}" onclick="irAFicha('${googleId}')"/>

        `
    };
}
*/

//carga de todo + gif

let cargador = document.getElementById('cargadorCon');

async function cargarTodo() {
    try {
        await Promise.all([cargarLeidos(), cargarLeyendo()]);
    } catch (error) {
        console.error("Error cargando el dashboard", error);
    }
    cargador.classList.add('hidden');
}
cargarTodo();

