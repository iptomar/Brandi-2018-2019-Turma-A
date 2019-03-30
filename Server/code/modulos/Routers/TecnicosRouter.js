const getToken = require("../Auxiliares/Token");
const tecnicos = require("../CRUDS/Tecnicos");
/**
 * Ficheiro que contem todas as rotas para o CRUD dos Tecnicos
 */
/**
 * Rota que devolve todos os tecnicos de tbl_tecnicos
 */
exports.getAllTecnicosRoute = async (app, bd) => {
  app.get("/api/tecnicos", async (req, resp) => {
    let resposta_servidor = { status: 1, resposta: {} };
    let code = 200;
    let token;
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
      //pesquisar pelos tecnicos
      let resposta_bd = await tecnicos.getAllTecnicos(bd);
      //busca dos dados com sucesso
      if (resposta_bd.stat === 0) {
        resposta_servidor.status = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
      }
      //erro na pesquisa dos dados do utilizador
      else if (resposta_bd.stat === 1) {
        code = 500;
        resposta_servidor.status = "Authenticated";
        resposta_servidor.resposta = "DBConnectionError";
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
 * Rota que devolve um tecnico
 */
exports.getTecnicoRoute = async (app, bd) => {
  app.get("/api/tecnicos/:id", async (req, resp) => {
    let resposta_servidor = { status: 1, resposta: {} };
    let code = 200;
    let token;
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
      //pesquisar pelos tecnicos
      let resposta_bd = await tecnicos.getTecnico(bd, req.params.id);
      //busca dos dados com sucesso
      if (resposta_bd.stat === 0) {
        resposta_servidor.status = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
      }
      //erro na pesquisa dos dados do utilizador
      else if (resposta_bd.stat === 1) {
        code = 500;
        resposta_servidor.status = "Authenticated";
        resposta_servidor.resposta = "DBConnectionError";
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
 * Rota que regista um tecnico
 */
exports.createTecnicoRoute = async (app, bd) => {
  app.post("/api/tecnicos/create", async (req, resp) => {
    let resposta_servidor = { status: "NotCreated", resposta: {} };
    let code = 201;
    let token;
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
      if (token.roleFK === 1) {
        let newTecnico = {
          nome: req.body.nome,
          habilitacoes: req.body.habilitacoes,
          nivelProfissional: req.body.nivelProfissional,
          userFK: req.body.userFK
        };
        //pesquisar pelos tecnicos
        let resposta_bd = await tecnicos.createTecnico(bd, newTecnico);
        //busca dos dados com sucesso
        if (resposta_bd.stat === 0) {
          resposta_servidor.status = "Created";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
        //database down
        else if (resposta_bd.stat === 1) {
          code = 500;
          resposta_servidor.status = "NotCreated";
          resposta_servidor.resposta = "DBConnectionError";
        }
        //erro ao criar tecnico
        else if (resposta_bd.stat >= 2) {
          code = 400;
          resposta_servidor.resposta = await bd.tratamentoErros(
            resposta_bd.stat,
            resposta_bd.resposta.sqlMessage
          );
        }
      } else {
        code = 400;
        resposta_servidor.status = "NoPermissions";
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
 * Rota que regista um tecnico
 */
exports.updateTecnicoRouter = async (app, bd) => {
  app.post("/api/tecnicos/:id/edit", async (req, resp) => {
    let resposta_servidor = { status: "NotUpdated", resposta: {} };
    let code = 201;
    let token;
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
      if (token.roleFK === 1) {
        let newTecnico = {
          nome: req.body.nome,
          habilitacoes: req.body.habilitacoes,
          nivelProfissional: req.body.nivelProfissional,
          userFK: req.body.userFK,
          id: req.params.id
        };
        //pesquisar pelos tecnicos
        let resposta_bd = await tecnicos.updateTecnico(bd, newTecnico);

        //busca dos dados com sucesso
        if (resposta_bd.stat === 0) {
          resposta_servidor.status = "Updated";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
        //database down
        else if (resposta_bd.stat === 1) {
          code = 500;
          resposta_servidor.status = "NotUpdated";
          resposta_servidor.resposta = "DBConnectionError";
        }
        //erro ao criar tecnico
        else if (resposta_bd.stat >= 2) {
          code = 400;
          resposta_servidor.resposta = await bd.tratamentoErros(
            resposta_bd.stat,
            resposta_bd.resposta.sqlMessage
          );
        }
      } else {
        code = 400;
        resposta_servidor.status = "NoPermissions";
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
