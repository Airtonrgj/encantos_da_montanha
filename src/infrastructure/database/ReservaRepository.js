import Reservas from "../../domain/entities/Reserva.js";
import Suite from "../../domain/entities/Suite.js"; 
import PeriodoStadia from "../../domain/valueObjects/Periodo.js";
import { buscarReservaPorId, deletarReserva, listarReservas, salvarReserva, atualizarReserva} from "../storage/reservaStorage.js";

class ReservaRepository{
    listarReservas(){
        const dadosCrus = listarReservas()

        const periodoReidratado = dadosCrus.map(dado => {

            /* montar o periodo reidratado */
            const periodo = new PeriodoStadia(dado.PeriodoStadia.checkin, dado.PeriodoStadia.checkout)

            /* montar a suite redratada */
            const suite = new Suite(dado.Suite.id, dado.Suite.nome, dado.Suite.descricao, dado.Suite.fotos, dado.Suite.comodidades, dado.Suite.precoDiaria)

            /* monta a reserva com tudo reidratado ja  */
            return new Reservas(dado.id, dado.Cliente, suite, periodo, dado.status)
    
        })
        return periodoReidratado
    }

    buscaDeReservaPorId(id){
        
        const dado = buscarReservaPorId(id)
        
        const suite = new Suite(dado.Suite.id, dado.Suite.nome, dado.Suite.descricao, dado.Suite.fotos, dado.Suite.comodidades, dado.Suite.precoDiaria)
        
        const periodo = new PeriodoStadia(dado.PeriodoStadia.checkin, dado.PeriodoStadia.checkout)

        const buscaReservaReidratada = new Reservas(dado.id, dado.Cliente, suite, periodo, dado.status)
        
        return buscaReservaReidratada
    }

    /* true se a suite ja tem reserva ativa que bate com o periodo (mesma suite, datas sobrepostas) */
    temReservaNoPeriodo(idSuite, periodo){
        const reservas = this.listarReservas()
        return reservas.some(r =>
            r.Suite && String(r.Suite.id) === String(idSuite) &&
            r.status !== "cancelado" &&
            periodo.sobrepoeCom(r.PeriodoStadia)
        )
    }

    atualizarReservas(reservaAtualizada){
        atualizarReserva(reservaAtualizada)
    }

    salvarReservas(reserva){
        salvarReserva(reserva)
    }

    deletarReservas(id){
        deletarReserva(id)
    }

}

export default ReservaRepository