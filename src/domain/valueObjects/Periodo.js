/* verificação para vê se o periodo cadastrado é válido ou não, facilita o trabalho de pesquisa nas APIs */
class PeriodoStadia{
    checkin = null
    checkout = null

    constructor(checkin, checkout){
        const dataCheckin = new Date(checkin + "T12:00:00")
        const dataCheckout = new Date(checkout + "T12:00:00")
       if (dataCheckin >= dataCheckout){
        throw new Error("a data de chekin não pode ser superior ou igual a data de chekout")
       }
       /* salva as variavei se as datas passarem */
       this.checkin = dataCheckin
       this.checkout = dataCheckout
    }

    get valido(){
        return true
    }

    /* checa se essa estadia conflita com outra (mesma suite, p.ex.)
       checkout de uma reserva pode ser o checkin de outra (intervalo meio-aberto) */
    sobrepoeCom(outro){
        if (!(outro instanceof PeriodoStadia)){
            throw new Error("sobrepoeCom espera outro PeriodoStadia")
        }
        return this.checkin < outro.checkout && outro.checkin < this.checkout
    }
}

export default PeriodoStadia
