import { adicionarExperiencia } from "../../domain/services/experienciaService"

function execute(dados) {
    const experiencia = adicionarExperiencia(dados)
    if (!experiencia) return null
    return experiencia
}

export { execute }