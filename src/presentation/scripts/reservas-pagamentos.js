import Cliente from "../../domain/entities/Cliente.js";
import Suite from "../../domain/entities/Suite.js";
import Reservas from "../../domain/entities/Reserva.js";
import PeriodoStadia from "../../domain/valueObjects/Periodo.js";
import ReservaRepository from "../../infrastructure/database/ReservaRepository.js";

const reservaRepo = new ReservaRepository()

// ── Preencher resumo com dados do sessionStorage ──
function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const suitePreco = parseFloat(sessionStorage.getItem('reserva_suite_preco') || '0');
const noites     = parseInt(sessionStorage.getItem('reserva_noites') || '0');
const quartos    = parseInt(sessionStorage.getItem('reserva_quartos') || '1');
const adultos    = parseInt(sessionStorage.getItem('reserva_adultos') || '2');
const total      = suitePreco * noites * quartos;

document.getElementById('resumo-suite').textContent    = sessionStorage.getItem('reserva_suite_nome') || 'Nome da Suíte Escolhida';
document.getElementById('resumo-hospedes').textContent = adultos;
document.getElementById('resumo-quartos').textContent  = quartos;
document.getElementById('resumo-checkin').textContent  = formatDate(sessionStorage.getItem('reserva_checkin'));
document.getElementById('resumo-checkout').textContent = formatDate(sessionStorage.getItem('reserva_checkout'));
document.getElementById('resumo-total').textContent    = total > 0
  ? `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  : 'R$ 2.160,00';

// ── Seleção de forma de pagamento ──
let metodoSelecionado = 'pix';

document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(o => {
      o.classList.remove('selected');
      o.setAttribute('aria-checked', 'false');
    });
    opt.classList.add('selected');
    opt.setAttribute('aria-checked', 'true');
    metodoSelecionado = opt.dataset.method;
  });
  opt.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
  });
});

// monta a reserva de verdade (entidades + repository) e salva no localStorage
function persistirReserva(numero) {
  const checkin  = sessionStorage.getItem('reserva_checkin');
  const checkout = sessionStorage.getItem('reserva_checkout');
  if (!checkin || !checkout) return;

  // cliente vem do que foi preenchido no cadastro
  const cliente = new Cliente(
    sessionStorage.getItem('reserva_hospede_nome'),
    sessionStorage.getItem('reserva_hospede_email'),
    sessionStorage.getItem('reserva_hospede_contato')
  );

  // suite com o que a tela de seleção guardou (preço é o que importa pro cálculo)
  const suite = new Suite(
    sessionStorage.getItem('reserva_suite_id'),
    sessionStorage.getItem('reserva_suite_nome'),
    '',
    [],
    [],
    suitePreco
  );

  const periodo = new PeriodoStadia(checkin, checkout);

  const reserva = new Reservas(numero, cliente, suite, periodo);
  reserva.reservar(); // status passa de "pendente" pra "reservado"
  reservaRepo.salvarReservas(reserva);
}

// ── Navegação ──
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.location.href = 'reservas-cadastro.html';
});

document.getElementById('btn-confirmar').addEventListener('click', () => {
  const checkin  = sessionStorage.getItem('reserva_checkin');
  const checkout = sessionStorage.getItem('reserva_checkout');
  const suiteId  = sessionStorage.getItem('reserva_suite_id');

  // trava final contra reserva dupla: se a suite já foi reservada nessas datas, não deixa concluir
  try {
    if (checkin && checkout && suiteId) {
      const periodo = new PeriodoStadia(checkin, checkout);
      if (reservaRepo.temReservaNoPeriodo(suiteId, periodo)) {
        alert('Essa suíte já está reservada para essas datas. Volte e escolha outra suíte ou outro período.');
        return;
      }
    }
  } catch (erro) {
    console.error('Erro ao checar disponibilidade:', erro);
  }

  sessionStorage.setItem('reserva_metodo_pagamento', metodoSelecionado);
  // Gera número de reserva fictício
  const numero = '#ENV-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
  sessionStorage.setItem('reserva_numero', numero);

  // grava a reserva pela camada de dados; se algo falhar não trava a navegação
  try {
    persistirReserva(numero);
  } catch (erro) {
    console.error('Não foi possível salvar a reserva:', erro);
  }

  window.location.href = 'reservas.confirmacao.html';
});
