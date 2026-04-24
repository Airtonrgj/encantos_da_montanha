/* verificação para vê se o periodo cadastrado é válido ou não, facilita o trabalho de pesquisa nas APIs */
class PeriodoStadia{
    checkin = null
    checkout = null

    constructor(checkin, checkout){
        const dataCheckin = new Date(checkin + "T12:00:00")
        const dataCheckout = new Date(checkout + "T12:00:00")
       if (checkin > checkout){
        throw new Error("a data de chekin não pode ser superior a data de chekout")
       }
       /* salva as variavei se as datas passarem */
       this.checkin = dataCheckin
       this.checkout = dataCheckout
    }

    get valido(){
        return true
    }
}

export default PeriodoStadia