const _authentication = require("./_Authentication.js");
const _fichasTecnicas = require("./_fichasTecnicas.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

/**
 * Rota do Index
 */
exports.indexRoute = async (app, _bd) => {
  app.get("/api/index", async (req, resp) => {
    //HTTP CODE OK
    let code = 200;
    //procurar se existe token no cabeçalho do broswer
    let token = req.header("x-auth-token");
    //resposta do servidor
    let server_response = { status: "NotAutheticated", response: {} }; //mensagem de resposta para o cliente
    //se existe token
    if (token) {
      try {
        //verificar se o token não foi alterado
        const decode = jwt.verify(token, "ABCD");
        server_response.status = "Authenticated";
        //dados publicos do utilizador
        server_response.response = decode;
      } catch (error) {
        server_response.status = "NotAuthenticated";
      }
    }
    resp.status(code).json(server_response);
  });
};

/**
 *  Authenticação
 * @param{req} <body>
 * @param{resp} resposta servidor
 * se for bem sucedido atribui um token ao utilizador, responde status code e envia uma keyword e um objeto do tipo utilizador
 */
exports.loginRoute = async (app, bd) => {
  app.post("/auth/login", async (req, resp) => {
    //procura se existe token no cabeçalho browser
    let token = req.header("x-auth-token");
    let server_response = { status: "NotAutheticated", response: {} }; //mensagem de resposta para o cliente
    //http code OK
    let code = 200;
    //se existe
    if (token) {
      try {
        //tentar verificar se o token é valido
        const decode = jwt.verify(token, "ABCD");
        //responder token valido
        server_response.status = "Authenticated";
        //responder dados públicos do utilizador
        server_response.response = decode;
      } catch (error) {
        //http code Unauthorized
        code = 401;
        //houve alterações no conteudo do token
        server_response.status = "NotAuthenticated";
      }
    }
    //authenticar utilizador
    else {
      let resultado = await _authentication.beAuthenticate(bd, {
        login: req.body.login,
        password: req.body.password
      });
      //se não houve erros durante o processo authenticação
      if (resultado.stat === 0) {
        server_response.status = "Authenticated";
        token = jwt.sign(JSON.stringify(resultado.resposta), "ABCD");
        server_response.response = resultado.resposta;
      }
      //ocorreu um erro na ligação com a base de dados
      else {
        //http code Internal server error
        code = 500;
        server_response.response = resultado.resposta;
      }
    }
    resp
      .status(code)
      .header("x-auth-token", token)
      .json(server_response);
  });
};

/**
 * Rota para o utilizador se registar
 * se for bem sucedido atribui um token ao utilizador, responde status code e envia uma keyword e um objeto do tipo utilizador
 */
exports.registerRoute = async (app, bd) => {
  app.post("/auth/register", async (req, resp) => {
    //http code ok
    let code = 200;
    //resposta do servidor
    let server_response = { status: "NotRegisted", response: {} };
    //criar um utilizador
    let utilizador = {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password
    };

    //verificar se os campos login email e password estão preenchidos
    if (utilizador.login && utilizador.email && utilizador.password) {
      //registar na base de dados
      let registo = await _authentication.postRegistration(bd, utilizador);
      //se não houve problema a registar utilizador na base de dados
      if (registo.stat === 0) {
        //created http code CREATED
        code = 201;
        server_response.status = "Registed";
        server_response.response = registo.resposta;
      }
      //campos duplicados
      else if (registo.stat === 2) {
        //http bad request
        code = 400;
        server_response.status = "FieldError";
      } else {
        // internal server error
        code = 500;
        //ocorreu um erro ao registar utilizador na base de dados
        server_response.status = "DatabaseError";
      }
    }
    resp.status(code).json(server_response);
  });
};

/**
 * Rota de todas as fichas técnicas
 */
exports.listarFichasTecnicasRoute = async (app, bd) => {
  app.get("/api/fichastecnicas", async (req, resp) => {
    //HTTP CODE OK
    let code = 200;
    //procurar se existe token no cabeçalho do broswer
    let token = req.header("x-auth-token");
    //resposta do servidor
    let server_response = { status: "NotAutheticated", response: {} }; //mensagem de resposta para o cliente
    //se existe token
    if (token) {
      try {
        //verificar se o token não foi alterado
        const decode = jwt.verify(token, "ABCD");
        server_response.status = "Authenticated";

        let resultado = await _fichasTecnicas.listarFichas(bd);

        //lista das fichas
        server_response.response = resultado;
      } catch (error) {
        server_response.status = "NotAuthenticated";
      }
    }
    resp.status(code).json(server_response);
  });
};

exports.listarFichasTecnicasPorIdRoute = async (app, bd) => {
  app.get("/api/fichastecnicas/detalhes/:fichaID", async (req, resp) => {
    //HTTP CODE OK
    let code = 200;
    //procurar se existe token no cabeçalho do broswer
    let token = req.header("x-auth-token");
    //resposta do servidor
    let server_response = { status: "NotAutheticated", response: {} }; //mensagem de resposta para o cliente

    let dados = {
      fichaID: req.params.fichaID
    };
    //se existe token
    if (token) {
      try {
        //verificar se o token não foi alterado
        const decode = jwt.verify(token, "ABCD");
        server_response.status = "Authenticated";

        let resultado = await _fichasTecnicas.listarFichaPorId(bd, dados);

        //lista das fichas
        server_response.response = resultado;
      } catch (error) {
        server_response.status = "NotAuthenticated";
      }
    }
    resp.status(code).json(server_response);
  });
};

//Rota para criar fichas tecnicas
exports.inserirFichasTecnicasRoute = async (app, bd) => {
  app.post("/api/fichastecnicas/create", async (req, resp) => {
    //http code ok
    let code = 200;
    //resposta do servidor
    let server_response = { status: "NotRegisted", response: {} };
    //criar um utilizador
    let fichaTecnica = {
      nome: req.body.nome,
      numero: req.body.numero,
      texto: req.body.texto,
      cena: req.body.cena
    };

    //verificar se os campos login email e password estão preenchidos
    if (
      fichaTecnica.nome &&
      fichaTecnica.numero &&
      fichaTecnica.texto &&
      fichaTecnica.cena
    ) {
      //registar na base de dados
      let inserirFicha = await _fichasTecnicas.criarFicha(bd, fichaTecnica);
      //se não houve problema a registar utilizador na base de dados
      if (inserirFicha.stat === 0) {
        //created http code CREATED
        code = 201;
        server_response.status = "Ficha inserida";
        server_response.response = inserirFicha.resposta;
      }
      //campos duplicados
      else if (inserirFicha.stat === 2) {
        //http bad request
        code = 400;
        server_response.status = "FieldError";
        server_response.response = inserirFicha;
      } else {
        // internal server error
        code = 500;
        //ocorreu um erro ao registar utilizador na base de dados
        server_response.status = "DatabaseError";
      }
    }
    resp.status(code).json(server_response);
  });
};
