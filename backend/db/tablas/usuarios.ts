
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
function hasSpecialChar(user:string) {
    const regex = /[^a-zA-Z0-9]/; // ni idea como funciona esta ecuacion pero funciona 
    return regex.test(user);
  }  

function storeUser(user: string) {
    if (detectBadWords(user) === true)
    {
        console.log("El usuario tiene un nombre no permitido") 
    } else {
        // Guardar usuario en base de datos / json
    }
}

console.log(hasSpecialChar("HelloWorld123")); 
console.log(hasSpecialChar("Hello@World!")); 