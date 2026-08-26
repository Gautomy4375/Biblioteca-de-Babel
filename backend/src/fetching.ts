import {type Books} from "../db/json/types.js";

const baseURL = "https://www.googleapis.com/books/v1/volumes";
let LibroPedido = "Harry Potter"
let q = LibroPedido
const Google_Books_API_KEY = "🤡😱🥳🦁😨" // por si algun bot de github intenta de conseguirla...

export interface VolumenGoogle {
      id: string; 
      volumeInfo: {
      title: string;
      subtitle?: string;
      authors?: string[];
      publishedDate?: string;
      pageCount?: number;
      categories?: string[];
      imageLinks?: { thumbnail?: string };
      industryIdentifiers?: { type: string; identifier: string }[];
    };
  }
  // Segun la google books API, hay que usar ?: ya que hace que si no hay nada lo ponga como null, ya que para muchos libros, no contiene esta informacion.

export async function buscarLibros(baseURL: string, q: string): Promise<string> {

  const url = new URL(baseURL); // el "new" es necesario ya que es algo nuevo, sino no funciona.
    url.searchParams.set("q", q);
    url.searchParams.set("maxResults", "20")
    url.searchParams.set("country", "AR")
    url.searchParams.set("key", Google_Books_API_KEY)
    const res = await fetch(url);
    if(!res.ok) {
       throw Error(`La API de google respondio ${res.status}`); 
      }
      // esto console loggea que hubo un error con la api de google y rompe la funcion
    else {
      return await res.json()
    }
    // falta retornar el resultado al json o a la base de datos
}


