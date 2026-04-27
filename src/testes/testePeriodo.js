import PeriodoStadia from "../domain/valueObjects/Periodo.js";
function testarPeriodo(){
    console.log("iniciando o teste")

    /* primeiro teste: período válido */
    console.log("teste 1...")
    try{
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

testarPeriodo()