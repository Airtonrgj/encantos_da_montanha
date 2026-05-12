const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const LATITUDE = -15.1738;
const LONGITUDE = -45.6233;

const ClimaAPI = {
    async obterPrevisao(dias = 7) {
        const params = new URLSearchParams({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            current_weather: true,
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
            timezone: "America/Sao_Paulo",
            forecast_days: dias
        });

        const response = await fetch(`${BASE_URL}?${params}`);
        if (!response.ok) throw new Error(`Erro ao buscar clima: ${response.status}`);
        return response.json();
    },

    async obterClimaAtual() {
        const dados = await this.obterPrevisao(1);
        return dados.current_weather;
    }
};

export default ClimaAPI;
