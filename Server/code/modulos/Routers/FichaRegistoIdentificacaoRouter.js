const fichaRegistoIdentificacao = require("../CRUDS/FichaRegistoIdentificacao");
const getToken = require("../Auxiliares/Token");
var multer = require('multer');
var mkdirp = require('mkdirp');
const path = require('path');

mkdirp('../images/registoIdentificacao', function (err) {
  if (err) console.error(err)
});


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../images/registoIdentificacao");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });


/**
 * Rota que retorna todas as fichas RegistoIdentificacao
 */
exports.getTodasFichasRegistoIdentificacaoRoute = async (app, bd) => {
  app.get("/api/fichaRegistoIdentificacao", async (req, resp) => {
    let token;
    let resposta_servidor = { status: "NotAuthenticated", resposta: {} };
    let resposta_bd = await fichaRegistoIdentificacao.getAllFichasRegistoIdentificacao(
      bd
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
      .json(resposta_servidor);
  });
};

/**
 * Rota para criar uam ficha RegistoIdentificacao
 */
exports.createfichaRegistoIdentificacaoRoute = async (app, bd) => {
  app.post("/api/fichaRegistoIdentificacao/create", upload.single('imagem'), async (req, resp) => {
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
        var imagem = "";
        if (req.file) {
          imagem = req.file.path;
        }

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
          imagem: imagem,
          interessadoFK: req.body.interessadoFK,
          tecnicosFK: req.body.tecnicosFK,

        };
        let resposta_bd = await fichaRegistoIdentificacao.createFichaRegistoIdentificacao(
          bd,
          ficha
        );
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
      //se tiver role
      if (token.roleFK) {
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
          interessadoFK: req.body.interessadoFK,
          fichaRegistoID: req.params.id,
          tecnicosFK: req.body.tecnicosFK
        };
        //verificar se dataConclusao e dataEntrega est#ao preenchidas
        if (ficha.dataConclusao === "" && ficha.dataEntrega === "") {
          ficha.dataConclusao = undefined;
          ficha.dataEntrega = undefined;
        } else if (ficha.dataEntrega === "") {
          ficha.dataEntrega = undefined;
        } else if (ficha.dataConclusao === "") {
          ficha.dataConclusao = undefined;
        }
        //alterar os campos
        let resposta_bd = await fichaRegistoIdentificacao.updateFichaRegistoIdentificacao(
          bd,
          ficha
        );
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
      let resposta_bd = await fichaRegistoIdentificacao.getFichaRegistoIdentificacao(
        bd,
        req.params.id
      );
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
 * Rota para ler uma ficha tecnica
 */
exports.readfichaRegistoIdentificacaoImagemRoute = async (app, bd) => {
  app.get("/api/fichaRegistoIdentificacao/imagem/:id", async (req, resp) => {
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
      let resposta_bd = await fichaRegistoIdentificacao.getFichaRegistoIdentificacaoImagem(
        bd,
        req.params.id
      );
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
      .sendFile(path.join(__dirname, "../../", resposta_servidor.resposta.imagem));
  });
};
