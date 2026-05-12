import { listarExperiencias, salvarExperiencia, buscarExperienciaPorId, atualizarExperiencia, deletarExperiencia } from "../../infrastructure/storage/experienciaStorage";

function obterTodasExperiencias() { //Mostra todas as experiências disponíveis.
    const lista = listarExperiencias()
    return lista
}

function obterExperienciaPorId(id) {
    const experiencia = buscarExperienciaPorId(id) // pede para o storage buscar
    if (!experiencia) return null // se não existir, avisa
    return experiencia // se existir, devolve
}

function cadastrarExperiencia(dados) {
    if (!dados.nome || !dados.valor || !dados.descricao || !dados.categoria) {  //condições para cadastro
        return null // verifica se existem
    }
     const novaExperiencia = {
        id: Date.now(),              // gera id único
        nome: dados.nome,
        descricao: dados.descricao,
        categoria: dados.categoria,
        duracao: dados.duracao,
        valor: dados.valor
    }

    salvarExperiencia(novaExperiencia)  // manda o storage salvar
    return novaExperiencia              // devolve a experiência criada
}

function atualizarExperiencia(id, dados) {   
    const experiencia = obterExperienciaPorId(id)
    if (!experiencia) return null

    experiencia.nome = dados.nome
    experiencia.descricao = dados.descricao
    experiencia.valor = dados.valor
    experiencia.categoria = dados.categoria

    atualizarExperiencia(experiencia)   
    return experiencia                  // devolve atualizada
}
 function deletarExperiencia(id) {
    const experiencia = obterExperienciaPorId(id)
    if (!experiencia) return null
    deletarExperiencia(id)
 }

 export { obterTodasExperiencias, obterExperienciaPorId, cadastrarExperiencia, atualizarExperiencia, deletarExperiencia }
