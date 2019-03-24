const _basedeDados = require("./bd/BasedeDados.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const roleRouter = require("./modulos/Routers/RolesUtilizadorRoutes");
const userRouter = require("./modulos/Routers/UtilizadoresRouter");
const fichaTecnicaRouter = require("./modulos/Routers/FichaTecnicaRouter");
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
const port = process.env.PORT || 5000;
//rota de registo
userRouter.registerRoute(app, bd);
//rota de login
userRouter.loginRoute(app, bd);
//rota de todos os utilizadores, testes
userRouter.alluserRoute(app, bd);
//rota para todas as roles de utilizadores, testes
roleRouter.listAllRolesRoute(app, bd);
//rota para criacao de umam ficha tecnica
fichaTecnicaRouter.createFichaTecnicaRoute(app, bd);
//rota para editar uma ficha tecnica
fichaTecnicaRouter.updateFichaTecnicaRoute(app, bd);
//rota para listar uma ficha tecnica
fichaTecnicaRouter.readFichaTecnicaRoute(app, bd);
//rota para apagar uma ficha tecnica
fichaTecnicaRouter.deleteFichaTecnicaRoute(app, bd);
app.listen(port, () => console.log("Listening na porta", port));
