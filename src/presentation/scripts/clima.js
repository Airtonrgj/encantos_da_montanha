import ClimaController from "../controllers/ClimaController.js";

async function atualizarClimaNavbar() {
    const resultado = await ClimaController.exibirPrevisao(1);
    if (!resultado.sucesso) return;

    const { temperatura, descricao } = resultado.dados.climaAtual;
    const elemento = document.querySelector(".weather");
    if (elemento) {
        elemento.textContent = `${Math.round(temperatura)}°C • Serra das Veredas`;
        elemento.title = descricao;
    }
}

atualizarClimaNavbar();
