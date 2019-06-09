# Brandi
Projeto no âmbito da disciplina de Projeto de Sistemas de Informação, lecionada pelos docentes Paulo Santos e Paulo Monteiro, do curso de eng. informática, na Escola Superior de Tecnologia de Tomar, do Instituto Politécnico de Tomar (ESTT-IPT).
O Brandi é uma aplicação web que dá suporte ao curso de conservação e restauro e que moderniza e melhora o sistema de workflow das peças para restauro.
## Membros
1. André Silvério Nº 19077  
1. Dário Silva Nº19075        || **Scrum Master**  :crown:
1. Fábio André Nº19088
1. João Luís Ferreira Nº19164
1. João Nunes Nº19989
1. João Pascoal Nº19094
1. Leandro Sampaio Nº19990
1. Pedro Cruz Nº19442
1. Pedro Tapadas Nº18781
1. Rafael Martins Nº19076     || **Scrum Master** :crown:
1. Ricardo Pinheiro Nº20182
1. Rodolfo Santos Nº19044
1. Telmo Alexandre Nº19089
1. Tiago António Nº20000
1. Tiago Areias Nº19998
1. Tiago Costa Nº19999
1. Tomás Colaço Nº19452
## Tecnologias
Front End | Back End | Testes Back End | Base de dados
------------ | ------------- | ------------- | -------------
React | Node.js | Postman | MySQL |
## Getting started 
Estas instruções fazem com que o utilizador fique com uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.
- Transferir e instalar o [Node.js](https://nodejs.org/en/), que já trás o package manager NPM. O React é uma library de JavaScript, por isso precisa do Node.js (JavaScript Runtime).
- Transferir e instalar o [MySQL Server](https://www.mysql.com/). Durante a instalação, na opção "Authentication Method" é obrigatório alterar a seleção para "Use Legacy Authentication Method".
- Transferir o projeto.
- Executar o seguinte script, no MySQL, presente na seguinte diretoria no projeto:
```
Brandi-2018-2019-Turma-A/BasedeDados/base_dados.sql
```
- Abrir a Command Prompt ou a Windows PowerShell e instalar as dependências relativas ao front-end:
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
- Instalar as dependências relativas ao back-end:
```
cd Brandi-2018-2019-Turma-A/Server/
npm install
npm audit fix (Opcional: usado para auditar e resolver possíveis problemas)
```
- Iniciar o servidor de back-end:
```
node server.js
```
- http://localhost:3000