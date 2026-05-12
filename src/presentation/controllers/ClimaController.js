import ObterPrevisaoClima from "../../application/useCases/clima/ObterPrevisaoClima.js";
import FeriadoAPI from "../../infrastructure/api/FeriadoAPI.js";

const ClimaController = {
    async exibirPrevisao(dias = 7) {
        try {
            const dados = await ObterPrevisaoClima(dias);
            return { sucesso: true, dados };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    async verificarFeriadoNaData(data) {
        try {
            const feriado = await FeriadoAPI.verificarFeriado(data);
            return { sucesso: true, feriado };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    async obterFeriadosDoAno(ano) {
        try {
            const feriados = await FeriadoAPI.obterFeriados(ano);
            return { sucesso: true, feriados };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    }
};

export default ClimaController;
