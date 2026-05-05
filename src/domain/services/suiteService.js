import { listarSuites, salvarSuite, buscarSuitePorId, atualizarSuite, deletarSuite } from "../../infrastructure/storage/suiteStorage"

function obterTodasSuites(){
    const lista = listarSuites()
    return lista
}

function obterSuitePorId(id){
    const suite = buscarSuitePorId(id)  // pede para o storage buscar
    if (!suite) return null             // se não existir, avisa
    return suite                        // se existir, devolve
}

function cadastrarSuite(dados) {
     if (!dados.nome || !dados.preco || !dados.descricao){
        return null  // verifica se existem
    }

    const novaSuite = {
        id: Date.now(),        // gera suíte nova com data e hora atual
        nome: dados.nome,
        descricao: dados.descricao,
        comodidades: dados.comodidades,
        precoPorNoite: dados.preco,
        fotos: dados.fotos,
        disponivel: true       // toda suíte começa disponível
    }

    salvarSuite(novaSuite)   // storage salva
    return novaSuite          // devolve a suíte criada
}

function verificarDisponibilidade(id){
    const suite = obterSuitePorId(id)
    if (!suite) return null
    return suite.disponivel
}

function atualizarDisponibilidade(id, disponivel){
    const suite = obterSuitePorId(id)
    if (!suite) return null
    suite.disponivel = disponivel   // troca o valor
    atualizarSuite(suite)           // manda o storage salvar
}

export { obterTodasSuites, obterSuitePorId, cadastrarSuite, verificarDisponibilidade, atualizarDisponibilidade }