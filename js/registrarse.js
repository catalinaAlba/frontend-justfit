import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

const btnRegistrarse = document.querySelector("#form-register-submit");

btnRegistrarse.addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    const apellido = obtenerValorInput("form-register-apellido")
    const email = obtenerValorInput("form-register-email");
    const password = obtenerValorInput("form-register-password")

    if (!nombre || !apellido || !email || !password) {
        imprimir("#form-register-error", "por favor complete todos los campos")
        return;
    }

    RequestsAPI.registrar(nombre, apellido, email, password)
        .then((data => {
            sessionStorage.setItem("session", data.session)
            //sessionStorage.setItem("user", JSON.stringify(data.user))
            console.log(data)
            document.location.replace("home.html")
        }))
        .catch((error) => {
            console.log(error)
            imprimir("#form-register-error", "error")
        })
})