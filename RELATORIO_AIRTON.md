# Relatório de Pendências — Parte do Airton

**Projeto:** Pousada Encantos da Montanha
**Aluno:** Airton
**Função no time:** Criação do Banco de Dados, Modelagem e Backend
**Data do relatório:** 2026-05-04

---

## 1. Escopo oficial do Airton (extraído do relatório de divisão)

| Pasta / Arquivo | Responsabilidade |
|---|---|
| `src/domain/entities/` | Classes `Cliente`, `Experiencia`, `Reserva`, `Suite` |
| `src/domain/valueObjects/` | Objeto `Periodo` |
| `src/infrastructure/database/` | Todos os Repositories |
| `src/main/app.js` | Configuração inicial da aplicação |
| `src/config/` | Compartilhado com Gabriel |

**NUNCA MEXER:** views, components, styles (frontend dos outros).

**Comunicação obrigatória:** antes de mudar `src/domain/entities/` ou `src/config/`, avisar Marina e Gabriel — eles dependem dessas peças.

---

## 2. Mapa de status atual (o que já foi feito × o que falta)

### 2.1 `src/domain/entities/`

| Arquivo | Existe? | Funciona? | Exporta? | Observações |
|---|---|---|---|---|
| `Cliente.js` | Sim | Parcial | **NÃO** | Tem `nome`, `email`, `telefone`. Falta `export default Cliente`. |
| `Suite.js` | Sim | Parcial | **NÃO** | Atributos `id`, `nome`, `descricao`, `fotos`, `comodidades`, `precoDiaria` ok. Falta `export default Suite`. |
| `Reserva.js` | Sim | Quase | Sim | Tem métodos `calcularNoites`, `calcularPreco`, `reservar`, `cancelar`. Bug: o parâmetro `status` do construtor é **ignorado** — sempre vira `"pendente"`. |
| `Experiencia.js` | Sim | **NÃO** | **NÃO** | Bugs: nome da classe está minúsculo (`experiencia`), o construtor recebe `tempo` mas **não atribui** `this.tempo`, e `vestuario_indicado` está fora de ordem. Falta export. |

### 2.2 `src/domain/valueObjects/`

| Arquivo | Status |
|---|---|
| `Periodo.js` | OK. Valida `checkin > checkout`, exporta `default`. |
| `Email.js` | Existe mas vazio (não está no escopo do Airton segundo o PDF, mas existe na pasta). |
| `Telefone.js` | Existe mas vazio (idem). |

> Decida com a equipe se `Email` e `Telefone` viram value objects (recomendado para validar formato) ou se ficam como strings dentro de `Cliente`.

### 2.3 `src/infrastructure/database/` — **CRÍTICO, TUDO VAZIO**

| Arquivo | Status |
|---|---|
| `ClienteRepository.js` | **VAZIO** |
| `ExperienciaRepository.js` | **VAZIO** |
| `ReservaRepository.js` | **VAZIO** |
| `SuiteRepository.js` | **VAZIO** |

> A Marina já fez a camada `src/infrastructure/storage/` (reservaStorage, suiteStorage, experienciaStorage) que conversa direto com `localStorage`. Os **Repositories do Airton precisam usar essa camada por baixo** e devolver **instâncias das entidades** (não objetos crus), porque os `useCases` e `controllers` esperam objetos com métodos (ex: `reserva.calcularPreco()`).

### 2.4 `src/main/app.js`

**VAZIO.** Deveria ser o ponto de partida da aplicação:
- Inicializar repositórios
- Popular o sistema com as **6 suítes temáticas** que a cliente Vera Regina pediu no PDF
- Disponibilizar instâncias para o resto do sistema

### 2.5 `src/config/`

| Arquivo | Status |
|---|---|
| `api.config.js` | VAZIO (compartilhado com Gabriel — URLs das APIs externas) |
| `database.config.js` | VAZIO (chaves de `localStorage`, prefixos, versão do schema) |

---

## 3. O que o cliente (Vera Regina) exige no PDF e como afeta o Airton

Recortes do PDF que **dependem direta ou indiretamente da camada de dados**:

1. **6 suítes temáticas** com nome, descrição poética, fotos, comodidades, preço da diária.
   → Airton precisa garantir que `Suite` modele todos esses campos e que `app.js` faça o seed das 6 suítes.
2. **Reserva manual:** cliente preenche nome/e-mail/telefone/datas, dados ficam salvos para conferência.
   → `ReservaRepository` precisa salvar de forma persistente e listar para conferência.
3. **Disponibilidade de suítes em datas específicas (mesmo simulada).**
   → O `ReservaRepository` precisa permitir consulta por suíte + período, para a Marina conseguir implementar `BuscarSuitesDisponiveis`.
4. **Galeria e Experiências:** entidade `Experiencia` precisa estar funcional para a página de experiências.
5. **API de clima OU feriados:** Gabriel cuida, mas o Airton precisa deixar `api.config.js` pronto para receber as configurações.

---

## 4. Ordem recomendada de execução (dependências)

Dependências entre tarefas (de baixo para cima):

```
6. main/app.js (seed + bootstrap)
       ↑
5. Repositories (Cliente, Suite, Experiencia, Reserva)
       ↑
4. config/database.config.js (chaves + versão)
       ↑
3. Correções nas entidades (exports + bugs)
       ↑
2. Conferência da entidade Experiencia (bugs claros)
       ↑
1. Conferência rápida com Marina sobre o "contrato" do Repository
   (que métodos os useCases dela esperam)
```

**Por que essa ordem:** se você fizer o `app.js` antes de corrigir as entidades, vai bater no bug do `export`. Se fizer os Repositories antes de alinhar com a Marina, pode entregar uma interface que ela vai precisar refazer.

---

## 5. Riscos e armadilhas (o que pode dar errado)

### 5.1 Reidratação de objetos
`localStorage` só guarda strings (JSON). Quando você lê de volta, `JSON.parse` devolve **objetos crus** — não instâncias da classe. Então `suite.calcularAlgumaCoisa()` quebra.
→ **Você precisa "reidratar":** transformar o objeto cru em instância da classe ao ler do storage. Pesquise por **"hydration / rehydration pattern JavaScript"**.

### 5.2 Datas viram string
`Date` no JSON vira `"2026-05-10T15:00:00.000Z"`. Ao ler, é uma string. Se o código fizer `data.getTime()`, quebra.
→ Tem que reconverter com `new Date(...)` no momento da reidratação.

### 5.3 `localStorage` não existe em Node.js
Os arquivos de teste em `src/testes/` rodam em Node. Se você importar um Repository que usa `localStorage` direto, quebra.
→ Soluções possíveis: rodar testes só com entidades (sem repository), ou criar um stub de `localStorage` para testes, ou separar bem as camadas. Decida cedo.

### 5.4 IDs duplicados
Se usar `Date.now()` como ID e criar duas reservas no mesmo milissegundo, colide.
→ Pesquise sobre `crypto.randomUUID()` (existe em Node moderno e nos navegadores).

### 5.5 Acoplamento com a Marina
A Marina já fez `src/infrastructure/storage/` com funções soltas (`salvarReserva`, `listarReservas`...). Existe risco de duplicar código se você não usar essas funções por baixo dos seus Repositories.
→ Combine com ela: o Repository **chama** o storage. O storage não some. O Repository é a "fachada orientada a objetos" do storage.

### 5.6 Bugs nas entidades quebram em silêncio
O `Experiencia` está com a classe minúscula. Se algum colega fizer `new Experiencia(...)` vai dar `ReferenceError`. Hoje ninguém detecta porque ninguém usa ainda. Quando a Marina/Maria Clara forem usar, vai falhar e o dedo vai apontar pra você.
→ Corrija logo, e teste com um arquivo simples em `src/testes/`.

### 5.7 Esquecer o `export default`
JavaScript não reclama na definição da classe — só na hora de **importar**. O erro só aparece em outro arquivo, em outro contexto, talvez muito depois.
→ Faça uma varredura rápida: cada arquivo de entidade deve terminar com `export default Nome`.

### 5.8 Schema mudando depois que tem dado salvo
Se você adicionar um campo novo em `Suite` depois que a Vera Regina (ou quem testar) já cadastrou suítes, os dados antigos no localStorage não terão esse campo.
→ Pense em colocar uma `versão` no `database.config.js`, e em alguma estratégia simples de migração ou reset. Não precisa ser sofisticado, só **previsível**.

---

## 6. Critérios de "pronto" (definition of done)

A parte do Airton está pronta quando:

- [ ] Todas as entidades exportam com `export default` e podem ser importadas sem erro
- [ ] `Experiencia.js` tem o nome certo da classe e atribui todos os parâmetros do construtor
- [ ] Os 4 Repositories existem, têm pelo menos `salvar`, `listar`, `buscarPorId`, `atualizar`, `deletar`, e devolvem **instâncias de classe**
- [ ] `app.js` roda sem erros e popula 6 suítes na primeira execução
- [ ] `database.config.js` tem as chaves do localStorage centralizadas (ninguém usa string solta `"reservas"` espalhada pelo código)
- [ ] `api.config.js` foi alinhado com o Gabriel
- [ ] Existe um teste mínimo em `src/testes/` que cria, salva, lê e modifica uma entidade via Repository
- [ ] Marina conseguiu plugar os Repositories nos useCases dela sem precisar refatorar

---

## 7. Comunicação que o Airton precisa fazer ANTES de programar

1. **Marina:** "Que métodos seus useCases chamam nos meus Repositories? Você quer `repo.buscarPorId(id)` ou `repo.findById(id)`?" — isso evita retrabalho.
2. **Gabriel:** "Vou deixar `api.config.js` com a estrutura X. Você precisa de algum campo a mais?"
3. **Maria Clara:** confirmar quais campos da `Suite` ela vai exibir no HTML (pode ter campo que ninguém precisa).
