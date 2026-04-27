const CHAVE = 'reservas' //espaço no LocalStorage

function listarReservas(){
    const texto = localStorage.getItem(CHAVE)
    if (!texto) return []
    return JSON.parse(texto)
}

function salvarReserva(reserva){
    const lista = listarReservas() //pega reservas existentes
    lista.push(reserva)
    const texto =  JSON.stringify(lista) //converte objeto para texto
    localStorage.setItem(CHAVE, texto)
}

function buscarReservaPorId(id){
    const lista = listarReservas() //pega todas as reservas
    return lista.find(s => s.id === id) //procura e devolve
}


function atualizarReserva(reservaAtualizada){
    const lista = listarReservas() // pega a lista existente
      const novaLista = lista.map(s => {              
        if (s.id === reservaAtualizada.id) // se achar
          return reservaAtualizada // retorna a versão nova
        return s //caso não ache, retorna a atual
      })
      localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva tudo
}

function deletarReserva(id) {
  const lista = listarReservas()                 // pega a lista atual
  const novaLista = lista.filter(s => s.id !== id) // remove a do id
  localStorage.setItem(CHAVE, JSON.stringify(novaLista)) // salva sem ela
}

export { listarReservas, salvarReserva, buscarReservaPorId, atualizarReserva, deletarReserva }


