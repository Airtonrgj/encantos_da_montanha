# Pousada Encantos da Montanha

Projeto desenvolvido para a disciplina de **Desenvolvimento Web**, com foco na criação de um site moderno, responsivo e elegante para a pousada fictícia *Encantos da Montanha*.

O objetivo do projeto foi desenvolver uma experiência visual aconchegante e intuitiva, permitindo que os usuários conheçam a pousada, explorem experiências turísticas da região e realizem reservas de suítes.


## Integrantes

* Airton
* Marina
* Gabriel
* Maria Clara
* Luna

## Como as tarefas foram atribuidas?

O projeto foi organizado com uma divisão rigorosa de responsabilidades para manter a integridade da arquitetura:

* **Airton (Backend & Modelagem)**: Responsável pela criação do banco de dados, modelagem de entidades (`Cliente`, `Experiencia`, `Reserva`, `Suite`) e implementação da lógica de persistência e repositórios.
* **Marina (Lógica de Negócio)**: Responsável pela implementação dos serviços de domínio, criação dos casos de uso principais (`useCases`) e desenvolvimento dos controllers que conectam o frontend ao backend.
* **Gabriel (APIs & Integrações)**: Focado na implementação de chamadas às APIs externas de clima e feriados (Brasil API), tratando erros e processando os dados para o sistema.
* **Luna (Design & UI/UX)**: Responsável pela identidade visual completa, definição de estilos elegantes para as suítes e garantia da responsividade em todos os dispositivos.
* **Maria Clara (Frontend & Estrutura)**: Responsável pela conversão dos designs em HTML semântico, criando as páginas de visualização e implementando componentes como o Widget de Clima e Galeria.


## Navegação pelo site

A jornada do usuário foi projetada para ser intuitiva e dividida em etapas claras, conforme o fluxo de telas do sistema:

1.  **Landing Page (Início)**: O usuário é introduzido ao conceito da pousada com uma visão geral e destaques visuais.
2.  **Exploração de Suítes**: Uma página dedicada para conhecer as acomodações e detalhes específicos de cada quarto.
3.  **Experiências Locais**: Espaço para visualizar as atividades turísticas e lazer oferecidos na região.
4.  **Sistema de Reservas**: Fluxo lógico dividido em:
    * **Seleção**: Escolha da suíte e período da estadia.
    * **Cadastro**: Preenchimento dos dados do hóspede.
    * **Pagamento e Confirmação**: Etapas finais para a conclusão do agendamento.


## Funcionalidades

*   **Landing page** moderna e responsiva.
*   **Página de acomodações/suítes** detalhada.
*   **Página de experiências** da região (turismo local).
*   **Sistema de reservas** funcional.
*   **Exibição de suítes** disponíveis.
*   **Integração com API** de clima/previsão do tempo.
*   **Galeria de imagens** da pousada.
*   **Layout Adaptativo** para dispositivos móveis.


## O que utilizamos?

* Desing: Figma.
* Frontend: HTML5, CSS3, JavaScript (ES6+).
* Integração: Fetch API para consumo de dados climáticos.
* Versionamento: Git e GitHub.


## Estrutura do Código

```text
src/
 ┣ 📂 application/      # Casos de uso (Clima, Reserva, Suíte)
 ┣ 📂 domain/           # Entidades de negócio e objetos de valor
 ┣ 📂 infrastructure/   # Implementações externas (API, Banco de Dados, Storage)
 ┣ 📂 presentation/     # Camada visual (Componentes, Controllers, Views, Styles)
 ┣ 📂 main/             # Ponto de entrada da aplicação
 ┗ 📂 testes/           # Testes unitários e de integração
