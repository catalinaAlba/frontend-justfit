import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

const btnRegistrarse = document.querySelector("#form-register-submit");

btnRegistrarse.addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    const apellido = obtenerValorInput("form-register-apellido")
    const email = obtenerValorInput("form-register-email");
    const password = obtenerValorInput("form-register-password")

    RequestsAPI.registrar(nombre, apellido, email, password)
        .then((data => {
            sessionStorage.setItem("session", data.session)
            document.location.replace("index.html")
        }))
        .catch((error) => {
            console.log(error)
            imprimir("#form-register-error", "error")
        })
})