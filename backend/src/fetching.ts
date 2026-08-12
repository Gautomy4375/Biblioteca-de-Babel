const URL = "https://www.googleapis.com/books/v1";

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

export async function buscarLibros(URL: string) {
    const res = await fetch(URL);
    if(!res.ok) throw Error('La API de google respondio {res.status}'); // esto console loggea que hubo un error con la api de google y rompe la funcion

}


