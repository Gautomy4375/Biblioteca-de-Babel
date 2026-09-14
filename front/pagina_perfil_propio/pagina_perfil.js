let formbu = document.getElementById('formulario-busqueda');
let inputbu = document.getElementById('buscador');

if (formbu && inputbu){
    formbu.addEventListener('submit', function(event){
        event.preventDefault();
        let tex = inputbu.value.trim();

        if (tex){
            window.location.href = `../resultados_busqueda/resultados_busqueda.html?q=${encodeURIComponent(tex)}`
        }
    })
}