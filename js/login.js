import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

const btnLogin = document.querySelector("#form-login-submit");

btnLogin.addEventListener("click", () => {
    const email = obtenerValorInput("form-login-email");
    const password = obtenerValorInput("form-login-password")

    RequestsAPI.login(email, password)
        .then((data => {
            sessionStorage.setItem("session", data.session)
            document.location.replace("index.html")
        }))
        .catch((error) => {
            console.log(error)
            imprimir("#form-login-error", "Email o contraseña incorrectos no se encuentra registrado")
        })
})