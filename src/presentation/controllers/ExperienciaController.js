import { execute as adicionarExperiencia } from "../../application/useCases/experiencia/AdicionarExperiencia"
import { obterTodasExperiencias, obterExperienciaPorId } from "../../domain/services/experienciaService"

function listarExperiencias() {
    const experiencias = obterTodasExperiencias()
    if (!experiencias) return null
    return experiencias
}

function buscarExperienciaPorId(id) {
    const experiencias = obterExperienciaPorId(id) 
    if (!experiencias) return null
    return experiencias
}

function novaExperiencia(dados) {
    const experiencia = adicionarExperiencia(dados)
    if (!experiencia) return { ok: false, mensagem: 'Não foi possível criar uma nova experiencia' }
    return { ok: true, mensagem: 'Experiencia nova criada com sucesso'}   
}

export {listarExperiencias, buscarExperienciaPorId, novaExperiencia}