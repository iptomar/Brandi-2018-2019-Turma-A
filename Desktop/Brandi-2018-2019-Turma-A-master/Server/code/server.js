const _authentication = require("./_Authentication.js");
const session = require("express-session");
const express = require("express");
const app = express();
const _basedeDados = require("./bd/BasedeDados.js");
const bodyParser = require("body-parser");
const Joi = require("joi"); //modulo joi

//cria ligacao à base de dados
const bd = new _basedeDados.BasedeDados(
  "localhost",
  "root",
  "root",
  "5",
  "brandi_a"
);

app.use(
  session({
    secret: "kewaskdjb",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//port de escuta
const port = process.env.PORT || 5000;

app.get("/api/index", async (req, res) => {
  if (req.session.utilizador) {
    res.json({
      stat: 0,
      mensagem: "Bem vindo " + req.session.utilizador.login,
      resultado: req.session.utilizador
    });
  } else {
    res.json({
      stat: 1,
      mensagem: "Por favor autentique-se",
      resultado: {}
    });
  }
});

/**
 *  Authenticação
 * @param{req} <body>
 * @param{resp} resposta servidor
 * envia resposta do servidor em json stat: 0 <sucesso> 1 <erro> mensagem: mensagem para o cliente, resultado: objeto
 */
app.post("/auth/login", async (req, resp) => {
  let server_response = { stat: 1, mensagem: "Ocorreu um erro", resultado: {} }; //mensagem de resposta para o cliente
  //se se o utilizador já está authenticado
  if (req.session.utilizador) {
    server_response.stat = 0;
    server_response.mensagem = "ja autenticado";
    server_response.resultado = req.session.utilizador;
  } else {
    //authenticar utilizador
    let resultado = await _authentication.beAuthenticate(bd, {
      login: req.body.login,
      password: req.body.password
    });
    //se não houve erros na authenticação
    if (!resultado.stat) {
      server_response.stat = 0;
      server_response.mensagem = "Utilizador encontrado com sucesso";
      server_response.resultado = resultado.resposta;
      req.session.utilizador = resultado.resposta;
    }
  }
  resp.json(server_response);
});

/**
 * Registo de utilizador
 * @return {json} stat: 0 <sucesso> 1<error> msg: mensagem object <resultado da bd>
 */
app.post("/auth/register", async (req, response) => {
  //resposta do servidor
  let server_response = { stat: 1, mensagem: "Ocorreu um erro", resultado: {} };
  //verificar se o utilizador já está authenticado
  if (req.session.utilizador) {
    server_response.mensagem = `Utilizador já está authenticado ${
      req.session.utilizador.login
    }`;
    server_response.resultado = session.utilizador;
  } else {
    //criar um utilizador
    let utilizador = {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password
    };
    //registar na base de dados
    let registo = await _authentication.postRegistration(bd, utilizador);
    //se não houve problema a registar utilizador na base de dados
    if (registo.stat === 0) {
      server_response.stat = registo.stat;
      server_response.mensagem = "Utilizador registado com sucesso!";
      server_response.resultado = registo.resposta;
    } else {
      //ocorreu um erro ao registar utilizador na base de dados
      server_response.mensagem = registo.resposta;
    }
  }
  response.json(server_response);
});

app.listen(port, () => console.log("Listening na porta", port));
