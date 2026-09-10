let pos = 0;

function siguiente() {
    let imagenes = document.getElementById("imagenes");

    if (pos < 4) {
        pos++;

        if (pos == 4) {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        } else {
            imagenes.style.transform = `translateX(-${pos * 14}vw)`;
        }
    }
}
function anterior() {
    let imagenes = document.getElementById("imagenes");
    if (posi > 0){
        posi--;
        imagenes.style.transform = `translateX(-${posi * 14}vw)`;
    }
}

let posi = 0;

function sig() {
    let imag = document.getElementById("imagene");

    if (posi < 4) {
        posi++;

        if (posi == 4) {
            imag.style.transform = `translateX(-${posi * 14}vw)`;
        } else {
            imag.style.transform = `translateX(-${posi * 14}vw)`;
        }
    }
}
function ant() {
    let imag = document.getElementById("imagene");
    if (posi > 0){
        posi--;
        imag.style.transform = `translateX(-${posi * 14}vw)`;
    }
}