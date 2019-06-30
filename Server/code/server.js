const _basedeDados = require("./bd/BasedeDados.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const FichaRegistoIdentificacaoRouter = require("./modulos/Routers/FichaRegistoIdentificacaoRouter");
const fichaTecnica = require("./modulos/Routers/FichaTecnicaRouter");
const folhaDeObra = require("./modulos/Routers/FolhaDeObraRouter");
const interessados = require("./modulos/Routers/InteressadosRouter");
const roleRouter = require("./modulos/Routers/RolesUtilizadorRoutes");
const tecnicosRouter = require("./modulos/Routers/TecnicosRouter");
const testesdeSolubilidade = require("./modulos/Routers/TestesdeSolubilidadeRouter");
const userRouter = require("./modulos/Routers/UtilizadoresRouter");



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
//rota para alterar a password de um utilizador
userRouter.changePassword(app, bd);
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


//rota que devolve todos os solventes
testesdeSolubilidade.getAllTestesSolventes(app, bd);
//rota que devolve um solvente
testesdeSolubilidade.getTestesSolvente(app, bd);
//rota que cria um solvente
testesdeSolubilidade.createTesteSolvente(app, bd);
//rota que dá update de um solvente
testesdeSolubilidade.updateTestesSolventes(app, bd);

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
//rota que devolve a imagem do grafico
fichaTecnica.readFichaTecnicaImagemGraficoRoute(app, bd);
//rota que devolve as fotografias
fichaTecnica.readFichaTecnicaFotografiasRoute(app, bd);

//Folha de obra
folhaDeObra.readFolhaDeObraRoute(app, bd);

folhaDeObra.createFolhaDeObraRoute(app, bd);

folhaDeObra.updateFolhaDeObraRoute(app, bd);

folhaDeObra.getTodasFolhasDeObraRoute(app, bd);

app.listen(port, () => console.log("Listening na porta", port));
