import Barrita from "../Models/Barrita.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, eventClickCerrarSesion, agregarBarritaAlLocalStorage, eliminarBarritaDelLocalStorage } from "../utils/helpers.js";

eventClickCerrarSesion();

const params = new URLSearchParams(window.location.search);
const idBarrita = params.get("id");

const mostrarError = (error) => {
    imprimir("#ampliacion-error", error);
};

const mostrarAmpliacion = (data) => {
    const barrita = new Barrita(data.id, data.sabor, data.tipo, data.precio, data.img);
    imprimir("#data-ampliacion", barrita.mostrarEnAmpliacion());


    const buttonAgregar = document.querySelector(".btn-agregar");
    if (buttonAgregar) {
        buttonAgregar.addEventListener("click", () => agregarBarritaAlLocalStorage(barrita));
    }

    const buttonEliminar = document.querySelector(".btn-eliminar");
    if (buttonEliminar) {
        buttonEliminar.addEventListener("click", () => eliminarBarritaDelLocalStorage(barrita));
    }
};


RequestsAPI.getBarritaById(idBarrita)
    .then(mostrarAmpliacion)
    .catch((error) => {
        mostrarError(error);
    });
