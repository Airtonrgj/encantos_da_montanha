import PeriodoStadia from "../domain/valueObjects/Periodo.js";
import Reservas from '../domain/entities/Reserva.js';

function Periodo(){

    try{
        /* o código não vai receber assim, precisa dos das informações de campo html para saber de onde ele vai puxar os inputs de datas */
        const periodo = new PeriodoStadia(
            "2026-05-05",
            "2026-05-15"
        )
        console.log("cadastro criado com sucesso")
        console.log(" checkin: ", periodo.checkin.toLocaleDateString())
        console.log(" checkout: ", periodo.checkout.toLocaleDateString())
    } catch(erro){
        console.log("o periodo do checkin não pode ser uma data superior a do checkout")
    
    }

    

}


function Reserva(){
    const minhaSuite = { precoDiaria: 500}

    const periodo = new PeriodoStadia("2026-05-10", "2026-05-12")

    /* não vai fixar assim, tem que implementar o bygatelementId */
    const minhaRserva = new Reservas("1", "Airton", minhaSuite, periodo)

    console.log("Total de noites: ", minhaRserva.calcularNoites())
    console.log("perço Total: R$", minhaRserva.calcularPreco())
}

Reserva()
Periodo()