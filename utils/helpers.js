
import { RequestsAPI } from "../RequestsAPI.js";

export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const imprimir = (elemento, contenido) => {
    document.querySelector(`${elemento}`).innerHTML = contenido;
}


export const validarSesion = () => {
    //devuelve booleano true o false
    const usuarioLogueado = sessionStorage.getItem("session");
    const estaEnLogin = document.location.pathname.includes("login.html");
    const estaEnRegistrarse = document.location.pathname.includes("registrarse.html");
    const estaEnPedido = document.location.pathname.includes("pedido.html");


    if (usuarioLogueado) {
        if (estaEnLogin || estaEnRegistrarse) {
            document.location.replace("home.html")
        }
    }
    else {
        if (estaEnPedido) {
            document.location.replace("login.html")
        }
    }
}

export const eventClickCerrarSesion = () => {
    document.querySelector("#btn-logout").addEventListener("click", () => {
        sessionStorage.removeItem("session");
        RequestsAPI.logout()
            .then(() => {
                document.location.replace("login.html")
            })
    })
}

export const agregarBarritaAlLocalStorage = (barrita) => {

    let barritasSeleccionadas = JSON.parse(localStorage.getItem("barritasSeleccionadas")) || [];

    // Verifica barrita no sea null o undefined antes de agregar
    if (barrita && barrita.id) {
        barritasSeleccionadas.push(barrita);

        localStorage.setItem("barritasSeleccionadas", JSON.stringify(barritasSeleccionadas));

        console.log("Barrita agregada al pedido:", barrita);
    } else {
        console.log("Error: No se puede agregar una barrita inválida");
    }
};

export const eliminarBarritaDelLocalStorage = (idBarrita) => {
    let barritasSeleccionadas = JSON.parse(localStorage.getItem("barritasSeleccionadas")) || [];

    // Busca el índice en el array, de la primera barrita que coincida con el id
    const index = barritasSeleccionadas.findIndex(barrita => barrita.id === parseInt(idBarrita));

    if (index !== -1) {
        // Elimina solo la barrita que encuentea
        barritasSeleccionadas.splice(index, 1);

        localStorage.setItem("barritasSeleccionadas", JSON.stringify(barritasSeleccionadas));

        console.log(`Barrita con ID ${idBarrita} eliminada del pedido.`);
    } else {
        console.log(`No se encontró una barrita con ID ${idBarrita}.`);
    }
};


export const obtenerBarritasDelLocalStorage = () => {
    return JSON.parse(localStorage.getItem("barritasSeleccionadas")) || [];
};



