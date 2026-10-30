let te = document.getElementById('pru');
let bot = document.getElementById('pruebas');
let img = document.getElementById('peru');
let asa = document.getElementById('pa');
let titulo = '';



let nombre = 'harry potter';



async function probar(nombre){

    let endpoint = `${BASE_URL}/api/libros/${encodeURIComponent(nombre)}`;
    let respuesta = await fetch(endpoint);
    let datos = '';

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        window.location.href='../pagina_error_log/pagina_error.html';
    }

    return datos;
}


bot.addEventListener('click', async function(e){

    let libroObjeto = await probar(nombre);
    
    
    te.textContent = libroObjeto.title;

    img.src = libroObjeto.portada;


})

