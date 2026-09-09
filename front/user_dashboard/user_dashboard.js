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
let posi = 0;

function sig(){
    let imag = document.getElementById('imagene');

    if (posi < 6){
        posi++;

        if (posi === 4){
            imag.style.transform =  `translateX(-${posi * 12}vw)`
        }
        else{
            imag.style.transform =  `translateX(-${posi * 10.2}vw)`
        }
    }
}
function ant() {
    let imagenes = document.getElementById("imagene");
    if (posi > 0){
        posi--;
        imagenes.style.transform = `translateX(-${posi * 10.2}vw)`;
    }
}
let 