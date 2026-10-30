let parametros = new URLSearchParams(window.location.search);
let idLista = parametros.get('id');
let idUsuario = localStorage.getItem('userId');

async function esperarLista() {
    let endpoint = `${BASE_URL}/api/listas/${idLista}?id_usuario=${idUsuario}`;
    let respuesta = await fetch(endpoint);

    if (respuesta.ok) {
        window.location.replace(`../ficha_lista_logueado/ficha_lista_logueado.html?id=${idLista}`);
    }
    else {
        window.location.replace('../pagina_error_log/pagina_error.html');
    }
}
esperarLista();
