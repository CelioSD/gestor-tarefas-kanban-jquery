## Gestor de Tarefas Kanban — jQuery
Aplicação web de gestão de tarefas desenvolvida com HTML, CSS, JavaScript e jQuery. 
O projeto utiliza uma interface Kanban para organizar tarefas de acordo com o seu estado e facilitar o acompanhamento do trabalho.

As tarefas são guardadas no armazenamento local do navegador, permitindo manter os dados entre sessões no mesmo navegador.

## Tecnologias utilizadas
-HMTL: Estrutura da aplicação.
-CSS3: Estilos e organização visual da interface.
-JavaScript - lógica e funcionalidades da aplicação.
-JQuery: Manipulação do DOM e gestão de eventos.
-JQuery UI: funcionalidade de arrastar e largar tarefas ent6re colunas
-LocalStorage: Armazenamento das tarefas no navegador.

## Funcionalidas
Criação de tarefas com título, descrição, prioridade e estado.
Edição das informações das tarefas.
Eliminação de tarefas.
Organização das tarefas num quadro Kanban com três estados:
-Por Fazer
-Em Progresso
-Concluídas
Alteração do estado através da movimentação de cartões entre colunas.
Atualização do estado da tarefa após a movimentação.
Validação dos campos do formulário.
Armazenamento das tarefas no localStorage.
Interface organizada para acompanhar o progresso das tarefas.

## Pré-requisitos
Um navegador web atualizado.
Um editor de código, como o Visual Studio Code, caso pretendas consultar ou modificar o projeto.

Não é necessário instalar dependências com npm para executar a versão baseada em ficheiros estáticos, desde que as bibliotecas utilizadas estejam acessíveis.


## Como executar
1- Clona o repositório
git clone

2- Entra na pasta do projeto:
cd versao-jquery

3-Abre o ficheiro index.html no navegador.

Também podes abrir a pasta no Visual Studio Code e utilizar a extensão Live Server para executar a aplicação durante o desenvolvimento.

Estrutura do projeto
````versao-jquery/
├── index.html
├── style.css
├── script.js
└── README.md
````


index.html — estrutura e elementos da interface.

style.css — estilos visuais e apresentação do quadro Kanban.

script.js — lógica das tarefas, eventos, validação e armazenamento local.

README.md — documentação do projeto.

## Armazenamento de dados
A aplicação utiliza o localStorage do navegador para guardar as tarefas. Os dados permanecem disponíveis no mesmo navegador, desde que o armazenamento não seja limpo.

Este mecanismo não sincroniza automaticamente as tarefas entre dispositivos ou navegadores diferentes.

## Objetivo do projeto
Consolidar conhecimentos de JavaScript e jQuery através da construção de uma aplicação prática, trabalhando manipulação do DOM, eventos, formulários, validação, armazenamento local e interação com uma interface Kanban.






