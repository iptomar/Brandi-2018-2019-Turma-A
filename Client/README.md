Primeiramente é necessário instalar as dependências
### npm install

Posteriormente pode opcionalmente ser executado o comando para auditar e resolver possíveis problemas
### npm audit fix 

Finalmente, executar o seguinte comando, na diretoria da pasta Client:
### npm start

## Componentes Globais:

  ## Footer 
  Representa o Rodapé da aplicação
  
  ## Header
  Representa a Navbar (Cabeçalho) da aplicação
  
  ## Login
  Representa o formulário de login
  
  ## Register
  Representa o formulário de registo
  
  ## AlertMsg
  Representa uma mensagem informativa ao utilizador. Para definição deste componente, existem os seguintes states anexos:
    alertText: Representa a mensagem a apresentar ao utilizador
    alertisNotVisible:  TRUE -> Oculta o componente, FALSE -> Apresenta o componente
    alertColor: São keywords do bootstrap e podem ser as seguintes: success, warning, danger, primary, ...     
    [https://getbootstrap.com/docs/4.3/components/alerts/]
  
  ## FileUpload
  Permite carregar um ou mais ficheiros já com um design mais interativo.
  Se for colocado o atributo isMultiple o FileUpload permite a inserção de mais do que um ficheiro ao mesmo tempo.
  
  ## LoadingAnimation
  Permite fazer uma animação enquanto a página é carregada, entre outros.

## Componentes FichaRegistoIdentificacao
  
  ## Create
  Permite criar uma nova ficha de registo e identificação
  
  ## Index
  Permite listar todas as fichas de registo e identificação
  
  ## Details
  Permite ver os detalhes de uma ficha de registo e identificação
  
  ## Edit
  Permite editar uma ficha de registo e identificação
  
  ## Read
  Permite fazer a leitura de uma ficha de registo e identificação
  
  ## Componentes Ficha técnica
  
  ## Create
  Permite criar uma nova ficha tecnica
  
  ## Details
  Permite ver os detalhes de uma ficha de tecnica
  
  ## Edit
  Permite editar uma ficha tecnica
  
## Componentes Users
  
  ## Login
  Permite fazer o login de um utilizador já registado
  
  ## Register
  Permite, por parte de um administrador, fazer o registo de um utilizador não registado
  
  ## Index
  Permite visualizar todos os utilizadores registados
  
  ## Profile
  Permite visualizar os dados pessoais do utilizador loggado
  
  ## Details
  Permite visualizar os dados pessoais de um utilizador
  
  ## Edit
  Permite editar os dados pessoais de um utilizador
  
## MasterComponents
  Os MasterComponents não têm muito que se lhe diga: servem para introduzir os componentes individuais, anteriormente descritos, por forma a serem chamados em conjunto numa só página. O path para os MasterComponents é posteriormente definido no documento index.js, através do componente <BrowserRouter>
  
## index.js
  Onde são definidas as rotas para chamar os MasterComponents. A estrutura do RoutePath tem que ser conservada da mais complexa à mais simples. Por exemplo, primeiro vem brandi.ipt.pt:81/fichaTecnica/:id/details e só posteriormente brandi.ipt.pt:81/fichaTecnica. 
