import * as fs from 'fs/promises';
import * as path from 'node:path'
import type { DB } from '../../src/types.js';


/*

ACLARACION: ESTE ARCHIVO SOLO FUNCIONA DE UNA MANERA COMO PARA PRACTICAR COMO HACER ESTO. 
LUEGO TENDRE QUE HACER UNA FUNCION PARA CADA UNO, YA QUE NOSE PUEDE ESPECIFICAR TODO EN UNA FUNCION

*/
const RUTA_DB = path.join(import.meta.dirname, 'database.json');

export async function LeerDB(): Promise<DB> {
  const texto = await fs.readFile(RUTA_DB, 'utf-8');
  const TextoLimpio = JSON.parse(texto) as DB; // as JSON para que el .parse este "seguro" de que esto esta en formato JSON
  return TextoLimpio;
}

export async function EscribirDB(Texto: DB): Promise<void> {
  const texto = JSON.stringify(Texto, null, 2);   // el "2" es para que quede indentado y leible. el Null es que como ya usamos JSON.stringify, no necesitamos algun conversor mayor.
  await fs.writeFile(RUTA_DB, texto, 'utf-8');
  console.log('Archivo guardado de forma exitosa');
}