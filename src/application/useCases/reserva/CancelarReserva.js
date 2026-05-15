import { cancelarReserva } from "../../domain/services/reservaService"

function execute(id) {
    const reserva = cancelarReserva(id)
    if (!reserva) return null
    return reserva
}

export { execute }