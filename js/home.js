import Barrita from "../Models/Barrita.js"
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, eventClickCerrarSesion, agregarBarritaAlLocalStorage, eliminarBarritaDelLocalStorage } from "../utils/helpers.js";


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

    ////// EVENTO click en card para ampliacion
    document.querySelectorAll(".card").forEach((itemListado) => {
        
        const barritaId = itemListado.getAttribute("id");

        itemListado.addEventListener("click", (event) => {
            if (event.target.classList.contains("agregar-btn")) {
                console.log("Clic en botón Agregar, no redirigir");
                return;
            }
            //console.log("Clic en la tarjeta, redirigiendo a ampliación con ID:", barritaId);
            document.location.replace(`ampliacion-barrita.html?id=${barritaId}`);
        });
    });

    ////// EVENTO click en botón agregar para localStorage
    document.querySelectorAll(".btn-agregar").forEach((buttonAgregar) => {

        buttonAgregar.addEventListener("click", (event) => {
            
            event.stopPropagation();

            const barritaId = buttonAgregar.getAttribute("data-id");
            //console.log("Clic en Agregar al carrito, ID de la barrita:", barritaId);
            const barritaSeleccionada = data.find(barrita => barrita.id === parseInt(barritaId));

            agregarBarritaAlLocalStorage(barritaSeleccionada);
        });
    });

        ////// EVENTO click en botón eliminar para localStorage
        document.querySelectorAll(".btn-eliminar").forEach((buttonEliminar) => {

            buttonEliminar.addEventListener("click", (event) => {
                event.stopPropagation();
        
                const barritaId = buttonEliminar.getAttribute("data-id");
                console.log("Clic en Eliminar del carrito, ID de la barrita:", barritaId);
        
                eliminarBarritaDelLocalStorage(barritaId);
            });
        });
}

const mostrarError = (error) => {
    imprimir(".lista-error", error)
}



// filtrado Celiacas
const obtenerBarritas = (filtroTipo = "") => {

    RequestsAPI.getBarritas({ filtroTipo })
        .then(mostrarListaBarritas)
        .catch(mostrarError);
};
obtenerBarritas("celiaca");
