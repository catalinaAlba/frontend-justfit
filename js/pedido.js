import Barrita from "../Models/Barrita.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion, eventClickCerrarSesion, obtenerBarritasDelLocalStorage, eliminarBarritaDelLocalStorage } from "../utils/helpers.js";


validarSesion();
eventClickCerrarSesion();

// Falta armar funcion para calcular el precio total de las pedido

const mostrarBarritasPedido = () => {
    const barritasDelLocalStorage = obtenerBarritasDelLocalStorage();

    // verificar si no hay barritas en el localStorage
    if (barritasDelLocalStorage.length === 0) {
        imprimir(".lista-barritas-pedido", "Todavía no agregaste barritas a tu pedido.");
        return;
    }

    const listadoBarritasPedido = barritasDelLocalStorage
        .map((barrita) =>
            new Barrita(barrita.id, barrita.sabor, barrita.tipo, barrita.precio, barrita.imagen).mostrarEnPedido()
        )
        .join("");
    imprimir(".lista-barritas-pedido", listadoBarritasPedido);

    // EVENTO para eliminar barritas
    document.querySelectorAll(".btn-eliminar").forEach((buttonEliminar) => {

        buttonEliminar.addEventListener("click", () => {

            const barritaId = buttonEliminar.getAttribute("data-id");
            console.log("Clic en Eliminar del carrito, ID de la barrita:", barritaId);

            eliminarBarritaDelLocalStorage(barritaId);

            const cardEliminada = buttonEliminar.closest(".card-horizontal");
            cardEliminada.remove();

            // mensaje si ya no quedan mas barritas
            const barritasRestantes = obtenerBarritasDelLocalStorage();
            if (barritasRestantes.length === 0) {
                imprimir(".lista-barritas-pedido", "Todavía no agregaste barritas a tu pedido.");
            }
        });
    });
};
mostrarBarritasPedido();




// Datos del pedido
document.querySelector("#form-pedido-submit").addEventListener("click", () => {
    const nombre = obtenerValorInput("pedido-nombre");
    const apellido = obtenerValorInput("pedido-apellido");
    const direccion = obtenerValorInput("pedido-direccion");
    const tarjeta = obtenerValorInput("pedido-tarjeta");

    if (!nombre || !apellido || !direccion || !tarjeta) {
        imprimir("#pedido-error", "Faltan campos por completar");
        return;
    }

   
    const barritas = obtenerBarritasDelLocalStorage();
    if (barritas.length === 0) {
        imprimir("#pedido-error", "Debes agregar al menos una barrita a tu pedido.");
        return;
    }

    // Obtener solo los IDs de las barritas
    const barritasIds = barritas.map(barrita => barrita.id.toString());
   
    RequestsAPI.postPedido(nombre, apellido, direccion, tarjeta, barritasIds)
        .then(() => {
            console.log("Pedido realizado con éxito");
            document.location.replace("index.html");
        })
        .catch((error) => {
            console.error("Error al realizar el pedido:", error);
            imprimir("#pedido-error", error);
        });
});




const calcularSubtotal = () => {
    const barritasDelLocalStorage = obtenerBarritasDelLocalStorage();

    if (barritasDelLocalStorage.length === 0) {
        return 0;
    }    
    const subtotal = barritasDelLocalStorage.reduce((total, barrita) => {
        return total + barrita.precio;
    }, 0);

    return subtotal;
};

const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const envio = 5.00;
    return subtotal + envio;
};

const mostrarResumenPedido = () => {
    const subtotal = calcularSubtotal();
    const total = calcularTotal();
    
    imprimir(".precio-subtotal", `$${subtotal.toFixed(2)}`);
    imprimir(".precio-total", `$${total.toFixed(2)}`);
};

mostrarResumenPedido();

// Asegúrate de actualizar el resumen cada vez que se agregue o elimine una barrita
document.querySelectorAll(".btn-eliminar").forEach((buttonEliminar) => {
    buttonEliminar.addEventListener("click", () => {
        // Actualiza el resumen después de eliminar una barrita
        mostrarResumenPedido();
    });
});

