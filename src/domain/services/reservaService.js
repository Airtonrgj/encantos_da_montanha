import { listarSuites, salvarSuite, buscarSuitePorId, atualizarSuite, deletarSuite } from "../../infrastructure/storage/suiteStorage"
import { listarReservas, salvarReserva, buscarReservaPorId, atualizarReserva, deletarReserva } from "../../infrastructure/storage/reservaStorage"

function obterTodasReservas(){
    const lista = listarReservas()
    return lista
}

function obterReservaPorId(id){
    const reserva = buscarReservaPorId(id)
    if (!reserva) return null
    return reserva
}

function criarReserva(dados) {
    if (!dados.nomeHospede || !dados.email || !dados.telefone || !dados.idSuite || !dados.dataEntrada || !dados.dataSaida){
        return null
    }

    const suite = buscarSuitePorId(dados.idSuite)
    if (!suite) return null
    if (!suite.disponivel) return null

    const novaReserva = {
        id: Date.now(),
        nomeHospede: dados.nomeHospede,
        email: dados.email,
        telefone: dados.telefone,
        idSuite: dados.idSuite,
        dataEntrada: dados.dataEntrada,
        dataSaida: dados.dataSaida,
        status: 'pendente'
    }

    suite.disponivel = false        // marca como indisponível
    atualizarSuite(suite)           // suíte atualizada
    salvarReserva(novaReserva)      // salva a reserva
    return novaReserva              // devolve a reserva criada
}

function cancelarReserva(id){
    const reserva = buscarReservaPorId(id)  // busca a reserva
    if (!reserva) return null               // se não existir, para

    reserva.status = 'cancelada'            // muda o status
    atualizarReserva(reserva)               // salva a reserva

    const suite = buscarSuitePorId(reserva.idSuite)  // busca a suíte
    suite.disponivel = true                           // marca disponível
    atualizarSuite(suite)                             // salva a suíte 
}

function confirmarReserva(id){
    const reserva = buscarReservaPorId(id)  // busca a reserva
    if (!reserva) return null               // se não existir, para

    reserva.status = 'confirmada'           // muda o status
    atualizarReserva(reserva)               // salva a reserva
    return reserva                          // devolve a reserva confirmada
}

export { obterTodasReservas, obterReservaPorId, criarReserva }