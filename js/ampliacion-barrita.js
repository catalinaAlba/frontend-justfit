import Barrita from "../Models/Barrita.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, eventClickCerrarSesion } from "../utils/helpers.js";

eventClickCerrarSesion();

const params = new URLSearchParams(window.location.search)
const idBarrita = params.get("id")

const mostrarError = (error) => {
    imprimir("#ampliacion-error", error)
}

const mostrarAmpliacion = (data) => {
    const barrita = new Barrita(data.id, data.sabor, data.tipo, data.precio, data.img);
    imprimir("#data-ampliacion", barrita.mostrarAmpliacion())
}

RequestsAPI.getBarritaById(idBarrita)    
    .then(mostrarAmpliacion)
    .catch((error) => {
        mostrarError(error)
    })