let enter = document.getElementById('busca');
let input = document.getElementById('buscador');

/*ytsma, aca empiezo con lo de hacer los datos dinamicos*/
let nombre = document.getElementById('nom');
nombre.textContent = 'Nombre propio';

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


enter.addEventListener('submit', function(event){
    event.preventDefault();

    let titulo = input.value.trim();

    if(titulo){
        window.location.href= `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(titulo)}`; 
    }
})

