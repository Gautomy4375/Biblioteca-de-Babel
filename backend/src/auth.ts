import bcrypt from'bcryptjs';  

const saltRounds = 12;
const a = true;
const b = true;
const c = true;
const PasswordinDB = '$2b$12$HDhkFGA0coT0zmvsQbReR.6bYN1k62WLq0FE5VQWxXvnNDq141OIW';
const plainPassword = 'PorqueMarcosEscribe1000Contraseñas';

async function HashPassword(saltRounds: number, plainPassword: string): Promise<string> {
const HashedPassword: string = await bcrypt.hash(plainPassword, saltRounds);
return HashedPassword;
} 

async function CheckPassword(plainPassword: string, PasswordinDB: string): Promise<boolean> {
const coinciden: boolean = await bcrypt.compare(plainPassword, PasswordinDB);
return coinciden;
} 

function register(): void { 

} 

async function login(): Promise<void> {
const coinciden: boolean = await CheckPassword(plainPassword, PasswordinDB);
if(coinciden) {
console.log("Acceso Exitoso");
}
else {
console.log("Acceso denegado. Contraseña o Usuario incorrecto.");
}
} 

if (a) {
HashPassword(saltRounds, plainPassword);
}
if (b) {
CheckPassword(plainPassword, PasswordinDB); 
}
if (c) {
login();
}

// Correr tests 
console.log(await CheckPassword(plainPassword, PasswordinDB));        // true
console.log(await CheckPassword('contraseñaMala', PasswordinDB));     // false