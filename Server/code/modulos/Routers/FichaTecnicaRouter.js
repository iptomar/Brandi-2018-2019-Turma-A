const fichaTecnica = require("../CRUDS/FichaTecnica");
const getToken = require("../Auxiliares/Token");
var multer = require("multer");
var mkdirp = require("mkdirp");
const path = require("path");

mkdirp("../images/registoIdentificacao", function(err) {
  if (err) console.error(err);
});

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "../images/registoIdentificacao");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

/**
 * Rota para criar uam ficha RegistoIdentificacao
 */
exports.createFichaTecnicaRoute = async (app, bd) => {
  app.post(
    "/api/fichaTecnica/create",
    upload.single("imagem"),
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
            poluicaoObservacoesConclusoes:
              req.body.poluicaoObservacoesConclusoes,
            //transformar num array json
            objGerais: JSON.parse(req.body.objGerais),
            tabobjGerais: JSON.parse(req.body.tabobjGerais),
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
            //pagina 6 e 7
            estruturaIntervAnter: req.body.estruturaIntervAnter,
            superficieIntervAnter: req.body.superficieIntervAnter,
            elementosAcessoriosIntervAnter:
              req.body.elementosAcessoriosIntervAnter,
            observaçoesConclusoesPag6: req.body.observaçoesConclusoesPag6,
            tipoInterv: req.body.tipoInterv,
            aspetosEspecificosPag6: req.body.aspetosEspecificosPag6,
            tipoIntervCR: req.body.tipoIntervCR,
            EstruturaPropPag6: req.body.EstruturaPropPag6,
            EstruturaPropRecPag6: req.body.EstruturaPropRecPag6,
            SuperficiePropPag6: req.body.SuperficiePropPag6,
            SuperficiePropRecPag6: req.body.SuperficiePropRecPag6,
            ElementosAcessPropRecPag6: req.body.ElementosAcessPropRecPag6,
            observaçoesConclusoesPag6: req.body.observaçoesConclusoesPag6,
            //pagina 8
            estruturaPag8: req.body.estruturaPag8,
            recursosEstruturaPag8: req.body.recursosEstruturaPag8,
            superficiePag8: req.body.superficiePag8,
            recursosSuperficiePag8: req.body.recursosSuperficiePag8,
            elementosAcessoriosPag8: req.body.elementosAcessoriosPag8,
            recursosElementosAcPag8: req.body.recursosElementosAcPag8,
            observaçoesConclusoesPag8: req.body.observaçoesConclusoesPag8,
            //página 9
            relTecInterLCRM: req.body.relTecInterLCRM,
            tipoDesigOrig: req.body.tipoDesigOrig,
            refOrig: req.body.refOrig,
            entidadeOrig: req.body.entidadeOrig,
            tipoDesigDocGraf: req.body.tipoDesigDocGraf,
            refDocGraf: req.body.refDocGraf,
            entidadeDocGraf: req.body.entidadeDocGraf,
            tipoDesigExames: req.body.tipoDesigExames,
            refExames: req.body.refExames,
            entidadeExames: req.body.entidadeExames,
            //página 10
            atledpArqDoc: req.body.atledpArqDoc,
            tipoArqDoc: req.body.tipoArqDoc,
            localArqDoc: req.body.localArqDoc,
            cotaArqDoc: req.body.cotaArqDoc,
            atledpIcon: req.body.atledpIcon,
            tipoIcon: req.body.tipoIcon,
            localIcon: req.body.localIcon,
            cotaIcon: req.body.cotaIcon,
            atledpBiblio: req.body.atledpBiblio,
            tipoBiblio: req.body.tipoBiblio,
            localBiblio: req.body.localBiblio,
            cotaBiblio: req.body.cotaBiblio,
            atledpOutras: req.body.atledpOutras,
            tipoOutras: req.body.tipoOutras,
            localOutras: req.body.localOutras,
            cotaOutras: req.body.cotaOutras,
            //transformar num array de json
            tabel10: JSON.parse(req.body.tabel10),
            fichaRegistoFK: req.body.fichaRegistoFK
          };
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
    }
  );
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
          //pagina 6 e 7
          estruturaIntervAnter: req.body.estruturaIntervAnter,
          superficieIntervAnter: req.body.superficieIntervAnter,
          elementosAcessoriosIntervAnter:
            req.body.elementosAcessoriosIntervAnter,
          observaçoesConclusoesPag6: req.body.observaçoesConclusoesPag6,
          tipoInterv: req.body.tipoInterv,
          aspetosEspecificosPag6: req.body.aspetosEspecificosPag6,
          tipoIntervCR: req.body.tipoIntervCR,
          EstruturaPropPag6: req.body.EstruturaPropPag6,
          EstruturaPropRecPag6: req.body.EstruturaPropRecPag6,
          SuperficiePropPag6: req.body.SuperficiePropPag6,
          SuperficiePropRecPag6: req.body.SuperficiePropRecPag6,
          ElementosAcessPropRecPag6: req.body.ElementosAcessPropRecPag6,
          observaçoesConclusoesPag6: req.body.observaçoesConclusoesPag6,
          //pagina 8
          estruturaPag8: req.body.estruturaPag8,
          recursosEstruturaPag8: req.body.recursosEstruturaPag8,
          superficiePag8: req.body.superficiePag8,
          recursosSuperficiePag8: req.body.recursosSuperficiePag8,
          elementosAcessoriosPag8: req.body.elementosAcessoriosPag8,
          recursosElementosAcPag8: req.body.recursosElementosAcPag8,
          observaçoesConclusoesPag8: req.body.observaçoesConclusoesPag8,
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
      let resposta_bd = await fichaTecnica.getFichaTecnica(bd, req.params.id);
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
