const getToken = require("../Auxiliares/Token");
const especificacoesExames = require("../CRUDS/EspecificacoesExames");

/**
 * Rota que retorna todas as condições ambientais
 */
exports.getAllEspecificacoesExames = async (app, bd) => {
    app.get("/api/especificacoesExames", async (req, resp) => {

        let code = 200;
        let resposta_servidor = {
            status: "Not Authenticated",
            resposta: {}
        };
        token = await getToken.getToken(req);

        if (token === null) {
            code = 400;
        } else if (token.name) {
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            let resposta_bd = await especificacoesExames.getAllEspecificacoesExames(bd);
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
 * Rota que retorna uma condição ambiental local
 */
exports.getEspecificacaoExame = async (app, bd) => {
    app.get("/api/especificacoesExames/:id", async (req, resp) => {

        let code = 200;
        let resposta_servidor = {
            status: "Not Authenticated",
            resposta: {}
        };
        token = await getToken.getToken(req);

        if (token === null) {
            code = 400;
        } else if (token.name) {
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            let resposta_bd = await especificacoesExames.getSingleEspecificacoesExames(bd, req.params.id);
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
 * Rota que cria uma condição ambiental local
 */
exports.createEspecificacaoExame = async (app, bd) => {
    app.post("/api/especificacoesExames/create", async (req, resp) => {

        let dados = req.body;
        let code = 200;
        let resposta_servidor = {
            status: "Not Authenticated",
            resposta: {}
        };
        token = await getToken.getToken(req);

        if (token === null) {
            code = 400;
        } else if (token.name) {
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            let resposta_bd = await especificacoesExames.createEspecificacoesExames(bd, dados);
            console.log(resposta_bd);
            if (resposta_bd.stat === 0) {
                resposta_servidor.status = "Created";
                resposta_servidor.resposta = resposta_bd.resposta;
            }
            //database down
            else if (resposta_bd.stat === 1) {
                code = 500;
                resposta_servidor.status = "NotCreated";
                resposta_servidor.resposta = "DBConnectionError";
            }
            //erro ao criar objeto
            else if (resposta_bd.stat >= 2) {
                code = 400;
                resposta_servidor.resposta = await bd.tratamentoErros(
                    resposta_bd.stat,
                    resposta_bd.resposta.sqlMessage
                );
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
 * Rota que dá update numa condição ambiental local
 */
exports.updateEspecificacaoExame = async (app, bd) => {
    app.post("/api/especificacoesExames/:id/edit", async (req, resp) => {

        //console.log(req.body);
        let dados = req.body;
        let code = 200;
        let resposta_servidor = {
            status: "Not Authenticated",
            resposta: {}
        };
        token = await getToken.getToken(req);

        if (token === null) {
            code = 400;
        } else if (token.name) {
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            let resposta_bd = await especificacoesExames.updateEspecificacoesExames(bd, dados);
            console.log(resposta_bd);
            if (resposta_bd.stat === 0) {
                resposta_servidor.status = "Updated";
                resposta_servidor.resposta = resposta_bd.resposta;
            }
            //database down
            else if (resposta_bd.stat === 1) {
                code = 500;
                resposta_servidor.status = "NotUpdated";
                resposta_servidor.resposta = "DBConnectionError";
            }
            //erro ao criar objeto
            else if (resposta_bd.stat >= 2) {
                code = 400;
                resposta_servidor.resposta = await bd.tratamentoErros(
                    resposta_bd.stat,
                    resposta_bd.resposta.sqlMessage
                );
            }
            token = await getToken.generateToken(token);
        }
        resp
            .status(code)
            .header("x-auth-token", token)
            .json(resposta_servidor);
    });
};