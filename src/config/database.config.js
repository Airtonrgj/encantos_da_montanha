/* crio as chaves aqui, assim não preciso ficar criando, posso apenas chamar elas aqui através de um 
import DATABASE_CONFIG from "../../config/database.config.js"
localStorage.getItem(DATABASE_CONFIG.chaves.reservas) */
const DATABASE_CONFIG = {
    chaves: {
        experiencias: "experiencias",
        reservas: "reservas",
        suites:  "suites"
    },
    versao: 1
}

export default DATABASE_CONFIG