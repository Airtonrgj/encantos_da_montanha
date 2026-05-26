import ReservaController from "../controllers/ReservaController.js";
import ClimaController from "../controllers/ClimaController.js";
import Email from "../../domain/valueObjects/Email.js";
import Telefone from "../../domain/valueObjects/Telefone.js";
import CPF from "../../domain/valueObjects/CPF.js";
import Nome from "../../domain/valueObjects/Nome.js";
import CidadeUF from "../../domain/valueObjects/CidadeUF.js";

const state = {
    step: 1,
    disponibilidade: null,
    hospedes: [],
    pagamento: "pix"
};

// ---------- Navegação entre passos ----------
function irPara(step) {
    state.step = step;

    document.querySelectorAll(".res-step-panel").forEach(p => {
        p.classList.toggle("active", Number(p.dataset.panel) === step);
    });

    document.querySelectorAll(".step").forEach(s => {
        const n = Number(s.dataset.step);
        s.classList.toggle("active", n === step);
        s.classList.toggle("done", n < step);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarMensagem(texto, tipo = "error") {
    const container = document.getElementById("res-message-container");
    container.innerHTML = `<div class="res-message ${tipo}">${texto}</div>`;
    setTimeout(() => { container.innerHTML = ""; }, 5000);
}

// ---------- Passo 1: Disponibilidade ----------
function inicializarPasso1() {
    const hoje = new Date().toISOString().split("T")[0];
    document.getElementById("checkin").min = hoje;
    document.getElementById("checkout").min = hoje;

    // Verifica feriado quando muda data de check-in (uso da FeriadoAPI)
    document.getElementById("checkin").addEventListener("change", verificarFeriado);
}

async function verificarFeriado() {
    const checkin = document.getElementById("checkin").value;
    const hint = document.getElementById("feriado-hint");
    if (!checkin) { hint.textContent = ""; return; }

    try {
        const resultado = await ClimaController.verificarFeriadoNaData(checkin);
        if (resultado.sucesso && resultado.feriado) {
            hint.textContent = `⚠ ${checkin} é feriado nacional: ${resultado.feriado.name}. Demanda costuma ser maior.`;
            hint.style.color = "#a06028";
        } else {
            hint.textContent = "";
        }
    } catch {
        hint.textContent = "";
    }
}

function lerPasso1() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const adultos = Number(document.getElementById("adultos").value);
    const quartos = Number(document.getElementById("quartos").value);
    const suiteSel = document.getElementById("suite").value;

    if (!checkin || !checkout || !adultos || !quartos) {
        mostrarMensagem("Preencha todos os campos obrigatórios.");
        return null;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        mostrarMensagem("A data de check-out deve ser posterior ao check-in.");
        return null;
    }

    if (!suiteSel) {
        mostrarMensagem("Selecione uma suíte.");
        return null;
    }

    // value = "id|Nome|Preco"
    const [idStr, suiteNome, precoStr] = suiteSel.split("|");
    const idSuite = Number(idStr);
    const suitePreco = Number(precoStr);

    return { checkin, checkout, adultos, quartos, idSuite, suiteNome, suitePreco };
}

// ---------- Passo 2: Dados dos hóspedes ----------
function renderizarPasso2() {
    const container = document.getElementById("quartos-container");
    const totalQuartos = state.disponibilidade.quartos;
    const ordinais = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto", "Sexto"];

    let html = "";
    for (let i = 0; i < totalQuartos; i++) {
        html += `
            <h3>${ordinais[i] || (i+1) + "º"} Quarto</h3>
            <div class="form-grid">
                <div class="form-field">
                    <label>Nome Completo <span class="req">*</span></label>
                    <input type="text" data-quarto="${i}" data-campo="nome" placeholder="Nome completo do hóspede" required>
                </div>
                <div class="form-field">
                    <label>Email <span class="req">*</span></label>
                    <input type="email" data-quarto="${i}" data-campo="email" placeholder="email@exemplo.com" required>
                </div>
                <div class="form-field">
                    <label>Contato <span class="req">*</span></label>
                    <input type="tel" data-quarto="${i}" data-campo="telefone" placeholder="(00) 00000-0000" maxlength="15" required>
                </div>
                <div class="form-field">
                    <label>Contato Opcional</label>
                    <input type="tel" data-quarto="${i}" data-campo="telefone2" placeholder="(00) 00000-0000" maxlength="15">
                </div>
                <div class="form-field">
                    <label>CPF <span class="req">*</span></label>
                    <input type="text" data-quarto="${i}" data-campo="cpf" placeholder="000.000.000-00" maxlength="14" required>
                </div>
                <div class="form-field">
                    <label>Cidade / Estado <span class="req">*</span></label>
                    <input type="text" data-quarto="${i}" data-campo="cidade" placeholder="Cidade / UF" required>
                </div>
                <div class="form-field full">
                    <label>Observações (Opcional)</label>
                    <textarea data-quarto="${i}" data-campo="obs" placeholder="Ex: Alergia a castanhas..."></textarea>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
    aplicarMascaras(container);
}

// formata enquanto digita
function mascaraCPF(valor) {
    const d = valor.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
    return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
}

function mascaraTelefone(valor) {
    const d = valor.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

function aplicarMascaras(container) {
    container.querySelectorAll('[data-campo="cpf"]').forEach(el => {
        el.addEventListener("input", () => { el.value = mascaraCPF(el.value); });
    });
    container.querySelectorAll('[data-campo="telefone"], [data-campo="telefone2"]').forEach(el => {
        el.addEventListener("input", () => { el.value = mascaraTelefone(el.value); });
    });
}

function lerPasso2() {
    const totalQuartos = state.disponibilidade.quartos;
    const hospedes = [];
    for (let i = 0; i < totalQuartos; i++) {
        const dados = {};
        document.querySelectorAll(`[data-quarto="${i}"]`).forEach(el => {
            dados[el.dataset.campo] = el.value.trim();
        });

        if (!dados.nome || !dados.email || !dados.telefone || !dados.cpf || !dados.cidade) {
            mostrarMensagem(`Preencha os campos obrigatórios do quarto ${i + 1}.`);
            return null;
        }

        // valida usando os VOs do dominio
        try {
            dados.nome = new Nome(dados.nome).valor;
            dados.email = new Email(dados.email).valor;
            const tel = new Telefone(dados.telefone);
            dados.telefone = tel.valor;
            dados.telefoneFormatado = tel.formatado;
            const cpf = new CPF(dados.cpf);
            dados.cpf = cpf.valor;
            dados.cpfFormatado = cpf.formatado;
            if (dados.telefone2) {
                dados.telefone2 = new Telefone(dados.telefone2).valor;
            }
            dados.cidade = new CidadeUF(dados.cidade).valor;
        } catch (e) {
            mostrarMensagem(`Quarto ${i + 1}: ${e.message}`);
            return null;
        }

        hospedes.push(dados);
    }
    return hospedes;
}

// ---------- Passo 3: Resumo + pagamento ----------
function renderizarPasso3() {
    const { checkin, checkout, adultos, quartos, suiteNome, suitePreco } = state.disponibilidade;
    const noites = Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000));
    const total = noites * quartos * suitePreco;

    document.getElementById("sum-suite").textContent = suiteNome;
    document.getElementById("sum-hospedes").textContent = adultos;
    document.getElementById("sum-quartos").textContent = quartos;
    document.getElementById("sum-checkin").textContent = formatarData(checkin);
    document.getElementById("sum-checkout").textContent = formatarData(checkout);
    document.getElementById("sum-noites").textContent = `${noites} noite${noites > 1 ? "s" : ""}`;
    document.getElementById("sum-total").textContent = formatarMoeda(total);

    state.disponibilidade.noites = noites;
    state.disponibilidade.total = total;
}

function formatarData(iso) {
    const [a, m, d] = iso.split("-");
    return `${d}/${m}/${a}`;
}

function formatarMoeda(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function inicializarPagamento() {
    document.querySelectorAll("#pay-options .pay-option").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll("#pay-options .pay-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            state.pagamento = opt.querySelector("input").value;
        });
    });
}

// ---------- Passo 4: Confirmação (chama ReservaController) ----------
function confirmarReserva() {
    const principal = state.hospedes[0];
    const dados = {
        nomeHospede: principal.nome,
        email: principal.email,
        telefone: principal.telefone,
        idSuite: state.disponibilidade.idSuite,
        dataEntrada: state.disponibilidade.checkin,
        dataSaida: state.disponibilidade.checkout
    };

    // garante que a suite escolhida exista no localStorage (pra o dominio aceitar)
    garantirSuiteMock();

    const resultado = ReservaController.criar(dados);
    if (!resultado.sucesso) {
        mostrarMensagem(resultado.erro || "Erro ao confirmar reserva.");
        return;
    }

    document.getElementById("confirm-code").textContent = `Código: #${resultado.dados.id}`;
    irPara(4);
}

function garantirSuiteMock() {
    const { idSuite, suiteNome, suitePreco } = state.disponibilidade;
    const lista = JSON.parse(localStorage.getItem("suites") || "[]");
    if (!lista.find(s => s.id === idSuite)) {
        lista.push({
            id: idSuite,
            nome: suiteNome,
            descricao: "Suíte selecionada via fluxo de reserva",
            comodidades: [],
            precoPorNoite: suitePreco,
            fotos: [],
            disponivel: true
        });
        localStorage.setItem("suites", JSON.stringify(lista));
    }
}

// ---------- Listeners de botões ----------
function inicializarBotoes() {
    document.querySelector('[data-action="next-1"]').addEventListener("click", () => {
        const dados = lerPasso1();
        if (!dados) return;
        state.disponibilidade = dados;
        renderizarPasso2();
        irPara(2);
    });

    document.querySelector('[data-action="back-2"]').addEventListener("click", () => irPara(1));

    document.querySelector('[data-action="next-2"]').addEventListener("click", () => {
        const hospedes = lerPasso2();
        if (!hospedes) return;
        state.hospedes = hospedes;
        renderizarPasso3();
        irPara(3);
    });

    document.querySelector('[data-action="back-3"]').addEventListener("click", () => irPara(2));

    document.querySelector('[data-action="confirm"]').addEventListener("click", confirmarReserva);
}

// ---------- Bootstrap ----------
inicializarPasso1();
inicializarBotoes();
inicializarPagamento();
