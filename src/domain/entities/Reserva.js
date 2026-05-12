import { differenceInDays } from "date-fns/fp"
class Reservas{
    constructor(id, Cliente, Suite, PeriodoStadia, status = "pendente"){
        this.id = id
        this.Cliente = Cliente
        this.Suite = Suite
        this.PeriodoStadia = PeriodoStadia
        this.status = status
    }

    calcularNoites(){
        return differenceInDays(
            this.PeriodoStadia.checkout,
            this.PeriodoStadia.checkin)
    }

    calcularPreco(){
        return this.calcularNoites() * this.Suite.precoDiaria
    }

    reservar(){
        this.status = "reservado"
    }

    cancelar(){
        this.status = "cancelado"
    }

}

export default Reservas;
