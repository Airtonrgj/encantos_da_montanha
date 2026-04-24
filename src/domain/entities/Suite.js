/* declarando class Suite junto de seus atributos  */
class Suite{
    constructor(id, nome, descricao, fotos = [], comodidades = [], precoDiaria){
        
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.precoDiaria = precoDiaria
        this.fotos = fotos /* urls das fotos vem aqui, ta em formato de array pra ficar mais fácil um carrossel por exemplo  */
        this.comodidades = comodidades /* não achei palavra melhor, é basicamente um array de elementos que tem no quarto tipo, hidro, cama de casal, cama de solteiro, etc... */
    }
}