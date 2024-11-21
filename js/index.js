import Barrita from "../Models/Barrita.js"
import { RequestsAPI } from "../RequestsAPI.js";
import { eventClkickCerrarSesion, imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

/* validarSesion();
eventClkickCerrarSesion(); */


const mostrarListaBarritas = (data) => {

    console.log("datos recibidos", data)
    imprimir("#lista-error", "")

    if (data.length === 0) {
        // Si no hay barritas para mostrar, mostramos un mensaje adecuado
        imprimir("#listado-barritas", "<p>No hay barritas disponibles para este filtro.</p>");
        return;
    }

    const listadoBarritas = data
        .map((barrita) =>
            new Barrita(barrita.id, barrita.sabor, barrita.tipo, barrita.precio, barrita.imagen).mostrarEnLista()
        )
        .join("");
    imprimir("#listado-barritas", listadoBarritas);
}

const mostrarError = (error) => {
    imprimir("#lista-error", error)
}


const obtenerBarritas = (filtroTipo = "") => {
    // Si hay un tipo, se pasa el filtro a la solicitud
    RequestsAPI.getBarritas({ filtroTipo })
        .then(mostrarListaBarritas)
        .catch(mostrarError);
};
obtenerBarritas();

const agregarEventosDeFiltro = () => {
    document.querySelectorAll(".tipos-barritas-buttons button").forEach((button) => {
        button.addEventListener("click", () => {
            const tipoSeleccionado = button.getAttribute("data-value");
            obtenerBarritas(tipoSeleccionado);
        });
    });    
};

agregarEventosDeFiltro();