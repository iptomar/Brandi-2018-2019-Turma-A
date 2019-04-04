const _basedeDados = require("./bd/BasedeDados.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const roleRouter = require("./modulos/Routers/RolesUtilizadorRoutes");
const userRouter = require("./modulos/Routers/UtilizadoresRouter");
const FichaRegistoIdentificacaoRouter = require("./modulos/Routers/FichaRegistoIdentificacaoRouter");
const processosRouter = require("./modulos/Routers/ProcessosRouter");
const tecnicosRouter = require("./modulos/Routers/TecnicosRouter");
//cria ligacao à base de dados
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
app.listen(port, () => console.log("Listening na porta", port));
