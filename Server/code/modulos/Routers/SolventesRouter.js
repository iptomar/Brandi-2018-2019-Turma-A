const getToken = require("../Auxiliares/Token");
const solventes = require("../CRUDS/TestesSolventes");

/**
 * Rota que retorna todas as condições ambientais
 */
exports.getAllTestesSolventes = async (app, bd) => {
  app.get("api/testesSolubilizacao/:id/all", async (req, resp) => {
    resp.json("testes");
    // let code = 200;
    // let resposta_servidor = {
    //   status: "Not Authenticated",
    //   resposta: {}
    // };
    // token = await getToken.getToken(req);
    // if (token === null) {
    //   code = 400;
    // } else if (token.name) {
    //   code = 400;
    //   resposta_servidor.status = "InvalidToken";
    // } else {
    //   let resposta_bd = await solventes.getAllTestesSolventes(bd);
    //   if (
    //     resposta_bd.stat === 1 &&
    //     resposta_bd.resposta === "DBConnectionError"
    //   ) {
    //     code = 500;
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //   } else if (resposta_bd.stat === 0) {
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //     resposta_servidor.status = "Authenticated";
    //   } else if (resposta_bd.stat === 1) {
    //     code = 400;
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //   }
    //   token = await getToken.generateToken(token);
    // }
    // resp
    //   .status(code)
    //   .header("x-auth-token", token)
    //   .json(resposta_servidor);
  });
};

/**
 * Rota que retorna uma condição ambiental local
 */
exports.getTestesSolvente = async (app, bd) => {
  app.get("/api/testesSolubilizacao/:id/:idteste", async (req, resp) => {
    console.log("testes");
    resp.json("testes");
    // let code = 200;
    // let resposta_servidor = {
    //   status: "Not Authenticated",
    //   resposta: {}
    // };
    // token = await getToken.getToken(req);
    // if (token === null) {
    //   code = 400;
    // } else if (token.name) {
    //   code = 400;
    //   resposta_servidor.status = "InvalidToken";
    // } else {
    //   let resposta_bd = await solventes.getSingleTestesSolventes(
    //     bd,
    //     req.params.id
    //   );
    //   if (
    //     resposta_bd.stat === 1 &&
    //     resposta_bd.resposta === "DBConnectionError"
    //   ) {
    //     code = 500;
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //   } else if (resposta_bd.stat === 0) {
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //     resposta_servidor.status = "Authenticated";
    //   } else if (resposta_bd.stat === 1) {
    //     code = 400;
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //   }
    //   token = await getToken.generateToken(token);
    // }
    // resp
    //   .status(code)
    //   .header("x-auth-token", token)
    //   .json(resposta_servidor);
  });
};

/**
 * Rota que cria uma condição ambiental local
 */
exports.createTesteSolvente = async (app, bd) => {
  app.post("/api/testesSolubilizacao/:id/criar", async (req, resp) => {
    let dados = req.body;
    let code = 200;
    let resposta_servidor = {
      status: "Not Authenticated",
      resposta: {}
    };
    token = await getToken.getToken(req);
    console.log(req.body[0]);
    resp.json("Ola");
    //     if (token === null) {
    //       code = 400;
    //     } else if (token.name) {
    //       code = 400;
    //       resposta_servidor.status = "InvalidToken";
    //     } else {
    //       let resposta_bd = await solventes.createTesteSolvente(bd, dados);
    //       console.log(resposta_bd);
    //       if (resposta_bd.stat === 0) {
    //         resposta_servidor.status = "Created";
    //         resposta_servidor.resposta = resposta_bd.resposta;
    //       }
    //       //database down
    //       else if (resposta_bd.stat === 1) {
    //         code = 500;
    //         resposta_servidor.status = "NotCreated";
    //         resposta_servidor.resposta = "DBConnectionError";
    //       }
    //       //erro ao criar objeto
    //       else if (resposta_bd.stat >= 2) {
    //         code = 400;
    //         resposta_servidor.resposta = await bd.tratamentoErros(
    //           resposta_bd.stat,
    //           resposta_bd.resposta.sqlMessage
    //         );
    //       }
    //       token = await getToken.generateToken(token);
    //     }
    //     resp
    //       .status(code)
    //       .header("x-auth-token", token)
    //       .json(resposta_servidor);
  });
};

/**
 * Rota que dá update numa condição ambiental local
 */
exports.updateTestesSolventes = async (app, bd) => {
  app.post("/api/solventes/:id/edit", async (req, resp) => {
    //console.log(req.body);
    resp.json("testes");
    // let dados = req.body;
    // let code = 200;
    // let resposta_servidor = {
    //   status: "Not Authenticated",
    //   resposta: {}
    // };
    // token = await getToken.getToken(req);
    // if (token === null) {
    //   code = 400;
    // } else if (token.name) {
    //   code = 400;
    //   resposta_servidor.status = "InvalidToken";
    // } else {
    //   let resposta_bd = await solventes.updateTestesSolventes(bd, dados);
    //   console.log(resposta_bd);
    //   if (resposta_bd.stat === 0) {
    //     resposta_servidor.status = "Updated";
    //     resposta_servidor.resposta = resposta_bd.resposta;
    //   }
    //   //database down
    //   else if (resposta_bd.stat === 1) {
    //     code = 500;
    //     resposta_servidor.status = "NotUpdated";
    //     resposta_servidor.resposta = "DBConnectionError";
    //   }
    //   //erro ao criar objeto
    //   else if (resposta_bd.stat >= 2) {
    //     code = 400;
    //     resposta_servidor.resposta = await bd.tratamentoErros(
    //       resposta_bd.stat,
    //       resposta_bd.resposta.sqlMessage
    //     );
    //   }
    //   token = await getToken.generateToken(token);
    // }
    // resp
    //   .status(code)
    //   .header("x-auth-token", token)
    //   .json(resposta_servidor);
  });
};
