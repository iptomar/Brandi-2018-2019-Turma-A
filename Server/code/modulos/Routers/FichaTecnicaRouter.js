const fichaTecnica = require("../CRUDS/FichaTecnica");
const getToken = require("../Auxiliares/Token");
/**
 * Rota para criar uam ficha tecnica
 */
exports.createFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichatecnica/create", async (req, resp) => {
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
          dataSaida: req.body.dataSaida,
          coordenacao: req.body.coordenacao,
          direcaoTecnica: req.body.direcaoTecnica,
          localidade: req.body.localidade,
          interessadoFK: req.body.interessadoFK
        };

        let resposta_bd = await fichaTecnica.createFichaTecnica(bd, ficha);

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
 * Rota para alterar uma ficha tecnica
 */
exports.updateFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichatecnica/:id/edit", async (req, resp) => {
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
          dataSaida: req.body.dataSaida,
          coordenacao: req.body.coordenacao,
          direcaoTecnica: req.body.direcaoTecnica,
          localidade: req.body.localidade,
          interessadoFK: req.body.interessadoFK,
          fichaRegistoID: req.params.id
        };

        let resposta_bd = await fichaTecnica.updateFichaTecnica(bd, ficha);
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
exports.readFichaTecnicaRoute = async (app, bd) => {
  app.get("/api/fichatecnica/:id", async (req, resp) => {
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
        let resposta_bd = await fichaTecnica.getFichaTecnica(bd, req.params.id);
        if (resposta_bd.stat === 0) {
          code = 201;
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
 * Rota para apagar uam ficha tecnica
 */
exports.deleteFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichatecnica/:id/delete", async (req, resp) => {
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
        let resposta_bd = await fichaTecnica.deleteFichaTenica(
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
