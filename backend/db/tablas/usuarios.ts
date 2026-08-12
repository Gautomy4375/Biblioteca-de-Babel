
const user = "hola"
const BadUsers: string[] = ["1", "2", "3", "4"]
function detectBadWords (user: string): boolean {
    let isBad: boolean = false
    for(let i: number = 0; i < BadUsers.length; i++) {
        if (BadUsers[i] === user) {
         isBad = true
} 
    else {
    }
}
return isBad
}

function storeUser(user: string) {
    if (detectBadWords(user) === true)
    {
        console.log("El usuario tiene un nombre no permitido") 
    } else {
        // Guardar usuario en base de datos / json
    }
}