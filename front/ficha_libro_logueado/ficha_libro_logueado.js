function openreview () {
    reviewOverlay.classList.remove('hidden');
}

// SOLO se esconde cuando apretas lo gris
reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });
    
    libro = 'harry potter y la odisea'
    ////async function(libro) {
    //    let descripcion = await fetch(`/api/libros/:${libro}`)
    //} 
    //let descicipon = descripcion.descripcion 