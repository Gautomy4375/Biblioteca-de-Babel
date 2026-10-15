let tituloPaginaAnterior = new URLSearchParams(window.location.search);
let nombre = tituloPaginaAnterior.get('q');

console.log(nombre);

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista');

if (nombre){

    if (conTi){
        conTi.textContent = `"${nombre}"`;

            buscarusuarios(nombre);
             
    }
}
else{
    conLi.textContent = `Por favor, escribí un término en el buscador`;
}

async function buscarusuarios(nombre) {



    let endpoint = `http://localhost:3000/api/usuarios/buscar/${nombre}`;

    let respuesta = await fetch(endpoint);



    if (respuesta.ok){
        let usuarios = await respuesta.json();
        console.log("Datos recibidos del backend:", usuarios);

        if (usuarios && usuarios.length > 0){
            mostrarusuarios(usuarios);
            
        }
        else{
            conLi.textContent = 'No se encontraron usuarios'
        }
    }
    else{
        conLi.textContent = 'Hubo un error'
        
    }
}

function mostrarusuarios(usuarios){
    
    conLi.innerHTML = '';

    usuarios.forEach(usuario =>{
        let divs = document.createElement('a');
        divs.href= `../pagina_perfil_ajeno/pagina_perfil_ajeno.html?id=${encodeURIComponent(usuario.id)}`
        divs.classList.add('boton_libro');
        

        

        divs.innerHTML = `
        
        <h3 class="nomUsu" >${usuario.nombre || usuario.username}</h3>
         `;

         conLi.appendChild(divs);
    })
}

let buscarLista = document.getElementById('listas');

buscarLista.addEventListener('click', function(event){
    event.preventDefault();

    let titul = nombre;

    if(titul){
        window.location.href = `../resultados_busqueda_listas/resultados_busqueda_listas.html?q=${encodeURIComponent(titul)}`
    }

})

