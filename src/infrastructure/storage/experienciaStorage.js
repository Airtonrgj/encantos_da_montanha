const = CHAVE = 'experiencias'

function listarExperiencias(){
    const texto = localStorage.getItem(CHAVE)
    if (!texto) return []
    return JSON.parse(texto)
}

function salvarExperiencia(experiencia){
    const lista = listarExperiencias()
    lista.push(experiencia)
    const texto = JSON.stringify(lista)
    localStorage.setItem(CHAVE, texto)
}

function buscarExperienciaPorId(id){
    const lista = listarExperiencias() //pega todas as experiências
    return lista.find(e => e.id === id)  //procura e devolve
}


function atualizarExperiencia(experienciaAtualizada){
    const lista = listarExperiencias() // pega a lista existente
    const novaLista = lista.map(e => {              
    if (e.id === experienciaAtualizada.id) // se achar
      return experienciaAtualizada // retorna a versão nova
    return e //caso não ache, retorna a atual
  })
  localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva tudo
}

function deletarExperiencia(id){
    const lista = listarExperiencias()                 // pega a lista atual
      const novaLista = lista.filter(e => e.id !== id) // remove a do id
      localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva sem ela
}

export { listarExperiencias, salvarExperiencia, buscarExperienciaPorId, atualizarExperiencia, deletarExperiencia }