//#region libroslista
const datos = [
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Primera tarjeta" },
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Segunda tarjeta" },
  { imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/d9/1f/d91fe3e3e534deec6995a67458a17126.jpg", texto: "Tercera tarjeta" }
];

const librosGrid = document.getElementById('libros-grid');
// Seleccionamos la plantilla
const plantilla = document.getElementById('libro-template');

datos.forEach((item) => {
  // 1. Duplicamos/clonamos la estructura de la plantilla
  const clon = plantilla.content.cloneNode(true);

  // 2. Buscamos la img y el p DENTRO del clon y les asignamos los datos
  clon.querySelector('img').src = item.imagen;
  clon.querySelector('p').textContent = item.texto;

  // 3. Insertamos el clon en el contenedor principal
  librosGrid.appendChild(clon);
});
//#endregion