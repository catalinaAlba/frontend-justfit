import Barrita from "../Models/Barrita.js"
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";


const mostrarListaBarritas = (data) => {

    console.log("datos recibidos", data)
    imprimir("#lista-error", "")

    const listadoBarritas = data.map((barrita) => new Barrita(barrita.id, barrita.sabor, barrita.tipo, barrita.precio, barrita.imagen).mostrarEnLista()).join("")

    imprimir("#listado-barritas", listadoBarritas);
}

const mostrarError = (error) => {
    imprimir("#lista-error", error)
}

RequestsAPI.getBarritas()
    .then(mostrarListaBarritas)
    .catch(mostrarError)