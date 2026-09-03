let cantidad_mul = 24;
const padre = document.getElementById('leidos');
let i = 0;
while(i<cantidad_mul){
    const nuevoDiv = document.createElement('a')
    nuevoDiv.className = 'libro';
    padre.appendChild(nuevoDiv);
    nuevoDiv.innerHTML =
`<article class="titulo"></article>
<div class="imagen"></div>`
    
    i++
}
