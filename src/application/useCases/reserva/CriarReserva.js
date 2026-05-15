import { criarReserva } from "../../domain/services/reservaService"

function execute(dados) {
    const reserva = criarReserva(dados)
    if (!reserva) return null
    return reserva
}

export { execute }