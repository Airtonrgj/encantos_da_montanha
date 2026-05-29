import PeriodoStadia from "../../domain/valueObjects/Periodo.js";
import ReservaRepository from "../../infrastructure/database/ReservaRepository.js";

const reservaRepo = new ReservaRepository()

// ── Spinbox ──
document.querySelectorAll('.spinbox-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 99;
    let val = parseInt(input.value) || 1;
    if (btn.dataset.action === 'inc' && val < max) input.value = val + 1;
    if (btn.dataset.action === 'dec' && val > min) input.value = val - 1;
  });
});

// ── Verificar disponibilidade ──
const form = document.getElementById('form-disponibilidade');
const resultado = document.getElementById('resultado');
const btnAvancar = document.getElementById('btn-avancar');

form.addEventListener('submit', e => {
  e.preventDefault();
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  if (!checkin || !checkout) {
    alert('Por favor, informe as datas de check-in e check-out.');
    return;
  }
  if (new Date(checkout) <= new Date(checkin)) {
    alert('A data de check-out deve ser posterior ao check-in.');
    return;
  }
  // Salvar datas no sessionStorage para uso nas próximas etapas
  const noites = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
  sessionStorage.setItem('reserva_checkin',  checkin);
  sessionStorage.setItem('reserva_checkout', checkout);
  sessionStorage.setItem('reserva_noites',   noites);
  sessionStorage.setItem('reserva_adultos',  document.getElementById('adultos').value);
  sessionStorage.setItem('reserva_quartos',  document.getElementById('quartos').value);

  resultado.classList.add('visible');
  resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ── Seleção de suíte ──
document.querySelectorAll('.suite-option').forEach(opt => {
  opt.addEventListener('click', () => {
    // antes de selecionar, confere se essa suite já está reservada nas datas escolhidas
    const checkin  = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    if (checkin && checkout) {
      try {
        const periodo = new PeriodoStadia(checkin, checkout);
        if (reservaRepo.temReservaNoPeriodo(opt.dataset.id, periodo)) {
          alert(`A ${opt.dataset.nome} já está reservada para essas datas. Escolha outra suíte ou outro período.`);
          return;
        }
      } catch (erro) {
        // datas inválidas não travam a seleção; a validação real acontece no "Verificar"
      }
    }

    document.querySelectorAll('.suite-option').forEach(o => {
      o.classList.remove('selected');
      o.setAttribute('aria-pressed', 'false');
    });
    opt.classList.add('selected');
    opt.setAttribute('aria-pressed', 'true');
    sessionStorage.setItem('reserva_suite_id',    opt.dataset.id);
    sessionStorage.setItem('reserva_suite_nome',  opt.dataset.nome);
    sessionStorage.setItem('reserva_suite_preco', opt.dataset.preco);
    btnAvancar.disabled = false;
    btnAvancar.textContent = `Reservar ${opt.dataset.nome}`;
  });
  // Acessibilidade teclado
  opt.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
  });
});

// ── Avançar para cadastro ──
btnAvancar.addEventListener('click', () => {
  window.location.href = 'reservas-cadastro.html';
});
