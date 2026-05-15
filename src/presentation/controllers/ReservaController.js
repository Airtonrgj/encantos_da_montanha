import { execute as criarReserva } from "../../application/useCases/reserva/CriarReserva"
import { execute as cancelarReserva } from "../../application/useCases/reserva/CancelarReserva"
import { obterTodasReservas } from "../../domain/services/reservaService"

function realizarReserva(dados) {
    const reserva = criarReserva(dados) //Chamada do use case
    if (!reserva) return { ok: false, mensagem: 'Não foi possível criar a reserva da suíte'}
    return {ok: true, mensagem: 'Reserva realida com sucesso', dados: reserva}
}