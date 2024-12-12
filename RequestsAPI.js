
const obtenerUrl = (ruta) => `${RequestsAPI.urlBackend}/${ruta}`
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
}

const token = sessionStorage.getItem("session")
if (token) {
    headers.authorization = token;
}

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


export class RequestsAPI {/* https://backend-justfit.onrender.com */
    static urlBackend = "http://localhost:3000";

    //// usuario login - registrar - logout
    static login(email, password) {
        const body = JSON.stringify({ email, password })
        return fetch(obtenerUrl("login"), { method: "POST", body, headers })
            .then(procesarResponse)
            .catch(manejarError)
    }

    static registrar(nombre, apellido, email, password) {
        const body = JSON.stringify({ nombre, apellido, email, password })
        return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
            .then(procesarResponse)
            .catch(manejarError)
    }

    static logout() {
        return fetch(obtenerUrl("logout"), { method: "POST", headers })
            .then(procesarResponse)
            .catch(manejarError)
    }

    //// barritas
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

    static getBarritaById(idBarrita) {
        return fetch(obtenerUrl(`barrita/${idBarrita}`), { headers })
            .then(procesarResponse)
            .catch(manejarError)
    }

    //// pedido
    static postPedido(nombre, apellido, direccion, tarjeta) {
        const body = JSON.stringify({ nombre, apellido, direccion, tarjeta })
        return fetch(obtenerUrl("pedido"), { method: "POST", body, headers })
            .then(procesarResponse)
            .catch(manejarError)
    }
}

