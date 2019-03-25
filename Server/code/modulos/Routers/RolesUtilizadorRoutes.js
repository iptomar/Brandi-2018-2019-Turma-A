/**
 * Módulo que contem todas as rotas CRUD de roles
 */
const userRoles = require("../CRUDS/RolesUtilizador");
const getToken = require("../Auxiliares/Token");
/**
 * Rota que permite listar todas as roles
 */
exports.listAllRolesRoute = async (app, bd) => {
  app.get("/api/roles", async (req, resp) => {
    let resposta_servidor = { stat: "Sucess", resposta: {} };
    let token;
    //HTTP CODE OK
    let code = 200;
    token = await getToken.getToken(req);
    //token nao existe
    if (token === null) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.resposta = "NotAuthenticated";
    }
    //erro ao descodificar o token
    else if (token.name) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.resposta = "InvalidToken";
    }
    //nao houve erros ao descodificar o token, utilizador ja com sessao
    else {
      resposta_servidor.stat = "Authenticated";
      //utilizador ADMIN
      if (token.roleFK === 1) {
        let listaRoles = await userRoles.listAllRoles(bd);
        //todas as roles
        if (listaRoles.stat === 0 && listaRoles.resposta.length > 0) {
          resposta_servidor.resposta = listaRoles.resposta;
        } else {
          //HTTP CODE UNAVAILABLE
          code = 500;
          resposta_servidor.stat == "DBConnectionError";
        }
        //gerar novamente o token
        token = await getToken.generateToken(token);
      }
      //UTILIZADOR SEM PERMISSOES
      else {
        //HTTP CODE BAD REQUEST
        code = 400;
        resposta_servidor.stat = "NoPermission";
      }
    }
    //resposta do servidor
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
