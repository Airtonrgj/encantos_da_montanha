const CHAVE = 'suites' //espaço no LocalStorage

function listarSuites(){
    const texto = localStorage.getItem(CHAVE)
    if (!texto) return [] //se estiver vazia
    return JSON.parse(texto) //converte texto para objeto
}

function salvarSuite(suite){
    const lista = listarSuites() //pega lista existente
    lista.push(suite) //adiciona suíte ao final
    const texto = JSON.stringify(lista) //converte objeto para texto
    localStorage.setItem(CHAVE, texto)
}

function buscarSuitePorId(id){
    const lista = listarSuites() //pega todas as suítes
    return lista.find(s => s.id === id) //procura e devolve
}

function atualizarSuite(suiteAtualizada) {
  const lista = listarSuites() // pega a lista existente
  const novaLista = lista.map(s => {              
    if (s.id === suiteAtualizada.id) // se achar
      return suiteAtualizada // retorna a versão nova
    return s //caso não ache, retorna a atual
  })
  localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva tudo
}

function deletarSuite(id) {
  const lista = listarSuites()                 // pega a lista atual
  const novaLista = lista.filter(s => s.id !== id) // remove a do id
  localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva sem ela
}

export { listarSuites, salvarSuite, buscarSuitePorId, atualizarSuite, deletarSuite }