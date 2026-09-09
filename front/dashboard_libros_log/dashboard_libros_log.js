let pos = 0;

function siguiente() {
    let imagenes = document.getElementById("imagenes");

    if (pos < 4) {
        pos++;

        if (pos == 4) {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        } else {
            imagenes.style.transform = `translateX(-${pos * 12.5}vw)`;
        }
    }
}
function anterior() {
    let imagenes = document.getElementById("imagenes");
    if (pos > 0){
        pos--;
        imagenes.style.transform = `translateX(-${pos * 12.5}vw)`;
    }
}