import * as fs from 'fs/promises';
import type { User } from './types.js';

// Decidir que archivo y cosa leer
// Leer Archivos JSON
export async function LeerDB(File: string, CosaParaLeer: string): Promise<string | null> // String para el "data", null para si tira un error
{
  try {
    const data = await fs.readFile(File, 'utf-8'); // utf-8 lo convierte de bytes a texto. Como estoy intentando conseguir ambos err y la data, no es necesario especificarlo
    // HAY QUE ESPECIFICAR QUE ES LO QUE ESTAMOS BUSCANDO
    let Datos_En_Objeto: User = JSON.parse(data);
    let Usuario = CosaParaLeer
    for(const user of usuarios) {
        if(user.nombre === Usuario) {
            let usuarioEncontrado = Usuario
            console.log(usuarioEncontrado?.email);
            break;
        }
    }


    console.log('File contents:', data);
    return data;  

  } catch (err) {
    console.error(`Error leyendo el archivo json ${File}`);
    console.error(err);
    return null;
  }
}

// Escribir Archivos JSON 

export async function EscribirDB(File: string, content: string): Promise<void> {
  try {
    await fs.writeFile(File, content, 'utf-8');
    console.log('Archivo guardado con éxito');
  } catch (err) {
    console.error(`Error escribiendo el archivo json ${File}`);
    console.error(err);
  }
}
