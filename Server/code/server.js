const _basedeDados = require("./bd/BasedeDados.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const roleRouter = require("./modulos/Routers/RolesUtilizadorRoutes");
const userRouter = require("./modulos/Routers/UtilizadoresRouter");
const FichaRegistoIdentificacaoRouter = require("./modulos/Routers/FichaRegistoIdentificacaoRouter");
const processosRouter = require("./modulos/Routers/ProcessosRouter");
const tecnicosRouter = require("./modulos/Routers/TecnicosRouter");
const materiaisRouter = require("./modulos/Routers/MateriaisRouter");
const condicoesAmbientaisLocais = require("./modulos/Routers/CondicoesAmbientaisLocalRouter");
const especificacoesExames = require("./modulos/Routers/EspecificacoesExamesRouter");
const examesAnalises = require("./modulos/Routers/ExamesAnalisesRouter");
const grausEficaciaSolubilizacao = require("./modulos/Routers/GrausEficaciaSolubilizacaoRouter");
const iluminacao = require("./modulos/Routers/IluminacaoRouter");
const interessadosContactos = require("./modulos/Routers/InteressadosContactosRouter");
const solventes = require("./modulos/Routers/SolventesRouter");
const testesEficacia = require("./modulos/Routers/TestesEficaciaRouter");
const tecnicas = require('./modulos/Routers/TecnicasRouter');
const interessados = require('./modulos/Routers/InteressadosRouter');
const fichaTecnica = require('./modulos/Routers/FichaTecnicaRouter');

//cria ligacao à base de dados
//LIGAÇÃO SERVIDOR
// let bd = new _basedeDados.BasedeDados(
//   "localhost",
//   "admina",
//   "admina_ADMINA_123",
//   "5",
//   "brandi_a"
// );

let bd = new _basedeDados.BasedeDados(
  "localhost",
  "root",
  "root",
  "5",
  "brandi_a"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//port de escuta
const port = process.env.PORT || 8081;
//rota de registo
userRouter.registerRoute(app, bd);
//rota de login
userRouter.loginRoute(app, bd);
//rota de todos os utilizadores, testes
userRouter.alluserRoute(app, bd);
//rota para os detalhes de um utilizador
userRouter.getUserDetailsRoute(app, bd);
//rota para alterar os detalhes de um utilizador
userRouter.changeUserDetailsRoute(app, bd);
//rota para apagar um utilizador
userRouter.deleteUserRoute(app, bd);
//rota para todas as roles de utilizadores, testes
roleRouter.listAllRolesRoute(app, bd);
//rota para criacao de umam ficha tecnica
FichaRegistoIdentificacaoRouter.createfichaRegistoIdentificacaoRoute(app, bd);
//rota para editar uma ficha tecnica
FichaRegistoIdentificacaoRouter.updatefichaRegistoIdentificacaoRoute(app, bd);
//rota para listar uma ficha tecnica
FichaRegistoIdentificacaoRouter.readfichaRegistoIdentificacaoRoute(app, bd);
//rota para apagar uma ficha tecnica
FichaRegistoIdentificacaoRouter.deletefichaRegistoIdentificacaoRoute(app, bd);
//rota que devolve todas as fichas tecnicas
FichaRegistoIdentificacaoRouter.getTodasFichasRegistoIdentificacaoRoute(
  app,
  bd
);
//rota que devolve a imagem de uma ficha de registo e identificação
FichaRegistoIdentificacaoRouter.readfichaRegistoIdentificacaoImagemRoute(
  app,
  bd
);
//get all tecnico
tecnicosRouter.getAllTecnicosRoute(app, bd);
//get single tecnico
tecnicosRouter.getTecnicoRoute(app, bd);
//create tecnicos
tecnicosRouter.createTecnicoRoute(app, bd);
//update tecnicos
tecnicosRouter.updateTecnicoRouter(app, bd);

// //rota que devolve um processo
// processosRouter.readProcessoRoute(app, bd);
// //rota que cria um processo
// processosRouter.createProcessoRoute(app, bd);
// //rota que edita um processo
// processosRouter.updateProcessoRoute(app, bd);

//rota que devolve todos os materiais
materiaisRouter.getAllMateriaisRoute(app, bd);
//rota que devolve um material
materiaisRouter.getMaterialRoute(app, bd);
//rota que cria materais
materiaisRouter.createMaterialRoute(app, bd);
//rota que dá update aos materiais
materiaisRouter.updateMateriaisRoute(app, bd);

//rota que devolve todas as condições ambientais locais
condicoesAmbientaisLocais.getAllCondicoesAmbientaisLocal(app, bd);
//rota que devolve uma condição ambiental local
condicoesAmbientaisLocais.getCondicaoAmbientalLocal(app, bd);
//rota que cria uma condição ambiental local
condicoesAmbientaisLocais.createCondicaoAmbientalLocal(app, bd);
//rota que dá update de uma condição ambiental local
condicoesAmbientaisLocais.updateCondicaoAmbientalLocal(app, bd);

//rota que devolve todas as especificacoes exames
especificacoesExames.getAllEspecificacoesExames(app, bd);
//rota que devolve uma especificação exame
especificacoesExames.getEspecificacaoExame(app, bd);
//rota que cria uma especificação exame
especificacoesExames.createEspecificacaoExame(app, bd);
//rota que dá update de uma especificação exame
especificacoesExames.updateEspecificacaoExame(app, bd);

//rota que devolve todas os exames analises
examesAnalises.getAllExamesAnalises(app, bd);
//rota que devolve um exame analise 
examesAnalises.getExameAnalise(app, bd);
//rota que cria um exame analise 
examesAnalises.createExameAnalise(app, bd);
//rota que dá update de um exame analise 
examesAnalises.updateExameAnalise(app, bd);

//rota que devolve todos os graus de eficacia e solubilizacao
grausEficaciaSolubilizacao.getAllGrausEficaciaSolubilizacao(app, bd);
//rota que devolve um grau de eficacia e solubilizacao
grausEficaciaSolubilizacao.getGrauEficaciaSolubilizacao(app, bd);
//rota que cria um grau de eficacia e solubilizacao
grausEficaciaSolubilizacao.createGrauEficaciaSolubilizacao(app, bd);
//rota que dá update de um grau de eficacia e solubilizacao
grausEficaciaSolubilizacao.updateGrauEficaciaSolubilizacao(app, bd);

//rota que devolve todos as iluminaçoes
iluminacao.getAllIluminacao(app, bd);
//rota que devolve uma iluminação
iluminacao.getIluminacao(app, bd);
//rota que cria uma iluminação
iluminacao.createIluminacao(app, bd);
//rota que dá update de uma iluminação
iluminacao.updateIluminacao(app, bd);

//rota que devolve todos os interessados Contactos
interessadosContactos.getAllInteressadosContactos(app, bd);
//rota que devolve um  interessado Contactos
interessadosContactos.getInteressadoContactos(app, bd);
//rota que cria um interessado Contactos
interessadosContactos.createInteressadoContactos(app, bd);
//rota que dá update de um interessado Contactos
interessadosContactos.updateInteressadoContactos(app, bd);

//rota que devolve todos os solventes
solventes.getAllSolventes(app, bd);
//rota que devolve um solvente
solventes.getSolvente(app, bd);
//rota que cria um solvente
solventes.createSolvente(app, bd);
//rota que dá update de um solvente
solventes.updateSolvente(app, bd);

//rota que devolve todos os testes de Eficacia
testesEficacia.getAllTestesEficacia(app, bd);
//rota que devolve um teste de Eficacia
testesEficacia.getTesteEficacia(app, bd);
//rota que cria um teste de Eficacia
testesEficacia.createTesteEficacia(app, bd);
//rota que dá update de um teste de Eficacia
testesEficacia.updateTesteEficacia(app, bd);

//rota que devolve todas as tecnicas
tecnicas.getAllTecnicasRoute(app, bd);
//rota que devolve uma tecnica
tecnicas.getSingleTecnicasRouter(app, bd);
//rota que cria uma tecnica
tecnicas.createTecnicasRouter(app, bd);
//rota que dá update numa tecnica
tecnicas.updateTecnicasRoute(app, bd);

//rota que devolve todos os interessados
interessados.getAllInteressadosRoute(app, bd);
//rota que devolve um interessado
interessados.getInteressadoRoute(app, bd);
//rota que cria um interessado
interessados.createInteressadoRoute(app, bd);
//rota que dá update num interessado
interessados.updateInteressadoRoute(app, bd);

//rota que cria uma ficha tecnica
fichaTecnica.createFichaTecnicaRoute(app, bd);
//rota que dá update numa ficha tecnica
fichaTecnica.updateFichaTecnicaRoute(app, bd);
//rota que devolve uma ficha tecnica
fichaTecnica.readFichaTecnicaRoute(app, bd);
//rota para apagar uma ficha tecnica
fichaTecnica.deleteFichaTecnicaRoute(app, bd);








app.listen(port, () => console.log("Listening na porta", port));
