const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

const capasLibros = [
  document.getElementById('tapa1'),
  document.getElementById('tapa2'),
  document.getElementById('tapa3'),
  document.getElementById('tapa4'),
  document.getElementById('tapa5')
];

let arrayFavoritos = [];

// Búsqueda únicamente al presionar Enter
searchInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query.length < 2) {
      resultsList.style.display = 'none';
      resultsList.innerHTML = '';
      return;
    }

    // 1. Mostrar GIF de carga mientras espera al servidor
    resultsList.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; padding: 12px;">
        <img src="../loading_gif.gif" alt="Cargando..." style="height: 6.7vh; width: auto;">
      </div>
    `;
    resultsList.style.display = 'block';

    try {
      let endpoint = `${BASE_URL}/api/libros?titulo=${encodeURIComponent(query)}`;
      let respuesta = await fetch(endpoint);

      if (respuesta.ok) {
        let data = await respuesta.json();

        if (data.libros && data.libros.length > 0) {
          mostrarResultadosDropdown(data.libros);
        } else {
          resultsList.innerHTML = `<div style="padding: 10px; color: #666; font-size: 13px; text-align: center;">No se encontraron libros</div>`;
        }
      } else {
        // Manejo de error 500 o 504 de la API
        resultsList.innerHTML = `<div style="padding: 10px; color: #dc2626; font-size: 13px; text-align: center;">El servidor falló (${respuesta.status}). Intentá buscar de nuevo.</div>`;
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      resultsList.innerHTML = `<div style="padding: 10px; color: #dc2626; font-size: 13px; text-align: center;">Error de conexión con el servidor</div>`;
    }
  }
});

function mostrarResultadosDropdown(libros) {
  resultsList.innerHTML = '';

  libros.forEach(libro => {
    const title = libro.title || 'Sin título';

    let port = libro.portada || 'https://via.placeholder.com/32x45?text=Sin+Tapa';
    if (port.startsWith('http://')) {
      port = port.replace('http://', 'https://');
    }

    const itemEl = document.createElement('div');
    itemEl.classList.add('result-item');

    itemEl.innerHTML = `
      <img class="title-photo" src="${port}" alt="${title}">
      <span class="result-title">${title}</span>
    `;

    itemEl.addEventListener('click', () => {
      if (arrayFavoritos.length < 5) {
        const posicionActual = arrayFavoritos.length;

        // Guardar el google_id en el array
        arrayFavoritos.push(libro.google_id);

        // Colocar la portada segura (HTTPS) en la tapa correspondiente
        capasLibros[posicionActual].src = port;
        capasLibros[posicionActual].alt = title;

        console.log('Array actual de google_ids:', arrayFavoritos);

        // Limpiar buscador y cerrar menú
        searchInput.value = '';
        resultsList.style.display = 'none';

        if (arrayFavoritos.length === 5) {
          enviarPreferencias();
        }
      } else {
        alert('¡Ya elegiste tus 5 libros!');
      }
    });

    resultsList.appendChild(itemEl);
  });

  resultsList.style.display = 'block';
}

async function enviarPreferencias() {
  const userId = localStorage.getItem('userId');

  try {
    let endpoint = `http://localhost:3000/api/usuarios/${userId}/preferencias`;
    let respuesta = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ google_ids: arrayFavoritos })
    });

    if (respuesta.ok) {
      console.log('Preferencias guardadas');
    } else {
      console.error('Error al guardar preferencias:', respuesta.status);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

// Ocultar desplegable si se hace clic fuera
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
    resultsList.style.display = 'none';
  }
});