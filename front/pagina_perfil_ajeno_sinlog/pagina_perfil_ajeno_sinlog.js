/*ytsma, aca empiezo con lo de hacer los datos dinamicos*/
let foto_perfil = document.getElementById('foto_perfil');
foto_perfil.src = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png';

let nombre = document.getElementById('nom');
nombre.textContent = 'Nombre propio';

let seguidores = document.getElementById('seguidores');
seguidores.textContent = '56';
let seguidos = document.getElementById('seguidos');
seguidos.textContent = '98';
let leidos = document.getElementById('leidos');
leidos.textContent = '27';

let imagen_1 = document.getElementById('libro_uno')
imagen_1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let imagen_2 = document.getElementById('libro_dos')
imagen_2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let imagen_3 = document.getElementById('libro_tres')
imagen_3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let imagen_4 = document.getElementById('libro_cuatro')
imagen_4.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let imagen_5 = document.getElementById('libro_cinco')
imagen_5.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';

let le1 = document.getElementById('libr_1');
le1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let le2 = document.getElementById('libr_2');
le2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let le3 = document.getElementById('libr_3')
le3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let le4 = document.getElementById('libr_4');
le4.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let le5 = document.getElementById('libr_5');
le5.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let le6 = document.getElementById('libr_6');
le6.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';

let pl1 = document.getElementById('one');
pl1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let pl2 = document.getElementById('two');
pl2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let pl3 = document.getElementById('three');
pl3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let pl4 = document.getElementById('four');
pl4.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let pl5 = document.getElementById('five');
pl5.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
let pl6 = document.getElementById('six');
pl6.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';

let id = new URLSearchParams(window.location.search).get('id');

async function traerListas(idDueño){
    let endpoint = `${BASE_URL}/api/usuarios/${idDueño}/0/listas`;
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
function mostrarListas(listas){
    let calis = document.querySelectorAll('.cali');

    for(let i = 0; i < calis.length && i < listas.length; i++){
        calis[i].querySelector('.nombre').textContent = listas[i].nombre;
        calis[i].addEventListener('click', function(){
            window.location.href = `../ficha_lista_nologueado/ficha_lista_nologueado.html?id=${listas[i].id_lista}`;
        });

        let portadas = calis[i].querySelectorAll('.librito');
        for(let j = 0; j < portadas.length && j < listas[i].libros.length; j++){
            portadas[j].src = listas[i].libros[j].libro.portada;
        }
    }
}
async function cargarListas(){
    let listas = document.getElementById('listas');
    let todoListas = await traerListas(id);
    if(todoListas){
        listas.textContent = todoListas.listas.length;
        mostrarListas(todoListas.listas);
    }
    else{
        listas.textContent = '0';
    }
}
cargarListas();



let resim1 = document.getElementById('a');
resim1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let resim2 = document.getElementById('b');
resim2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let resim3 = document.getElementById('c');
resim3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let resim4 = document.getElementById('d');
resim4.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'

let resti1 = document.getElementById('tiUno');
resti1.textContent = 'Poste';
let resti2 = document.getElementById('tiDos');
resti2.textContent = 'Poste';
let resti3 = document.getElementById('tiTres');
resti3.textContent = 'Poste';
let resti4 = document.getElementById('tiCuatro');
resti4.textContent = 'Poste';

let des1 = document.getElementById('des1');
des1.textContent = 'Es un cuento poético y filosófico. Narra la historia de un aviador varado en el desierto del Sahara que conoce a un pequeño príncipe de otro planeta. Es una obra maestra universal sobre la pérdida de la inocencia, el amor y los lazos afectivos';
let des2 = document.getElementById('des2');
des2.textContent = 'Es un cuento poético y filosófico. Narra la historia de un aviador varado en el desierto del Sahara que conoce a un pequeño príncipe de otro planeta. Es una obra maestra universal sobre la pérdida de la inocencia, el amor y los lazos afectivos';
let des3 = document.getElementById('des3');
des3.textContent = 'Es un cuento poético y filosófico. Narra la historia de un aviador varado en el desierto del Sahara que conoce a un pequeño príncipe de otro planeta. Es una obra maestra universal sobre la pérdida de la inocencia, el amor y los lazos afectivos';
let des4 = document.getElementById('des4');
des4.textContent = 'Es un cuento poético y filosófico. Narra la historia de un aviador varado en el desierto del Sahara que conoce a un pequeño príncipe de otro planeta. Es una obra maestra universal sobre la pérdida de la inocencia, el amor y los lazos afectivos';

