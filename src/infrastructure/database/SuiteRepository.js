import { buscarSuitePorId, deletarSuite, listarSuites,atualizarSuite, salvarSuite} from "../storage/suiteStorage.js";
import Suite from "../../domain/entities/Suite.js";

class SuiteRepository{
    listaDeSuites() {
        /* tudo que vem de dados do storege, vem pra ca cru para ser tratado */
        const dadosCrus = listarSuites()
        /* tratamento de dados  */
        const listaTratada = dadosCrus.map(dado => {
            return new Suite(dado.id, dado.nome, dado.descricao, dado.fotos, dado.comodidades, dado.precoDiaria)
        })

        return listaTratada

    }

    buscaPorId(id){

        const dado = buscarSuitePorId(id)
        const buscaReidratadaID = new Suite(dado.id, dado.nome, dado.descricao, dado.fotos, dado.comodidades, dado.precoDiaria)

        return buscaReidratadaID
    }

    /* essas não retornam nada, so salvam ou deletam então não precisão de reidratação */
    salvaSuite(suite){
        salvarSuite(suite)
    }

    atualizaSuite(suiteAtualizada){
        atualizarSuite(suiteAtualizada)
    }

    deletaSuite(id){
        deletarSuite(id)
    }

    
        
}



export default SuiteRepository