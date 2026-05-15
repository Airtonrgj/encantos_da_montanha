import { obterTodasSuites } from "../../../domain/services/suiteService.js";

function execute() {
    const suites = obterTodasSuites();
    if (!suites) return [];
    return suites.filter(s => s.disponivel);
}

export { execute };
