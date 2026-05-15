import { cadastrarExperiencia } from "../../../domain/services/experienciaService.js";

function execute(dados) {
    const experiencia = cadastrarExperiencia(dados);
    if (!experiencia) return null;
    return experiencia;
}

export { execute };
