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
let posi = 0;

function sig() {
    let imag = document.getElementById('containerLeidos');

    if (posi < 6) {
        posi++;

        if (posi === 4) {
            imag.style.transform = `translateX(-${posi * 12}vw)`
        }
        else {
            imag.style.transform = `translateX(-${posi * 10.2}vw)`
        }
    }
}
function ant() {
    let imagenes = document.getElementById("containerLeidos");
    if (posi > 0) {
        posi--;
        imagenes.style.transform = `translateX(-${posi * 10.2}vw)`;
    }
}

//Hasta aca es lo de los carruseles, empiezo con dinamización de datos:

let imaa = document.getElementById('imaa');
imaa.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let imab = document.getElementById('imab');
imab.src = 'https://i.pinimg.com/originals/7b/b7/cd/7bb7cd6d661d8b49783fbd5f59eabe30.jpg';
let imac = document.getElementById('imac');
imac.src = 'https://images.cdn3.buscalibre.com/fit-in/660x660/7b/b1/7bb12823686e96de54d1827f51c07114.jpg';
let imad = document.getElementById('imad');
imad.src = 'https://www.blackcat-cideb.com/uploads/2021/01/21038_COVER_Metamorfosi_1_RGB_64aea9572e3617e526f9c181094bef77.jpg';
let imae = document.getElementById('imae');
imae.src = 'https://images.cdn2.buscalibre.com/fit-in/660x660/14/96/149639d281dba7278ed0eab0cdb56420.jpg';
let imaf = document.getElementById('imaf');
imaf.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpi-OypkB0XLiumqnIOayKz_7p_S27xdqxYrxlKkmRr61ZKr1XQ0CtMg&s=10';
let imag = document.getElementById('imag');
imag.src = 'https://storage-aws-production.publica.la/bajalibros/issues/2024/04/WbparU384FoRaHJZ/5dd15241-d295-4aaa-a76b-8ea56499c419_cover.jpg';
let imah = document.getElementById('imah');
imah.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrj66irT_0MisKwF1RRTUrzHzPRQbC7zqZDevyPSgva2_PBOhm4DmkijB&s=10';
let imai = document.getElementById('imai');
imai.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmnd16pFGi-ycjUe-TzNYcnJ1i5ameqo9wudqhj3VvTQrqBKVwEr-RBbw&s=10';
let imaj = document.getElementById('imaj');
imaj.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy_eO-aGOn4Ggvq7ds5cWDoQ7S_fHrGQ0yk26fvyCBlp2mUH_8mPROC8&s=10';


//Pruebita para que sea mas eficiente la dinamización:



//



let userName = document.getElementById('username');

//hasta aca las cosas raras de ytsma

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
cargarLeidos();

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
    for (let leido of leidos.slice(0, 10)) {
        let libro = await fetchBookInfo(leido)
        containerLeidos.innerHTML += `
        <img class="libros" src="${libro.portada}" onclick="irAFicha('${leido}')"/>

        `
    };
}


let leyendos = [];
async function cargarLeyendo() {
    await fetchLeyendo();
}
cargarLeyendo();

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
    for (let leyendo of leyendos) {
        let libro = await fetchBookInfo(leyendo)
        containerLeyendo.innerHTML += `
        <img class="libros" src="${libro.portada}" onclick="irAFicha('${leyendo}')"/>

        `
    };
}
