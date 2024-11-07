export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const imprimir = (elemento, contenido) => {
    document.querySelector(`${elemento}`).innerHTML = contenido;
}
