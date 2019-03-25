const Processos = require("../CRUDS/Processos");
const getToken = require("../Auxiliares/Token");

/**
 * Rota para ler um processo
 */
exports.readProcessoRoute = async (app, bd) => {
  app.get("/api/processo/:id", async (req, resp) => {
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
        let resposta_bd = await Processos.getProcesso(bd, req.params.id);
        if (resposta_bd.stat === 0) {
          code = 200;
          resposta_servidor.stat = "Accepted";
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
 * Rota para criar um processo
 */
exports.createProcessoRoute = async (app, bd) => {
  app.post("/api/processo/create", async (req, resp) => {
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
        let processo = {
          processoLCRM: req.body.processoLCRM,
          dataAberturaLCRM: req.body.dataAberturaLCRM,
          dataEntradaLCRM: req.body.dataEntradaLCRM,
          processoCEARC: req.body.processoCEARC,
          dataAberturaCEARC: req.body.dataAberturaCEARC,
          dataEntradaCEARC: req.body.dataEntradaCEARC,
          direcaoTecnica: req.body.direcaoTecnica
        };

        let resposta_bd = await Processos.createProcesso(bd, processo);

        if (resposta_bd.stat === 0) {
          resposta_servidor.stat = "Registed";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = "Erro na criação";
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
 * Rota para alterar um processo
 */
exports.updateProcessoRoute = async (app, bd) => {
  app.post("/api/processo/:id/edit", async (req, resp) => {
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
        let processo = {
          processoLCRM: req.body.processoLCRM,
          dataAberturaLCRM: req.body.dataAberturaLCRM,
          dataEntradaLCRM: req.body.dataEntradaLCRM,
          processoCEARC: req.body.processoCEARC,
          dataAberturaCEARC: req.body.dataAberturaCEARC,
          dataEntradaCEARC: req.body.dataEntradaCEARC,
          direcaoTecnica: req.body.direcaoTecnica,
          processoID: req.params.id
        };

        let resposta_bd = await Processos.updateProcesso(bd, processo);
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
