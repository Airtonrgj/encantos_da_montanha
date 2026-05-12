/* deixo as configs das APIs externas tudo aqui centralizado, assim não preciso ficar
escrevendo URL e parâmetros espalhados pelo código, é só importar e chamar
import API_CONFIG from "../../config/api.config.js"
fetch(`${API_CONFIG.clima.baseUrl}?...`) */

const API_CONFIG = {
    /* API de clima, quem consome isso aqui é o ClimaAPI.js */
    clima: {
        baseUrl: "https://api.open-meteo.com/v1/forecast",
        /* coordenadas da serra das veredas, é a região da pousada */
        localizacao: {
            latitude: -15.1738,
            longitude: -45.6233,
            nome: "Serra das Veredas"
        },
        /* parâmetros padrão da requisição, assim não precisa ficar montando isso toda vez que chamar a API */
        /* botei a de SP mas da pra mudar, so fiquei com preguiça de lembrar a correta  */
        parametrosPadrao: {
            timezone: "America/Sao_Paulo",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
            current_weather: true
        },
        diasPrevisaoPadrao: 7 /* se ninguém passar quantos dias quer, ele puxa 7 por padrão */
    },

    /* API de feriados, quem consome isso aqui é o FeriadoAPI.js */
    feriados: {
        baseUrl: "https://brasilapi.com.br/api/feriados/v1"
    },

    /* coisas gerais que valem pras duas APIs, deixo aqui pra não repetir */
    geral: {
        timeoutMs: 8000,     /* tempo máximo que ele espera a resposta antes de desistir */
        tentativasMaximas: 2 /* quantas vezes ele tenta de novo se a API falhar */
    }
}


export default API_CONFIG
