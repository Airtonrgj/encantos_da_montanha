class Nome {
    constructor(valor) {
        if (typeof valor !== "string") throw new Error("Nome inválido.")
        const limpo = valor.trim().replace(/\s+/g, " ")

        if (limpo.length < 3) throw new Error("Nome muito curto.")
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/.test(limpo)) {
            throw new Error("Nome não pode conter números ou símbolos.")
        }
        const palavras = limpo.split(" ").filter(p => p.length > 1)
        if (palavras.length < 2) {
            throw new Error("Informe nome e sobrenome.")
        }

        this.valor = limpo
    }

    toString() {
        return this.valor
    }
}

export default Nome
