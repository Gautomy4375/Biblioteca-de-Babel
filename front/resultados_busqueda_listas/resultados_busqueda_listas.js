let tituloPaginaAnterior = URLSearchParams(window.location.search);
let titu = tituloPaginaAnterior.get('q');

let conTi = document.getElementById('palabra-buscada');
let conLi = document.getElementById('lista');

if(titu){

    conTi.textContent= `'${titu}'`;

    buscarListas
}