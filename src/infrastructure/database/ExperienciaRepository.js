import Experiencia from "../../domain/entities/Experiencia.js";
import { atualizarExperiencia, buscarExperienciaPorId, deletarExperiencia, listarExperiencias, salvarExperiencia } from "../storage/experienciaStorage.js";

class ExperienciaRepository{
    listaDeExperiencia(){

        const dadosCrus = listarExperiencias()

        const listaExpTratada = dadosCrus.map(dado => {
            return new Experiencia(dado.id, dado.nome, dado.tempo, dado.dificuldade, dado.horario, dado.vestuario_indicado)
        })

        return listaExpTratada
    }

    buscaExprPorId(id){
        const dado = buscarExperienciaPorId(id)
        const buscaPorIdExp = new Experiencia(dado.id, dado.nome, dado.tempo, dado.dificuldade, dado.horario, dado.vestuario_indicado)
        
        return buscaPorIdExp 
    }

    salvarExpr(experiencia){
        salvarExperiencia(experiencia)
    }

    atualizaExpr(experienciaAtualizada){
        atualizarExperiencia(experienciaAtualizada)
    }

    deletarExpr(id){
        deletarExperiencia(id)
    }
}


export default ExperienciaRepository