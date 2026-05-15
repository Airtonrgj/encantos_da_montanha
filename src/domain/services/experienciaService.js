import {
    listarExperiencias,
    salvarExperiencia,
    buscarExperienciaPorId,
    atualizarExperiencia as storageAtualizarExperiencia,
    deletarExperiencia as storageDeletarExperiencia
} from "../../infrastructure/storage/experienciaStorage.js";

function obterTodasExperiencias() {
    return listarExperiencias();
}

function obterExperienciaPorId(id) {
    const experiencia = buscarExperienciaPorId(id);
    if (!experiencia) return null;
    return experiencia;
}

function cadastrarExperiencia(dados) {
    if (!dados.nome || !dados.valor || !dados.descricao || !dados.categoria) {
        return null;
    }

    const novaExperiencia = {
        id: Date.now(),
        nome: dados.nome,
        descricao: dados.descricao,
        categoria: dados.categoria,
        duracao: dados.duracao,
        valor: dados.valor
    };

    salvarExperiencia(novaExperiencia);
    return novaExperiencia;
}

function atualizarExperiencia(id, dados) {
    const experiencia = obterExperienciaPorId(id);
    if (!experiencia) return null;

    experiencia.nome = dados.nome;
    experiencia.descricao = dados.descricao;
    experiencia.valor = dados.valor;
    experiencia.categoria = dados.categoria;

    storageAtualizarExperiencia(experiencia);
    return experiencia;
}

function deletarExperiencia(id) {
    const experiencia = obterExperienciaPorId(id);
    if (!experiencia) return null;
    storageDeletarExperiencia(id);
    return true;
}

export {
    obterTodasExperiencias,
    obterExperienciaPorId,
    cadastrarExperiencia,
    atualizarExperiencia,
    deletarExperiencia
};
