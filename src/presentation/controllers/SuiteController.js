import { execute as listarSuitesDisponiveis } from "../../application/useCases/reserva/ListarSuitesDisponiveis.js";
import { obterTodasSuites, obterSuitePorId, cadastrarSuite } from "../../domain/services/suiteService.js";

const SuiteController = {
    listarTodas() {
        try {
            return { sucesso: true, dados: obterTodasSuites() };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    listarDisponiveis() {
        try {
            return { sucesso: true, dados: listarSuitesDisponiveis() };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    obterPorId(id) {
        try {
            const suite = obterSuitePorId(id);
            if (!suite) return { sucesso: false, erro: "Suíte não encontrada" };
            return { sucesso: true, dados: suite };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    criar(dados) {
        try {
            const suite = cadastrarSuite(dados);
            if (!suite) return { sucesso: false, erro: "Dados inválidos" };
            return { sucesso: true, dados: suite };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    }
};

export default SuiteController;
