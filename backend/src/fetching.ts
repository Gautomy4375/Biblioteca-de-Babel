const URL = "https://www.googleapis.com/books/v1";
export async function buscarLibros(URL: string) {
    const res = await fetch(URL);
    if(!res.ok) throw Error("La API de google respondio $(res.status)"); // esto console loggea que hubo un error con la api de google y rompe la funcion

}


