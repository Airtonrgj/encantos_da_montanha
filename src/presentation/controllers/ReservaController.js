import { execute as criarReservaUC } from "../../application/useCases/reserva/CriarReserva.js";
import { execute as cancelarReservaUC } from "../../application/useCases/reserva/CancelarReserva.js";
import { obterTodasReservas, obterReservaPorId, confirmarReserva } from "../../domain/services/reservaService.js";

const ReservaController = {
    criar(dados) {
        try {
            const reserva = criarReservaUC(dados);
            if (!reserva) return { sucesso: false, erro: "Não foi possível criar a reserva. Verifique os dados e a disponibilidade da suíte." };
            return { sucesso: true, dados: reserva };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    cancelar(id) {
        try {
            cancelarReservaUC(id);
            return { sucesso: true };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    confirmar(id) {
        try {
            const reserva = confirmarReserva(id);
            if (!reserva) return { sucesso: false, erro: "Reserva não encontrada" };
            return { sucesso: true, dados: reserva };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    listarTodas() {
        try {
            return { sucesso: true, dados: obterTodasReservas() };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    },

    obterPorId(id) {
        try {
            const reserva = obterReservaPorId(id);
            if (!reserva) return { sucesso: false, erro: "Reserva não encontrada" };
            return { sucesso: true, dados: reserva };
        } catch (erro) {
            return { sucesso: false, erro: erro.message };
        }
    }
};

export default ReservaController;
