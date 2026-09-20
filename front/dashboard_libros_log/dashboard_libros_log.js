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
    if (pos > 0){
        pos--;
        imagenes.style.transform = `translateX(-${pos * 14}vw)`;
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

//Hasta aca es el coso del carrusel, YTSMA empiezo con la dinamización (ya adopte el nuevo sistema :) )

let libros = document.querySelectorAll('.imag');

let uno = libros[0];
let dos = libros[1];
let tres = libros[2];
let cuatro = libros[3];
let cinco = libros[4];
let seis = libros[5];
let siete = libros[6];
let ocho = libros[7];
let nueve = libros[8];
let diez = libros[9];

uno.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPS1Es-Brcsfc0g7ZQovCNTvLISpbpLoOOUOgvzSSNspl0wds7TdJMw&s=10';
dos.src = 'https://i.pinimg.com/originals/7b/b7/cd/7bb7cd6d661d8b49783fbd5f59eabe30.jpg';
tres.src = 'https://images.cdn3.buscalibre.com/fit-in/660x660/7b/b1/7bb12823686e96de54d1827f51c07114.jpg';
cuatro.src = 'https://www.blackcat-cideb.com/uploads/2021/01/21038_COVER_Metamorfosi_1_RGB_64aea9572e3617e526f9c181094bef77.jpg';
cinco.src =  'https://images.cdn2.buscalibre.com/fit-in/660x660/14/96/149639d281dba7278ed0eab0cdb56420.jpg';
seis.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpi-OypkB0XLiumqnIOayKz_7p_S27xdqxYrxlKkmRr61ZKr1XQ0CtMg&s=10';
siete.src = 'https://storage-aws-production.publica.la/bajalibros/issues/2024/04/WbparU384FoRaHJZ/5dd15241-d295-4aaa-a76b-8ea56499c419_cover.jpg';
ocho.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrj66irT_0MisKwF1RRTUrzHzPRQbC7zqZDevyPSgva2_PBOhm4DmkijB&s=10';
nueve.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmnd16pFGi-ycjUe-TzNYcnJ1i5ameqo9wudqhj3VvTQrqBKVwEr-RBbw&s=10';
diez.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy_eO-aGOn4Ggvq7ds5cWDoQ7S_fHrGQ0yk26fvyCBlp2mUH_8mPROC8&s=10';

let titles = document.querySelectorAll('.title');

let one = titles[0];
let two = titles[1];
let three = titles[2];
let four = titles[3];
let five = titles[4];
let six = titles[5];
let seven = titles[6];
let eight = titles[7];
let nine = titles[8];
let ten = titles[9];

one.textContent = 'El señor de los Anillos';
two.textContent = 'Harry Potter';
three.textContent = 'Los hermanos Karamazov';
four.textContent = 'Die Verwandlung';
five.textContent = 'La odisea';
six.textContent = 'Biología';
seven.textContent = 'Hamlet';
eight.textContent = 'Macbeth';
nine.textContent = 'La biblioteca de Babel';
ten.textContent = 'Bestiario';





 