const BASE_URL = "https://brasilapi.com.br/api/feriados/v1";

const FeriadoAPI = {
    async obterFeriados(ano = new Date().getFullYear()) {
        const response = await fetch(`${BASE_URL}/${ano}`);
        if (!response.ok) throw new Error(`Erro ao buscar feriados: ${response.status}`);
        return response.json();
    },

    async verificarFeriado(data) {
        const ano = new Date(data).getFullYear();
        const feriados = await this.obterFeriados(ano);
        const dataFormatada = new Date(data).toISOString().split("T")[0];
        return feriados.find(f => f.date === dataFormatada) || null;
    }
};

export default FeriadoAPI;
