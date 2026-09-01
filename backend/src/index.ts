import express from 'express';
import type { Express } from 'express';
import { carpetaFrontend, iniciar } from 'server.ts';
import type { Pedido, Respuesta } from 'server.ts';
import * as fs from 'fs/promises';
import * as path from 'node:path'
import { fileURLToPath } from 'url';
import { stringify } from 'node:querystring';
import type { DB } from '../src/types.js';


// La app de Express. Los tests la importan de acá, por eso va exportada.
export const app: Express = express();

// Para levantar el frontend (HTML, CSS, JS) desde la carpeta `frontend/`.
app.use(express.static(carpetaFrontend));

// LEER ARCHIVOS
const RUTA_DB = path.join(import.meta.dirname, 'database.json.users');
export async function LeerDB(): Promise<DB> {
  const texto = await fs.readFile(RUTA_DB, 'utf-8');
  const TextoLimpio = JSON.parse(texto) as DB; 
  return TextoLimpio;
}

export async function EscribirDB(Texto: DB): Promise<void> {
  const texto = JSON.stringify(Texto, null, 2);   // el "2" es para que quede indentado y leible. el Null es que como ya usamos JSON.stringify, no necesitamos algun conversor mayor.
  await fs.writeFile(RUTA_DB, texto, 'utf-8');
  console.log(`Datos guardados en archivo ${RUTA_DB}`);
}

function Login(pedido: Pedido, respuesta: Respuesta): boolean {
    let informacion: string = pedido.params.login
    let loginExitoso: boolean = false 
    function UsuarioRepetido(informacion: string): boolean {
        let Repetido: boolean = true
        /* if(!LeerDB(usuario)) {
            Repetido = false
             return Repetido 
                }
            else {
            Repetido = true
            return Repetido
            }
    

       */
        return Repetido // hay que sacarlo dsp cuando abra lo demas (lo saque de ser comentario)
    }
    return loginExitoso 
}

app.get('/api/recorrido/:linea', Login);

// Para empezar a escuchar eventos 
iniciar(app);