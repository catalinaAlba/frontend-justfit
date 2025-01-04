
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

