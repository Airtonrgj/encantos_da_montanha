class CPF {
    constructor(valor) {
        if (typeof valor !== "string") throw new Error("CPF inválido.")
        const digitos = valor.replace(/\D/g, "") // só números

        if (digitos.length !== 11) throw new Error("CPF deve ter 11 dígitos.")
        if (/^(\d)\1{10}$/.test(digitos)) throw new Error("CPF inválido.") // rejeita 11111111111 etc
        if (!CPF.#verificarDigitos(digitos)) throw new Error("CPF inválido.")

        this.valor = digitos
    }

    static #verificarDigitos(d) {
        // calcula os dois dígitos verificadores e compara
        const calcular = (base, peso) => {
            let soma = 0
            for (let i = 0; i < base.length; i++) {
                soma += Number(base[i]) * (peso - i)
            }
            const resto = (soma * 10) % 11
            return resto === 10 ? 0 : resto
        }
        const dv1 = calcular(d.substring(0, 9), 10)
        const dv2 = calcular(d.substring(0, 10), 11)
        return dv1 === Number(d[9]) && dv2 === Number(d[10])
    }

    get formatado() {
        const d = this.valor
        return `${d.substring(0, 3)}.${d.substring(3, 6)}.${d.substring(6, 9)}-${d.substring(9)}`
    }

    toString() {
        return this.formatado
    }
}

export default CPF
