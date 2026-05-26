class Email {
    constructor(valor) {
        if (typeof valor !== "string") throw new Error("Email inválido.")
        const limpo = valor.trim().toLowerCase()

        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
        if (!regex.test(limpo)) {
            throw new Error("Email inválido. Use o formato nome@dominio.com.")
        }

        this.valor = limpo
    }

    toString() {
        return this.valor
    }
}

export default Email
