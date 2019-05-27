const fichaTecnica = require("../CRUDS/FichaTecnica");
const getToken = require("../Auxiliares/Token");

/**
 * Rota para criar uam ficha RegistoIdentificacao
 */
exports.createFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichaTecnica/create", async (req, resp) => {
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
          localizacao: req.body.localizacao,
          proprietario: req.body.proprietario,
          codPostalProprietario: req.body.codPostalProprietario,
          emailProprietario: req.body.emailProprietario,
          contactoProprietario: req.body.contactoProprietario,
          donoObra: req.body.donoObra,
          codPostalDonoObra: req.body.codPostalDonoObra,
          contactoDonoObra: req.body.contactoDonoObra,
          mecenas: req.body.mecenas,
          codPostalMecenas: req.body.codPostalMecenas,
          contactoMecenas: req.body.contactoMecenas,
          bemIntegradoEmConjunto: req.body.bemIntegradoEmConjunto,
          tipoBensConjunto: req.body.tipoBensConjunto,
          elemConstConj: req.body.elemConstConj,
          materiasElementosAcessorios: req.body.materiasElementosAcessorios,
          marcasInscricoesAssinaturas: req.body.marcasInscricoesAssinaturas,
          marcasInscricoesMontagem: req.body.marcasInscricoesMontagem,
          marcasInscricoesConstrucao: req.body.marcasInscricoesConstrucao,
          classPatrimonial: req.body.classPatrimonial,
          epoca: req.body.epoca,
          qualidade: req.body.qualidade,
          materiaisEstruturaSuporte: req.body.materiaisEstruturaSuporte,
          materiaisSuperficies: req.body.materiaisSuperficies,
          tecnicasEstruturaSuporte: req.body.tecnicasEstruturaSuporte,
          tecnicasSuperficie: req.body.tecnicasSuperficie,
          condAmbDescricao: req.body.condAmbDescricao,
          condAmbFrioTemperatura: req.body.condAmbFrioTemperatura,
          condAmbFrioHumidade: req.body.condAmbFrioHumidade,
          condAmbFrioPeriodoInicio: req.body.condAmbFrioPeriodoInicio,
          condAmbFrioPeriodoFim: req.body.condAmbFrioPeriodoFim,
          condAmbQuenteTemperatura: req.body.condAmbQuenteTemperatura,
          condAmbQuenteHumidade: req.body.condAmbQuenteHumidade,
          condAmbQuentePeriodoInicio: req.body.condAmbQuentePeriodoInicio,
          condAmbQuentePeriodoFim: req.body.condAmbQuentePeriodoFim,
          ilumArtTipo: req.body.ilumArtTipo,
          ilumArtValorIluminancia: req.body.ilumArtValorIluminancia,
          ilumArtValurUV: req.body.ilumArtValurUV,
          ilumArtValorRealUV: req.body.ilumArtValorRealUV,
          ilumNatOrigem: req.body.ilumNatOrigem,
          ilumNatValorIluminancia: req.body.ilumNatValorIluminancia,
          ilumNatValorUV: req.body.ilumNatValorUV,
          ilumNatValorRealUV: req.body.ilumNatValorRealUV,
          poluicaoAgentes: req.body.poluicaoAgentes,
          poluicaoFontesOrigem: req.body.poluicaoFontesOrigem,
          poluicaoResultados: req.body.poluicaoResultados,
          poluicaoObservacoesConclusoes: req.body.poluicaoObservacoesConclusoes,
          objGerais: req.body.objGerais,
          tabobjGerais: req.body.tabobjGerais,
          examesAnalisesInterpResultados:
            req.body.examesAnalisesInterpResultados,
          examesAnalisesObsConclusoes: req.body.examesAnalisesObsConclusoes,
          estadoConservFQMestrutura: req.body.estadoConservFQMestrutura,
          estadoConservFQMsuperficie: req.body.estadoConservFQMsuperficie,
          estadoConservFQMelementosAcess:
            req.body.estadoConservFQMelementosAcess,
          estadoConservBioEstrutura: req.body.estadoConservBioEstrutura,
          estadoConservBioSuperficie: req.body.estadoConservBioSuperficie,
          estadoConservBioElementosAcess:
            req.body.estadoConservBioElementosAcess,
          estadoConservObsConclusoes: req.body.estadoConservObsConclusoes,
          fichaRegistoFK: req.body.fichaRegistoFK
        };
        console.log(ficha.objGerais);
        console.log(ficha.tabobjGerais);
        let resposta_bd = await fichaTecnica.createFichaTecnica(bd, ficha);
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
  });
};
/**
 * Rota para alterar uma ficha tecnica
 */
exports.updateFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichaTecnica/:id/edit", async (req, resp) => {
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
        let ficha = {
          visible: true,
          localizacao: req.body.localizacao,
          proprietario: req.body.proprietario,
          codPostalProprietario: req.body.codPostalProprietario,
          emailProprietario: req.body.emailProprietario,
          contactoProprietario: req.body.contactoProprietario,
          donoObra: req.body.donoObra,
          codPostalDonoObra: req.body.codPostalDonoObra,
          contactoDonoObra: contactoDonoObra,
          mecenas: req.body.mecenas,
          codPostalMecenas: req.body.codPostalMecenas,
          contactoMecenas: req.body.contactoMecenas,
          bemIntegradoEmConjunto: req.body.bemIntegradoEmConjunto,
          tipoBensConjunto: req.body.tipoBensConjunto,
          elemConstConj: req.body.elemConstConj,
          materiasElementosAcessorios: req.body.materiasElementosAcessorios,
          marcasInscricoesAssinaturas: req.marcasInscricoesAssinaturas,
          marcasInscricoesMontagem: req.body.marcasInscricoesMontagem,
          marcasInscricoesConstrucao: req.body.marcasInscricoesConstrucao,
          classPatrimonial: req.body.classPatrimonial,
          epoca: req.body.epoca,
          qualidade: req.body.qualidade,
          materiaisEstruturaSuporte: req.body.materiaisEstruturaSuporte,
          materiaisSuperficies: req.body.materiaisSuperficies,
          tecnicasEstruturaSuporte: req.body.tecnicasEstruturaSuporte,
          tecnicasSuperficie: req.body.tecnicasSuperficie,
          condAmbDescricao: req.body.condAmbDescricao,
          condAmbFrioTemperatura: req.body.condAmbFrioTemperatura,
          condAmbFrioHumidade: req.body.condAmbFrioHumidade,
          condAmbFrioPeriodoInicio: req.condAmbFrioPeriodoInicio,
          condAmbFrioPeriodoFim: req.body.condAmbFrioPeriodoFim,
          condAmbQuenteTemperatura: req.body.condAmbQuenteTemperatura,
          condAmbQuenteHumidade: req.body.condAmbQuenteHumidade,
          condAmbQuentePeriodoInicio: req.body.condAmbQuentePeriodoInicio,
          condAmbQuentePeriodoFim: req.body.condAmbQuentePeriodoFim,
          ilumArtTipo: req.body.ilumArtTipo,
          ilumArtValorIluminancia: req.body.ilumArtValorIluminancia,
          ilumArtValurUV: req.body.ilumArtValurUV,
          ilumArtValorRealUV: req.body.ilumArtValorRealUV,
          ilumNatOrigem: req.body.ilumNatOrigem,
          ilumNatValorIluminancia: req.body.ilumNatValorIluminancia,
          ilumNatValorUV: req.body.ilumNatValorUV,
          ilumNatValorRealUV: req.body.ilumNatValorRealUV,
          poluicaoAgentes: req.body.poluicaoAgentes,
          poluicaoFontesOrigem: req.body.poluicaoFontesOrigem,
          poluicaoResultados: req.body.poluicaoResultados,
          poluicaoObservacoesConclusoes: req.body.poluicaoObservacoesConclusoes,
          examesAnalisesInterpResultados:
            req.body.examesAnalisesInterpResultados,
          examesAnalisesObsConclusoes: req.body.examesAnalisesObsConclusoes,
          estadoConservFQMestrutura: req.body.estadoConservFQMestrutura,
          estadoConservFQMsuperficie: req.body.estadoConservFQMsuperficie,
          estadoConservFQMelementosAcess:
            req.body.estadoConservFQMelementosAcess,
          estadoConservBioEstrutura: req.body.estadoConservBioEstrutura,
          estadoConservBioSuperficie: req.body.estadoConservBioSuperficie,
          estadoConservBioElementosAcess:
            req.body.estadoConservBioElementosAcess,
          estadoConservObsConclusoes: req.body.estadoConservObsConclusoes,
          fichaRegistoFK: req.body.fichaRegistoFK
        };
        //alterar os campos
        let resposta_bd = await fichaTecnica.updateFichaTecnica(bd, ficha);
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
exports.readFichaTecnicaRoute = async (app, bd) => {
  app.get("/api/fichaTecnica/:id", async (req, resp) => {
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
      let resposta_bd = await fichaTecnica.getFichaTecnica(bd, req.params.id);
      if (resposta_bd.stat === 0) {
        code = 200;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
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
 * Rota para apagar uam ficha tecnica
 */
exports.deleteFichaTecnicaRoute = async (app, bd) => {
  app.post("/api/fichaTecnica/:id/delete", async (req, resp) => {
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
        let resposta_bd = await fichaTecnica.deleteFichaTecnica(
          bd,
          req.params.id
        );
        if (resposta_bd.stat === 0) {
          resposta_servidor.stat = "Deleted";
          resposta_servidor.resposta = resposta_bd.resposta;
        } else {
          resposta_servidor.stat = "NotDeleted";
          resposta_servidor.resposta = resposta_bd.resposta;
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
