import { execute as adicionarExperienciaUC } from "../../application/useCases/experiencia/AdicionarExperiencia.js";
import { obterTodasExperiencias, obterExperienciaPorId, deletarExperiencia } from "../../domain/services/experienciaService.js";

const ExperienciaController = {
    listarTodas() {
        try {
            return { sucesso: true, dados: obterTodasExperiencias() };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    obterPorId(id) {
        try {
            const experiencia = obterExperienciaPorId(id);
            if (!experiencia) return { sucesso: false, erro: "Experiência não encontrada" };
            return { sucesso: true, dados: experiencia };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    adicionar(dados) {
        try {
            const experiencia = adicionarExperienciaUC(dados);
            if (!experiencia) return { sucesso: false, erro: "Dados inválidos" };
            return { sucesso: true, dados: experiencia };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    deletar(id) {
        try {
            const ok = deletarExperiencia(id);
            if (!ok) return { sucesso: false, erro: "Experiência não encontrada" };
            return { sucesso: true };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    }
};

export default ExperienciaController;
