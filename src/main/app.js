import Suite from "../domain/entities/Suite.js";
import SuiteRepository from "../infrastructure/database/SuiteRepository.js";

const suiteRepo = new SuiteRepository()

function iniciar(){
    const verificarDados = suiteRepo.listaDeSuites()

    if(verificarDados.length === 0){
        suiteRepo.salvaSuite(
            new Suite("1","Suíte Vento do Sul", "A lareira que aquece a noite e a varanda que revela o vale ao amanhecer. Para quem precisa lembrar o que é altitude.", ["assets/suite1.jpg"], ["Lareira", "Cama King", "Varanda", "Café Incluso"], 340)
        )
        suiteRepo.salvaSuite(
            new Suite("2","Suíte Serra Branca", "Pedras, madeiras e uma banheira de imersão com vista para o horizonte. O luxo que a montanha oferece.", ["assets/suite1.jpg"], ["Lareira", "Cama King", "Varanda", "Café Incluso"], 340)
        )
        suiteRepo.salvaSuite(
            new Suite("3", "Suíte Pedra Viva", "Paredes moldadas pela natureza. Área externa privativa e o som do cerrado como trilha sonora.", ["assets/suite3.jpg"], ["Pedra natural", "Área externa", "Dueto vila", "Café Incluso"], 310)
        )
        suiteRepo.salvaSuite(
            new Suite("4", "Suíte Lua Cheia", "Astronomia afetiva para se admirar. O céu do vão transforma cada noite num espetáculo particular.", ["assets/suite4.jpg"], ["Nau Vidro", "Varanda ampliada", "King size", "Café incluso"], 430)
        )
        suiteRepo.salvaSuite(
            new Suite("5", "Suíte Buritis", "Harmonia da demolição: tudo se apoia e uma trilha primitiva que começa na porta. Para os que procuram a naturalidade da verdade.", ["assets/suite5.jpg"], ["Hammock", "Trilha privativa", "Foal", "Café Incluso"], 195)
        )
        suiteRepo.salvaSuite(
            new Suite("6", "Suíte Candeleiro", "Décor vintage, berços feitos à luz de vela. Um ambiente que convida a esquecer as horas.", ["assets/suite6.jpg"], ["Lareira", "Vintage", "Jardim", "Café Incluso"], 390)
        )
        
    }
}

iniciar()

