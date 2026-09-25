let enter = document.getElementById('busca');
let input = document.getElementById('buscador');


/*ytsma, aca empiezo con lo de hacer los datos dinamicos*/
let foto_perfil = document.getElementById('foto_perfil');
foto_perfil.src = 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png';

let nombre = document.getElementById('nom');
nombre.textContent = localStorage.getItem('usernameSession');

let seguidores = document.getElementById('seguidores');
seguidores.textContent = '56';
let seguidos = document.getElementById('seguidos');
seguidos.textContent = '98';
let leidos = document.getElementById('leidos');
leidos.textContent = '27';
let listas = document.getElementById('listas');
listas.textContent = '12';

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

let ein = document.getElementById('ein');
ein.textContent = 'Nombre lista';
let tzwei = document.getElementById('tzwei');
tzwei.textContent = 'Nombre lista';
let drei = document.getElementById('drei');
drei.textContent = 'Nombre lista';
let vier = document.getElementById('vier');
vier.textContent = 'Nombre lista';

let ima1 = document.getElementById('I');
ima1.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima2 = document.getElementById('II');
ima2.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima3 = document.getElementById('III')
ima3.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima4 = document.getElementById('IV')
ima4.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima5 = document.getElementById('V')
ima5.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima6 = document.getElementById('VI')
ima6.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima7 = document.getElementById('VII')
ima7.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima8 = document.getElementById('VIII')
ima8.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima9 = document.getElementById('IX')
ima9.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima10 = document.getElementById('X')
ima10.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima11 = document.getElementById('XI')
ima11.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima12 = document.getElementById('XII')
ima12.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima13 = document.getElementById('XIII')
ima13.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima14 = document.getElementById('XIV')
ima14.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima15 = document.getElementById('XV')
ima15.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima16 = document.getElementById('XVI')
ima16.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima17 = document.getElementById('XVII')
ima17.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima18 = document.getElementById('XVIII')
ima18.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima19 = document.getElementById('XIX')
ima19.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima20 = document.getElementById('XX')
ima20.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima21 = document.getElementById('XXI')
ima21.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima22 = document.getElementById('XXII')
ima22.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima23 = document.getElementById('XXIII')
ima23.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'
let ima24 = document.getElementById('XXIV')
ima24.src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10'



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


enter.addEventListener('submit', function(event){
    event.preventDefault();

    let titulo = input.value.trim();

    if(titulo){
        window.location.href= `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(titulo)}`; 
    }
})




function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('usernameSession');
    window.location.replace("../home/home.html");

}

