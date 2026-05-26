class Telefone {
    constructor(valor) {
        if (typeof valor !== "string") throw new Error("Telefone inválido.")
        const digitos = valor.replace(/\D/g, "") // só dígitos

        if (digitos.length !== 10 && digitos.length !== 11) {
            throw new Error("Telefone deve ter DDD + número (10 ou 11 dígitos).")
        }

        const ddd = Number(digitos.substring(0, 2))
        if (ddd < 11 || ddd > 99) {
            throw new Error("DDD inválido.")
        }

        this.valor = digitos
    }

    get formatado() {
        const d = this.valor
        if (d.length === 11) {
            return `(${d.substring(0, 2)}) ${d.substring(2, 7)}-${d.substring(7)}`
        }
        return `(${d.substring(0, 2)}) ${d.substring(2, 6)}-${d.substring(6)}`
    }

    toString() {
        return this.formatado
    }
}

export default Telefone
