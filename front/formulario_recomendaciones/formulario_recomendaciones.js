const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');
const capasLibros = [
  document.getElementById('tapa1'),
  document.getElementById('tapa2'),
  document.getElementById('tapa3'),
  document.getElementById('tapa4'),
  document.getElementById('tapa5')
];

let seleccionados = 0;

// Escuchar lo que escribe el usuario en el buscador
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  // Si hay menos de 2 letras escritas, ocultamos el menú
  if (query.length < 2) {
    resultsList.style.display = 'none';
    resultsList.innerHTML = '';
    return;
  }

  try {
    let endpoint = `https://proyectos-tic.ort.edu.ar/biblioteca-de-babel/api/api/libros?titulo=${encodeURIComponent(query)}`;
    let respuesta = await fetch(endpoint);

    if (respuesta.ok) {
      let data = await respuesta.json();
      console.log("Libros recibidos para el dropdown:", data);

      // Verificamos si devuelve el array 'libros'
      if (data.libros && data.libros.length > 0) {
        renderResults(data.libros);
      } else {
        resultsList.style.display = 'none';
      }
    } else {
      resultsList.style.display = 'none';
    }
  } catch (error) {
    console.error('Error al consultar la API:', error);
    resultsList.style.display = 'none';
  }
});

function renderResults(libros) {
  resultsList.innerHTML = '';

  libros.forEach(libro => {
    const title = libro.title || 'Sin título';
    const portada = libro.portada || 'https://via.placeholder.com/32x45?text=Sin+Tapa';

    const itemEl = document.createElement('div');
    itemEl.classList.add('result-item');

    itemEl.innerHTML = `
      <img class="title-photo" src="${portada}" alt="${title}">
      <span class="result-title">${title}</span>
    `;

    // Al hacer clic en un libro de la lista desplegable
    itemEl.addEventListener('click', () => {
      if (seleccionados < 5) {
        // Asignar la portada al siguiente contenedor (#tapa1, #tapa2, etc.)
        capasLibros[seleccionados].src = portada;
        capasLibros[seleccionados].alt = title;
        seleccionados++;

        // Limpiar el buscador y ocultar el dropdown
        searchInput.value = '';
        resultsList.style.display = 'none';
      } else {
        alert('¡Ya seleccionaste tus 5 libros!');
      }
    });

    resultsList.appendChild(itemEl);
  });

  resultsList.style.display = 'block';
}

// Ocultar la lista si el usuario hace clic fuera del buscador o del dropdown
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
    resultsList.style.display = 'none';
  }
});