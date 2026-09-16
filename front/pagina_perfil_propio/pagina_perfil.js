let enter = document.getElementById('busca');
let input = document.getElementById('buscador');


let nombre = document.getElementById('nom');
nombre.textContent = 'nombre';



enter.addEventListener('submit', function(event){
    event.preventDefault();

    let titulo = input.value.trim();

    if(titulo){
        window.location.href= `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(titulo)}`; 
    }
})

