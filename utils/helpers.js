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
    const estaEnPagPublica = estaEnLogin || estaEnRegistrarse;

    if (usuarioLogueado) {
        if (estaEnPagPublica) {
            document.location.replace("index.html")
        }
    }
}

export const eventClkickCerrarSesion=()=>{
    document.querySelector("#boton-logout").addEventListener("click", ()=>{
        sessionStorage.removeItem("session");
        RequestsAPI.logout()
        .then(()=>{
            document.location.replace("login.html")
        })
    })
}