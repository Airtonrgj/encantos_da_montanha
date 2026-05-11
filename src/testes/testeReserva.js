import PeriodoStadia from '../domain/valueObjects/Periodo.js';
import Reservas from '../domain/entities/Reserva.js';

function testeReserva(){
    const minhaSuite = { precoDiaria: 500}

    const periodo = new PeriodoStadia("2026-05-05", "2026-05-15")
    console.log(periodo.checkin)
    console.log(periodo.checkout)
    
    
    const minhaRserva = new Reservas("Airton", minhaSuite, periodo)

    console.log("Total de noites: ", minhaRserva.calcularNoites())
    console.log("perço Total: R$", minhaRserva.calcularPreco())
}

testeReserva()