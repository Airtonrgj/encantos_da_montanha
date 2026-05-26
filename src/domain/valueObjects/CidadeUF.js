const UFS = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
    "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
    "RS","RO","RR","SC","SP","SE","TO"
]

class CidadeUF {
    constructor(valor) {
        if (typeof valor !== "string") throw new Error("Cidade/UF inválida.")
        const limpo = valor.trim().replace(/\s+/g, " ")

        // formato esperado: "Cidade / UF" (aceita com ou sem espaco em volta da barra)
        const partes = limpo.split("/").map(p => p.trim())
        if (partes.length !== 2 || !partes[0] || !partes[1]) {
            throw new Error("Informe no formato 'Cidade / UF' (ex: Belo Horizonte / MG).")
        }

        const cidade = partes[0]
        const uf = partes[1].toUpperCase()

        if (cidade.length < 2) throw new Error("Nome da cidade muito curto.")
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/.test(cidade)) {
            throw new Error("Cidade não pode conter números ou símbolos.")
        }
        if (!/^[A-Z]{2}$/.test(uf) || !UFS.includes(uf)) {
            throw new Error("UF inválida. Use a sigla com 2 letras (ex: MG, SP, RJ).")
        }

        this.cidade = cidade
        this.uf = uf
        this.valor = `${cidade} / ${uf}`
    }

    toString() {
        return this.valor
    }
}

export default CidadeUF
