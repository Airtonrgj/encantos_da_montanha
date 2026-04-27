import PeriodoStadia from '../domain/valueObjects/Periodo.js';

import { Reservas } from '../domain/entities/Reserva.js';

function testeReserva(){
    const minhaSuite = { precoDiaria: 500}

    const periodo = new PeriodoStadia("2026-05-10", "2026-05-12")

    const minhaRserva = new Reservas("Airton", minhaSuite, periodo)

    console.log("Total de noites: ", minhaRserva.calcularNoites())
    console.log("perço Total: R$", minhaRserva.calcularPreco())
}

testeReserva()