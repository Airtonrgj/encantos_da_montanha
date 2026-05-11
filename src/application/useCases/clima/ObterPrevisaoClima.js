import ClimaAPI from "../../../infrastructure/api/ClimaAPI.js";

const DESCRICOES_CLIMA = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Neblina",
    48: "Neblina com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa intensa",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Pancadas de chuva leve",
    81: "Pancadas de chuva moderada",
    82: "Pancadas de chuva forte",
    95: "Tempestade",
    96: "Tempestade com granizo leve",
    99: "Tempestade com granizo forte"
};

async function ObterPrevisaoClima(dias = 7) {
    const dados = await ClimaAPI.obterPrevisao(dias);

    const previsao = dados.daily.time.map((data, i) => ({
        data,
        tempMax: dados.daily.temperature_2m_max[i],
        tempMin: dados.daily.temperature_2m_min[i],
        precipitacao: dados.daily.precipitation_sum[i],
        descricao: DESCRICOES_CLIMA[dados.daily.weathercode[i]] ?? "Condição desconhecida"
    }));

    return {
        climaAtual: {
            temperatura: dados.current_weather.temperature,
            velocidadeVento: dados.current_weather.windspeed,
            descricao: DESCRICOES_CLIMA[dados.current_weather.weathercode] ?? "Condição desconhecida"
        },
        previsao
    };
}

export default ObterPrevisaoClima;
