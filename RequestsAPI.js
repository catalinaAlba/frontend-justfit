
const obtenerUrl = (ruta) => `${RequestsAPI.urlBackend}/${ruta}`


const procesarResponse = (res) => {
    return res.json().then((data) => {
        if (data.error) {
            throw new Error(data?.error)
        }
        return data
    })
}

const manejarError = (error = new Error("Error desconocido")) => {
    console.error("Ha ocurrido un error:", error.message)
    throw error.message
}

export class RequestsAPI {
    static urlBackend = "https://backend-justfit.onrender.com";

    static getBarritas(opciones = {}) {
        const queryParams = new URLSearchParams({})

        // filtros
        if (opciones.filtroSabor) {
            queryParams.set("sabor", opciones.filtroSabor)
        }
        if (opciones.filtroTipo) {
            queryParams.set("tipo", opciones.filtroTipo)
        }

        return fetch(obtenerUrl("barritas?" + queryParams))
            .then(procesarResponse)
            .catch(manejarError)
    }
}

