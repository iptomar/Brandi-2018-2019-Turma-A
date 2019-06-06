# Brandi - Front End
Projeto no âmbito da disciplina de Projeto de Sistemas de Informação, lecionada pelos docentes Paulo Santos e Paulo Monteiro, do curso de eng. informática, na Escola Superior de Tecnologia de Tomar, do Instituto Politécnico de Tomar (ESTT-IPT).
O Brandi é uma aplicação web que dá suporte ao curso de conservação e restauro e que moderniza e melhora o sistema de workflow das peças para restauro.
O presente documento serve de resumo a todo o trabalho feito no projeto, em front-end.

## Getting started 
Estas instruções fazem com que o utilizador fique com uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.
O grupo de front-end utilizou o IDE [Visual Studio Code](https://code.visualstudio.com/) para desenvolvimento, por ter a CMD integrada e uma interface simples e funcional.
Como tecnologias, foi usado [React](https://reactjs.org/).

- Transferir e instalar o [Node.js](https://nodejs.org/en/), que já trás o package manager NPM. O React é uma library de JavaScript, por isso precisa do Node.js (JavaScript Runtime).
- Transferir o projeto. 
- Instalar as dependências relativas ao front-end:
``` 
cd Brandi-2018-2019-Turma-A/Client/
npm install
npm audit fix (Opcional: usado para auditar e resolver possíveis problemas)
```
- Iniciar o servidor de front-end:
```
cd Brandi-2018-2019-Turma-A/Client/
npm start (O React reinicia o servidor automaticamente quando é feita uma alteração e a consola apresenta os erros existentes no código em desenvolvimento)
```
- Para conseguir visualizar conteúdos, é preciso ter o back-end e a base de dados também em funcionamento local.

### Componentes Globais:
* Footer - Representa o Rodapé da aplicação
  
* Header - Representa a Navbar (Cabeçalho) da aplicação
  
* Login - Representa o formulário de login
  
* Register - Representa o formulário de registo
  
* AlertMsg - Representa uma mensagem informativa ao utilizador. Para definição deste componente, existem os seguintes states anexos:
  - alertText: Representa a mensagem a apresentar ao utilizador
  - alertColor: São keywords do bootstrap e podem ser as seguintes: success, warning, danger, primary, ...     
  - [Documentação dos alerts do Bootstrap](https://getbootstrap.com/docs/4.3/components/alerts/)
  
* FileUpload - Permite carregar um ou mais ficheiros já com um design mais interativo. Se for colocado o atributo isMultiple o FileUpload permite a inserção de mais do que um ficheiro ao mesmo tempo.
  
* LoadingAnimation - Permite fazer uma animação enquanto algo é feito.

### Componentes FichaRegistoIdentificacao
* Create - Permite criar uma nova ficha de registo e identificação
* Index - Permite listar todas as fichas de registo e identificação
* Details - Permite ver os detalhes de uma ficha de registo e identificação
* Edit - Permite editar uma ficha de registo e identificação
* Read - Permite fazer a leitura de uma ficha de registo e identificação
  
### Componentes FichaTecnica
* Create - Permite criar uma nova ficha tecnica
* Details - Permite ver os detalhes de uma ficha de tecnica
* Edit - Permite editar uma ficha tecnica

### Componentes Interessados
* Create - Permite criar interessados
* Details - Permite ver os detalhes de um interessado
* Index - Permite listar todos os interessados
* Edit - Permite editar um interessado
  
### Componentes Users
* Login - Permite fazer o login de um utilizador já registado
* Register - Permite, por parte de um administrador, fazer o registo de um utilizador não registado
* Index - Permite visualizar todos os utilizadores registados
* Profile - Permite visualizar os dados pessoais do utilizador loggado
* Details - Permite visualizar os dados pessoais de um utilizador
* Edit - Permite editar os dados pessoais de um utilizador

### Componentes FolhaDeObra
* Create - Permite criar uma folha de obra
  
### MasterComponents
Os MasterComponents servem para introduzir os componentes individuais e anteriormente descritos, por forma a serem chamados em conjunto numa só página. O path para os MasterComponents é posteriormente definido no documento index.js, através do componente <BrowserRouter>
  
### index.js
Onde são definidas as rotas para chamar os MasterComponents. A estrutura do RoutePath tem que ser conservada da mais complexa à mais simples. Por exemplo, primeiro vem brandi.ipt.pt:81/fichaTecnica/:id/details e só posteriormente brandi.ipt.pt:81/fichaTecnica