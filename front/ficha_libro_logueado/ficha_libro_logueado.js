function openreview () {
    reviewOverlay.classList.remove('hidden');
}

// Hide the form ONLY when clicking the gray background overlay
reviewOverlay.addEventListener('click', (event) => {
    // event.target ensures they clicked the background, not the nested .review1 elements
    if (event.target === reviewOverlay) {
        reviewOverlay.classList.add('hidden');
    }
    });