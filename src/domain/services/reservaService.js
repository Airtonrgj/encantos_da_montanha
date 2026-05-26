import { listarSuites, salvarSuite, buscarSuitePorId, atualizarSuite, deletarSuite } from "../../infrastructure/storage/suiteStorage.js"
import { listarReservas, salvarReserva, buscarReservaPorId, atualizarReserva, deletarReserva } from "../../infrastructure/storage/reservaStorage.js"
import PeriodoStadia from "../valueObjects/Periodo.js"

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

    // monta o periodo da reserva nova — ja valida checkin < checkout
    const novoPeriodo = new PeriodoStadia(dados.dataEntrada, dados.dataSaida)

    // checa sobreposicao com qualquer reserva ativa da mesma suite
    const reservasDaSuite = listarReservas().filter(r =>
        r.idSuite === dados.idSuite && r.status !== "cancelada"
    )
    for (const r of reservasDaSuite){
        const p = new PeriodoStadia(r.dataEntrada, r.dataSaida)
        if (novoPeriodo.sobrepoeCom(p)){
            throw new Error("Essa suíte já tem reserva nas datas escolhidas.")
        }
    }

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

    salvarReserva(novaReserva)
    return novaReserva
}

function cancelarReserva(id){
    const reserva = buscarReservaPorId(id)
    if (!reserva) return null

    reserva.status = 'cancelada'
    atualizarReserva(reserva)
    // nao mexe mais em suite.disponivel — disponibilidade agora vem do periodo
}

function confirmarReserva(id){
    const reserva = buscarReservaPorId(id)  // busca a reserva
    if (!reserva) return null               // se não existir, para

    reserva.status = 'confirmada'           // muda o status
    atualizarReserva(reserva)               // salva a reserva
    return reserva                          // devolve a reserva confirmada
}

// util pra UI: ver se a suite tem alguma reserva ativa que sobreponha o periodo
function verificarDisponibilidadeNoPeriodo(idSuite, checkin, checkout){
    const periodo = new PeriodoStadia(checkin, checkout)
    const reservasDaSuite = listarReservas().filter(r =>
        r.idSuite === idSuite && r.status !== "cancelada"
    )
    return !reservasDaSuite.some(r => {
        const p = new PeriodoStadia(r.dataEntrada, r.dataSaida)
        return periodo.sobrepoeCom(p)
    })
}

export { obterTodasReservas, obterReservaPorId, criarReserva, cancelarReserva, confirmarReserva, verificarDisponibilidadeNoPeriodo }
