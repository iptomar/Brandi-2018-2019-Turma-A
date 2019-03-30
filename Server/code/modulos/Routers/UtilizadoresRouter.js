const authentication = require("../CRUDS/Utilizadores");
const getToken = require("../Auxiliares/Token");

/**
 * Rota para registar utilizador
 * @param req -dados que são enviados para o servidor
 * @param resp -resposta do servidor
 * @param app -express app
 * @param bd -bd para fazer querys
 */
exports.loginRoute = async (app, bd) => {
  app.post("/auth/login", async (req, resp) => {
    let token;
    //HTTP CODE OK
    let code = 200;
    //resposta do servidor
    let resposta_servidor = { status: "NotAuthenticated", resposta: {} };
    //verificar se existe token no cabecalho do browser
    token = await getToken.getToken(req);
    //nao existe token
    if (token === null) {
      let utilizador = {
        login: req.body.login,
        password: req.body.password
      };
      let resultadoauthenticacao = await authentication.authenticateUser(
        bd,
        utilizador
      );
      //authenticacao com sucesso
      if (resultadoauthenticacao.stat === 0) {
        //avisar que utilizador authenticou-se
        resposta_servidor.status = "Authenticated";
        //dados publicos do utilizador
        resposta_servidor.resposta = resultadoauthenticacao.resposta;
        //gerar token para enviar
        token = await getToken.generateToken(resposta_servidor.resposta);
      } else if (resultadoauthenticacao.resposta === "DBConnectionError") {
        //HTTP CODE SERVICE UNAVAILABLE
        code = 500;
        resposta_servidor.resposta = resultadoauthenticacao.resposta;
      } else {
        //HTTP CODE BAD REQUEST
        code = 400;
        resposta_servidor.resposta = "Campos inválidos";
      }
    }
    //erro ao descodificar token
    else if (token.name) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.status = "InvalidToken";
    }
    //não houve erros ao descodificar token, utilizador já com sessão
    else {
      resposta_servidor.status = "Authenticated";
      resposta_servidor.resposta = token;
      //gerar novamente o token
      token = await getToken.generateToken(token);
    }
    //resposta do servidor
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
/**
 * Rota para registar um utilizador
 * @param {*} app express
 * @param {*} bd base de dados
 */
exports.registerRoute = async (app, bd) => {
  app.post("/auth/register", async (req, resp) => {
    let token;
    //HTTP CODE ACCEPTED
    let code = 201;
    //resposta do servidor
    let resposta_servidor = { status: "NotRegisted", resposta: {} };
    //verificar se o utilizador tem sessao iniciada
    token = await getToken.getToken(req);
    //sessao nao iniciada
    if (token === null) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.status = "NotAuthenticated";
      resposta_servidor.resposta = "Utilizador não autenticado";
    }
    //erro ao descodificar token
    else if (token.name) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.status = "InvalidToken";
    } else {
      //verificar se a pessoa e admin
      if (token.roleFK === 1) {
        //criar um utilizador
        let utilizador = {
          login: req.body.login,
          email: req.body.email,
          password: req.body.password,
          roleFK: req.body.roleFK
        };
        //registar utilizador
        let resultadoregister = await authentication.registerUser(
          bd,
          utilizador
        );
        //verificar se utilizador foi bem inserido
        if (resultadoregister.stat === 0) {
          resposta_servidor.status = "Registed";
          //fazer um select ao utilizador registado
          let user = await authentication.authenticateUser(bd, utilizador);
          //dados publicos do utilizador
          resposta_servidor.resposta = user.resposta;
        }
        //erro de conecao com a base de dados
        else if (resultadoregister.resposta === "DBConnectionError") {
          code = 500;
          resposta_servidor.resposta = resultadoregister.resposta;
        }
        //campos repetidos
        else {
          code = 400;
          resposta_servidor.resposta = resultadoregister.resposta;
        }
      }
      //utilizador sem permissoes
      else {
        code = 400;
        resposta_servidor.status = "NotAuthorized";
      }
      //gerar novamente o token
      token = await getToken.generateToken(token);
    }
    //resposta do servidor
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
/**
 * Rota  para ir buscar todos os utilizadores
 */
exports.alluserRoute = async (app, bd) => {
  app.get("/api/users", async (req, resp) => {
    let resposta_bd = await authentication.getAllUsers(bd);
    let resposta_servidor = { status: 1, resposta: {} };
    let code = 200;
    if (resposta_bd.stat === 1) {
      code = 500;
      resposta_servidor.resposta = resposta_bd.resposta;
    } else {
      resposta_servidor.status = 0;
      resposta_servidor.resposta = resposta_bd.resposta;
    }
    resp.status(code).json(resposta_servidor);
  });
};
/**
 * Rota para ir buscar os detalhes de 1 utilizador
 */
exports.getUserDetails = async (app, bd) => {
  app.get("/api/users/:id", async (req, resp) => {
    let resposta_servidor = { stat: 1, resposta: {} };
    let code = 200;
    let token;
    token = await getToken.getToken(req);
    if (token === null) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.stat = "NotAuthenticated";
      resposta_servidor.resposta = "Utilizador não autenticado";
    } else if (token.name) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.stat = "InvalidToken";
    } else {
      //buscar dados do utilizador
      let resposta_bd = await authentication.getUser(bd, token.roleFK);
      //busca dos dados com sucesso
      if (resposta_bd.stat === 0) {
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
      }
      //erro na pesquisa dos dados do utilizador
      else if (resposta_bd.stat === 1) {
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
      }
      //gerar novamente o token
      token = await getToken.generateToken(token);
    }
    //resposta do servidor
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
/**
 * Rota de alterar dados de um utilizador
 */
exports.changeUserDetails = async (app, bd) => {
  app.post("/api/users/:id/edit", async (req, resp) => {
    let code = 201;
    let token;
    let resposta_servidor = { status: "NotAuthenticated", resposta: {} };
    token = await getToken.getToken(req);
    if (token === null) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.status = "NotAuthenticated";
      resposta_servidor.resposta = "Utilizador não autenticado";
    } else if (token.name) {
      //HTTP CODE BAD REQUEST
      code = 400;
      resposta_servidor.status = "InvalidToken";
    } else {
      //verificar se e administrador
      if (token.roleFK === 1) {
        //criar um utilizador
        let utilizador = {
          login: req.body.login,
          email: req.body.email,
          userID: req.params.id,
          roleFK: req.body.roleFK
        };
        //tentar alterar os de um utilizador
        let resposta_bd = await authentication.changeUser(bd, utilizador);
        //alterações  com sucesso
        if (resposta_bd.stat === 0) {
          resposta_servidor.status = "Updated";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
        //algum erro com a base de dados
        else {
          //HTTP BAD REQUEST
          code = 400;
          resposta_servidor.status = "NotUpdated";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
        //gerar novamente o token
        token = await getToken.generateToken(token);
      }
      //nao tem permissoes
      else {
        resposta_servidor.resposta = "NotAuthorized";
      }
    }
    //resposta do servidor
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
