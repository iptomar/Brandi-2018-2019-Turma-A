const fichaRegistoIdentificacao = require("../CRUDS/FichaRegistoIdentificacao");
const getToken = require("../Auxiliares/Token");

/**
 * Rota que retorna todas as fichas RegistoIdentificacao
 */
exports.getTodasFichasRegistoIdentificacaoRoute = async (app, bd) => {
  app.get("/api/fichaRegistoIdentificacao", async (req, resp) => {
    let resposta_servidor = await fichaRegistoIdentificacao.getAllFichasRegistoIdentificacao(
      bd
    );
    let code = 200;
    if (resposta_servidor.stat === 1) {
      code = 400;
    }
    resp.status(code).json(resposta_servidor.resposta);
  });
};

/**
 * Rota para criar uam ficha RegistoIdentificacao
 */
exports.createfichaRegistoIdentificacaoRoute = async (app, bd) => {
  app.post("/api/fichaRegistoIdentificacao/create", async (req, resp) => {
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
      if (token.roleFK === 1) {
        let ficha = {
          visible: true,
          designacao: req.body.designacao,
          processoLCRM: req.body.processoLCRM,
          processoCEARC: req.body.processoCEARC,
          dataEntrada: req.body.dataEntrada,
          dataConclusao: req.body.dataConclusao,
          dataEntrega: req.body.dataEntrega,
          coordenacao: req.body.coordenacao,
          direcaoTecnica: req.body.direcaoTecnica,
          localidade: req.body.localidade,
          interessadoFK: req.body.interessadoFK
        };

        let resposta_bd = await fichaRegistoIdentificacao.createFichaRegistoIdentificacao(
          bd,
          ficha
        );

        if (resposta_bd.stat === 0) {
          resposta_servidor.stat = "Registed";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = "NotRegisted";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
      }
      //nao e administrador
      else {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      token = getToken.generateToken(token);
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
/**
 * Rota para alterar uma ficha tecnica
 */
exports.updatefichaRegistoIdentificacaoRoute = async (app, bd) => {
  app.post("/api/fichaRegistoIdentificacao/:id/edit", async (req, resp) => {
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
      if (token.roleFK === 1) {
        let ficha = {
          visible: req.body.visible,
          designacao: req.body.designacao,
          processoLCRM: req.body.processoLCRM,
          processoCEARC: req.body.processoCEARC,
          dataEntrada: req.body.dataEntrada,
          dataConclusao: req.body.dataConclusao,
          dataEntrega: req.body.dataEntrega,
          coordenacao: req.body.coordenacao,
          direcaoTecnica: req.body.direcaoTecnica,
          localidade: req.body.localidade,
          interessadoFK: req.body.interessadoFK,
          fichaRegistoID: req.params.id
        };
        let resposta_bd = await fichaRegistoIdentificacao.updateFichaRegistoIdentificacao(
          bd,
          ficha
        );
        if (resposta_bd.stat === 0) {
          resposta_servidor.stat = "Updated";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = "NotUpdated";
          resposta_servidor.resposta = resposta_bd.resposta;
        }
      }
      //nao e administrador
      else {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      token = getToken.generateToken(token);
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
exports.readfichaRegistoIdentificacaoRoute = async (app, bd) => {
  app.get("/api/fichaRegistoIdentificacao/:id", async (req, resp) => {
    let resposta_servidor = { stat: "Authenticated", resposta: {} };
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
      //admin
      if (token.roleFK === 1) {
        let resposta_bd = await fichaRegistoIdentificacao.getFichaRegistoIdentificacao(
          bd,
          req.params.id
        );
        if (resposta_bd.stat === 0) {
          code = 200;
          resposta_servidor.stat = "Authenticated";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = resposta_bd.stat;
          resposta_servidor.resposta = resposta_bd.resposta;
        }
      }
      //nao e administrador
      else {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      token = getToken.generateToken(token);
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
/**
 * Rota para apagar uam ficha tecnica
 */
exports.deletefichaRegistoIdentificacaoRoute = async (app, bd) => {
  app.post("/api/fichaRegistoIdentificacao/:id/delete", async (req, resp) => {
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
      if (token.roleFK === 1) {
        let resposta_bd = await fichaRegistoIdentificacao.deleteFichaRegistoIdentificacao(
          bd,
          req.params.id
        );
        if (resposta_bd.stat === 0) {
          resposta_servidor.stat = "Deleted";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = resposta_bd.stat;
          resposta_servidor.resposta = resposta_bd.resposta;
        }
      }
      //nao e administrador
      else {
        code = 400;
        resposta_servidor.stat = "NotAuthenticated";
      }
      token = getToken.generateToken(token);
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(resposta_servidor);
  });
};
