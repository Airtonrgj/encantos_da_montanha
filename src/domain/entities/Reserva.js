import { differenceInDays } from 'date-fns'

class Reservas{
    constructor(Cliente, Suite, PeriodoStadia, status){
        this.Cliente = Cliente
        this.Suite = Suite
        this.PeriodoStadia = PeriodoStadia
        this.status = "pendente"
    }

    calcularNoites(){
        return differenceInDays(
            this.PeriodoStadia.checkout, 
            this.PeriodoStadia.checkin)
    }

    calcularPreco(){
        return this.calcularNoites() * this.Suite.PrecoDiaria
    }

    reservar(){
        this.status = "reservado"
    }

    cancelar(){
        this.status = "cancelado"
    }

}