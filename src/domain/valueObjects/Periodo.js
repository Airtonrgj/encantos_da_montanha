/* verificação para vê se o periodo cadastrado é válido ou não, facilita o trabalho de pesquisa nas APIs */
class PeriodoStadia{
    
    checkin = null
    checkout = null

    constructor(chekin, chekout){
       if (chekin > chekout){
        throw new Error("a data de chekin não pode ser superior a data de chekout")
       }
       /* salva as variavei se as datas passarem */
       this.checkin = chekin
       this.checkout = chekout

    
    }

    get valido(){
        return true
    }
}