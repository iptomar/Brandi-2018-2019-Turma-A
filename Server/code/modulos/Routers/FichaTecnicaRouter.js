const fichaTecnica = require("../CRUDS/FichaTecnica");
const getToken = require("../Auxiliares/Token");
var multer = require("multer");
var mkdirp = require("mkdirp");
const path = require("path");
var base64Img = require('base64-img');

mkdirp("../images/fichaTecnica", function (err) {
  if (err) console.error(err);
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../images/fichaTecnica");
  },
  filename: function (req, file, callback) {
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
    upload.any(),
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
          var imgGrafico = "";
          var imgArray = [];
          if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
              if (req.files[i].fieldname == "imgGraph") {
                imgGrafico = req.files[i].path;
                console.log(imgGrafico);
              } else {
                imgArray.push(req.files[i].path);
              }
            }
          }
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
            imgGrafico: imgGrafico,
            imgArray: imgArray,
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
            ElementosAcessPropPag6: req.body.ElementosAcessPropPag6,
            ElementosAcessPropRecPag6: req.body.ElementosAcessPropRecPag6,
            observaçoesConclusoesPag7: req.body.observaçoesConclusoesPag7,
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
  app.post("/api/fichaTecnica/:id/edit",
    upload.any(), async (req, resp) => {
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
          var imgGrafico = "";
          var imgArray = [];
          if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
              if (req.files[i].fieldname == "imgGraph") {
                imgGrafico = req.files[i].path;
                console.log(imgGrafico);
              } else {
                imgArray.push(req.files[i].path);
              }
            }
          }

          let ficha = req.body;
          ficha.visible = 1;
          if (ficha.bemIntegradoEmConjunto == "false") {
            ficha.bemIntegradoEmConjunto = 0;
          } else {
            ficha.bemIntegradoEmConjunto = 1;
          }
          ficha.tabobjGerais = JSON.parse(req.body.tabobjGerais);
          ficha.objGerais = JSON.parse(req.body.objGerais);
          ficha.tabel10 = JSON.parse(req.body.tabel10);
          ficha.fichaTecnicaID = req.params.id - 0;
          ficha.imgGrafico = imgGrafico;
          ficha.imgArray = imgArray;

          //console.log(ficha);
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
/**
 * Rota que retorna todas as fichas RegistoIdentificacao
 */
exports.getTodasFichasTecnicasRoute = async (app, bd) => {
  app.get("/api/fichaRegistoIdentificacao/:id/fichasTecnicas", async (req, resp) => {
    let limit = 0;
    let numpage = 12;
    if (req.query.pagenumber >= 2) {
      limit = req.query.pagenumber * numpage - 12;
      numpage = req.query.pagenumber - 0;
    }
    //query para saber o numero de paginas que existem
    let totalpagesquery = await bd.query(
      "select count(*) as total from tbl_fichasTecnicas where fichaRegistoFK = ? and visible = 1", [req.params.id]
    );
    // numero de paginas que existe na base de dados
    let totalpages = totalpagesquery.resposta[0];
    let token;
    let resposta_servidor = { status: "NotAuthenticated", resposta: {} };
    let resposta_bd = await fichaTecnica.getAllFichasTecnicas(
      bd,
      limit,
      numpage,
      req.params.id,
    );

    let code = 200;
    token = await getToken.getToken(req);
    if (token === null) {
      code = 400;
    } else if (token.name) {
      code = 400;
      resposta_servidor.status = "InvalidToken";
    } else {
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

/**
 * Rota para enviar a imagem do grafico
 */
exports.readFichaTecnicaImagemGraficoRoute = async (app, bd) => {
  app.get("/api/fichaTecnica/imagemgrafico/:id", async (req, resp) => {
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
      let resposta_bd = await fichaTecnica.getFichaTecnicaImagemGrafico(
        bd,
        req.params.id
      );
      if (resposta_bd.stat === 0) {
        code = 200;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
        resposta_servidor.resposta.imgGrafico = base64Img.base64Sync(path.join(__dirname, "../../", resposta_servidor.resposta.imgGrafico));
        //resposta_servidor.resposta.imgGrafico = base64Img.base64(path.join(__dirname, "../../", resposta_servidor.resposta.imgGrafico), function (err, data) { });


        //console.log(resposta_servidor.resposta.imgGrafico);
      } else if (resposta_bd.stat === 1) {
        code = 500;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = "DBConnectionError";
      }
      //nao e administrador
    }
    resp
      .status(code)
      .json(resposta_servidor.resposta.imgGrafico);
  });
};

exports.readFichaTecnicaFotografiasRoute = async (app, bd) => {
  app.get("/api/fichaTecnica/fotografias/:id", async (req, resp) => {
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
      let resposta_bd = await fichaTecnica.getFichaTecnicaFotografias(
        bd,
        req.params.id
      );
      if (resposta_bd.stat === 0) {
        code = 200;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = resposta_bd.resposta;
        resposta_servidor.resposta.imagem = base64Img.base64Sync(path.join(__dirname, "../../", resposta_servidor.resposta.imagem));
      } else if (resposta_bd.stat === 1) {
        code = 500;
        resposta_servidor.stat = "Authenticated";
        resposta_servidor.resposta = "DBConnectionError";
      }
      //nao e administrador
    }
    resp
      .status(code)
      .json(resposta_servidor.resposta.imagem);
  });
};
