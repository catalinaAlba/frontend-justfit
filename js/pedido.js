import Barrita from "../Models/Barrita.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

/* validarSesion(); */

document.querySelector("#form-pedido-submit").addEventListener("click", () => {
    const nombre = obtenerValorInput("#pedido-nombre")
    const apellido = obtenerValorInput("#pedido-apellido")
    const direccion = obtenerValorInput("#pedido-direccion")
    const tarjeta = obtenerValorInput("#pedido-tarjeta");

    if(!nombre || apellido || direccion || tarjeta){
        imprimir("#pedido-error", "Faltan campos por completar")
    }
    RequestsAPI.postProducto(nombre, apellido, direccion, tarjeta)
    .then(()=>{
        document.location.replace("index.html")
    })
    .catch((error) => {
        imprimir("nuevo-producto-error", error)
    })
})