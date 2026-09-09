function openreview () {
    reviewOverlay.classList.remove('hidden');
}

// SOLO se esconde cuando apretas lo gris
reviewOverlay.addEventListener('click', (event) => {
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });