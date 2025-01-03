import Barrita from "../Models/Barrita.js"
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, eventClickCerrarSesion} from "../utils/helpers.js";

eventClickCerrarSesion();

const mostrarListaBarritas = (data) => {

    console.log("datos recibidos", data)
    imprimir(".lista-error", "")

    if (data.length === 0) {
        // Si no hay barritas para mostrar, mostramos un mensaje
        imprimir(".listado-barritas", "<p>No hay barritas disponibles para este filtro.</p>");
        return;
    }

    const listadoBarritas = data
        .map((barrita) =>
            new Barrita(barrita.id, barrita.sabor, barrita.tipo, barrita.precio, barrita.imagen).mostrarEnLista()
        )
        .join("");
    imprimir(".listado-barritas", listadoBarritas);

    document.querySelectorAll(".card").forEach((itemListado) => {
        itemListado.addEventListener("click", () => {
            document.location.replace(`ampliacion-barrita.html?id=${itemListado.id}`)
        })
    })
}

const mostrarError = (error) => {
    imprimir(".lista-error", error)
}


const obtenerBarritas = (filtroTipo = "") => {
    // Si hay un tipo, se pasa el filtro a la solicitud
    RequestsAPI.getBarritas({ filtroTipo })
        .then(mostrarListaBarritas)
        .catch(mostrarError);
};
obtenerBarritas();

const agregarEventosDeFiltro = () => {
    const botones =document.querySelectorAll(".tipos-barritas-buttons button");
    botones.forEach((button) => {
        button.addEventListener("click", () => {
            botones.forEach(btn=> btn.classList.remove("activa"))
            const tipoSeleccionado = button.getAttribute("data-value");
            button.classList.add("activa")
            obtenerBarritas(tipoSeleccionado);
        });
    });    
};

agregarEventosDeFiltro();