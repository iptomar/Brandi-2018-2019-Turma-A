const folhaDeObra = require("../CRUDS/FolhaDeObra");
exports.createFolhaDeObraRoute = async (app, bd) => {
  app.post(
    "/api/folhaDeObra/:id/criar",
    async (req, resp) => {
      let resposta_servidor = { stat: "Authenticated", resposta: {} };

      //HTTP CODE ACCEPTED
      let code = 201;
      //token
      let token;
      //getToken
      token = await getToken.getToken(req);
      //nao existe token/sessao
      if (token === null) {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      //token corrompido
      else if (token.name) {
        code = 400;
        resposta_servidor.stat = "InvalidToken";
      }
      //existe token/sessao
      else {
        //admin
        if (token) {
          let dados = req.body;
          let id = req.params.id;
          resposta_bd = await folhaDeObra.createFolhaDeObra(bd, dados, id);
          let resposta_bd = { stat: 0, resposta: {} };
          if (resposta_bd.stat === 0) {
            resposta_servidor.stat = "Registed";
            resposta_servidor.resposta = resposta_bd.resposta;
          } else {
            code = 400;
            resposta_servidor.stat = "NotRegisted";
            //erro de datas
            if (resposta_bd.stat >= 2) {
              resposta_servidor.resposta = await bd.tratamentoErros(
                resposta_bd.stat,
                resposta_bd.resposta.sqlMessage
              );
            } else {
              code = 500;
              resposta_servidor.resposta = "DBConnectionError";
            }
          }
        }
        //nao e administrador
        else {
          code = 400;
          resposta_servidor.stat = "NotAuthenticated";
        }
        token = await getToken.generateToken(token);
      }

      resp
        .status(code)
        .header("x-auth-token", token)
        .json(resposta_servidor);
    }
  );
};
/**
 * Rota para alterar uma ficha tecnica
 */
exports.updateFolhaDeObraRoute = async (app, bd) => {
  app.post("/api/folhaDeObra/:id/edit",
    async (req, resp) => {
      let resposta_servidor = { stat: "Authenticated", resposta: {} };
      //HTTP CODE ACCEPTED
      let code = 201;
      //token
      let token;
      //getToken
      token = await getToken.getToken(req);
      //nao existe token/sessao
      if (token === null) {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      //token corrompido
      else if (token.name) {
        code = 400;
        resposta_servidor.stat = "InvalidToken";
      }
      //existe token/sessao
      else {
        //se tiver role
        if (token.roleFK) {
          let dados = req.body;
          let id = req.params.id;
          resposta_bd = await folhaDeObra.updateFolhaDeObra(bd, dados, id);
          //alterar os campos
          let resposta_bd = { stat: 1, resposta: {} };
          if (resposta_bd.stat === 0) {
            resposta_servidor.stat = "Updated";
            resposta_servidor.resposta = resposta_bd.resposta;
          } else if (resposta_bd.stat >= 2) {
            resposta_servidor.stat = "NotUpdated";
            code = 400;
            resposta_servidor.resposta = await bd.tratamentoErros(
              resposta_bd.stat,
              resposta_bd.resposta.sqlMessage
            );
          } else {
            code = 500;
            resposta_servidor.stat = "NotUpdated";
            resposta_servidor.resposta = "DBConnectionError";
          }
        }
        //nao e administrador
        else {
          code = 400;
          resposta_servidor.stat = "NoPermissions";
        }
        token = await getToken.generateToken(token);
      }
      resp
        .status(code)
        .header("x-auth-token", token)
        .json(resposta_servidor);
    });
};

/**
 * Rota para ler uma ficha tecnica
 */
exports.readFolhaDeObraRoute = async (app, bd) => {
  app.get("/api/folhaDeObra/:id", async (req, resp) => {
    let resposta_servidor = { stat: "Authenticated", resposta: {} };
    var teste1;
    var teste2;
    //HTTP CODE ACCEPTED
    let code = 200;
    //token
    let token;
    //getToken
    token = await getToken.getToken(req);
    //nao existe token/sessao
    if (token === null) {
      code = 400;
      resposta_servidor.stat = "NotAuthenticated";
    }
    //token corrompido
    else if (token.name) {
      code = 400;
      resposta_servidor.stat = "InvalidToken";
    }
    //existe token/sessao
    else {
      let resposta_bd = { stat: 1, resposta: {} };
      resposta_bd = await folhaDeObra.getSingleFolhaDeObra(bd, req.params.id);
      if (resposta_bd[0].stat === 0) {
        code = 200;
        resposta_servidor.stat = "Authenticated";
        resposta_bd[0].stat = undefined;
        resposta_servidor.resposta = resposta_bd;
      } else if (resposta_bd.stat === 1) {
        code = 500;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = "DBConnectionError";
      }

      //nao e administrador
      token = await getToken.generateToken(token);
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};

/**
 * Rota que retorna todas as fichas RegistoIdentificacao
 */
exports.getTodasFolhasDeObraRoute = async (app, bd) => {
  app.get("/api/folhasDeObra/:id", async (req, resp) => {
    let token;
    let resposta_servidor = { status: "NotAuthenticated", resposta: {} };
    let resposta_bd = { stat: 1, resposta: {} };
   
    let code = 200;
    token = await getToken.getToken(req);
    if (token === null) {
      code = 400;
    } else if (token.name) {
      code = 400;
      resposta_servidor.status = "InvalidToken";
    } else {
      resposta_bd = await folhaDeObra.getAllFolhasDeObra(bd, req.params.id);
      if (
        resposta_bd.stat === 1 &&
        resposta_bd.resposta === "DBConnectionError"
      ) {
        code = 500;
        resposta_servidor.resposta = resposta_bd.resposta;
      } else if (resposta_bd.stat === 0) {
        resposta_servidor.resposta = resposta_bd.resposta;
        resposta_servidor.status = "Authenticated";
      } else if (resposta_bd.stat === 1) {
        code = 400;
        resposta_servidor.resposta = resposta_bd.resposta;
      }
      token = await getToken.generateToken(token);
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .header("totalpages", totalpages.total) //envio de total de paginas
      .json(resposta_servidor);
  });
};
