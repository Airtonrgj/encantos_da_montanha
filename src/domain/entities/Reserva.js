class Reservas{
    constructor(id, Cliente, Suite, PeriodoStadia, status = "pendente"){
        this.id = id
        this.Cliente = Cliente
        this.Suite = Suite
        this.PeriodoStadia = PeriodoStadia
        this.status = status
    }

    calcularNoites(){
        /* diferença em dias entre checkout e checkin (1 dia = 86400000 ms) */
        const umDia = 1000 * 60 * 60 * 24
        return Math.round((this.PeriodoStadia.checkout - this.PeriodoStadia.checkin) / umDia)
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
