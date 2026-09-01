import type { Express, Request, Response } from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import open from 'open';

const __dir: string = dirname(fileURLToPath(import.meta.url));

/** Carpeta donde vive el frontend ya armado. Se sirve con `express.static`. */
export const carpetaFrontend: string = join(__dir, '../../front');

export type Respuesta = Response
export type Pedido = Request<Record<string, string>, unknown, Record<string, string>>;

export function iniciar(app: Express, puerto: number = 3000): void {
    app.listen(puerto, (): void => {
      const url: string = `http://localhost:${puerto}`;
      console.log(`Página en ${url}`);
      void open(url);
    });
  }
