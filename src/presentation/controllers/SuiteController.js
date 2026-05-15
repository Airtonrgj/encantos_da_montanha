import { execute as listarSuitesDisponiveis } from "../../application/useCases/reserva/ListarSuitesDisponiveis"
import { obterTodasSuites, obterSuitePorId, cadastrarSuite } from "../../domain/services/suiteService"

function buscarSuites() {
    const suites = obterTodasSuites()
    if (!suites) return null
    return suites
}

function buscarSuitesDisponiveis() {
    const suites = listarSuitesDisponiveis()
    if (!suites) return []
    return suites
}

function buscarSuitePorId(id) {
    const suites = obterSuitePorId(id)
    if (!suites) return null
    return suites
}

function novaSuite(dados) {
    const suite = cadastrarSuite(dados)
    if (!suite) return { ok: false, mensagem: 'Não foi possível cadastrar a suíte'}
    return {ok: true, mensagem: 'Suíte cadastrada com sucesso', dados: suite}
}

export { buscarSuites, buscarSuitesDisponiveis, buscarSuitePorId, novaSuite }