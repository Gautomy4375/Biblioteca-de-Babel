/* 

VALORES DE CADA COSA
POR PUNTUACIONES:
5: 10
4: 5
3: 0
2: -5
1: -10
0: 0

POR LIKES: 
1

POR RESEÑA: 
5 
aunque puede ser una reseña negativa, igualmente muestra que tiene interes en este genero 

*/





// importar cosas 


// recibir interaccion 


// sumar
function CalcularPeso(interaccion: string, puntuacion: number=0, usuario: string): number {
    // Recibir Usuario
    // Calcular el peso actual de este usuario
    let Peso = 0
    if(interaccion === "Like") {
        Peso++
    }
    else if(interaccion === "Reseña" && Peso >= 1) { // El peso debe ser 1: osea, tiene o que ya haber puesto un like o haber hecho una reseña de al menos 3, cosa de que no te sume si le pusiste 1 
        Peso = Peso + 5
    }
    else if(interaccion === "Puntuacion") {
        if(puntuacion === 5) {
            Peso = Peso + 10
        }
        else if (puntuacion === 4) {
            Peso = Peso +5
        }
        else if (puntuacion === 3) {
            Peso++
        }
        else if (puntuacion === 2) {
            Peso = Peso - 5
        }
        else if (puntuacion === 1) {
            Peso = Peso - 10
        }
    }
    return Peso
}

// dar a la base de datos