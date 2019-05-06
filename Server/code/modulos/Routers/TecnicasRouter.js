const getToken = require("../Auxiliares/Token");
const tecnicas = require('../CRUDS/Tecnicas');

/**
 * Rota que retorna todas as tecnicas
 */
exports.getAllTecnicasRoute = async (app, bd) => {
    app.get("/api/tecnicas", async (req, resp) => {

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
            let resposta_bd = await tecnicas.getAllTecnicas(bd);
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
 * Rota que retorna uma tecnica
 */
exports.getSingleTecnicasRouter = async (app, bd) => {
    app.get("/api/tecnicas/:id", async (req, resp) => {

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
            let resposta_bd = await tecnicas.getSingleTecnicas(bd, req.params.id);
            console.log(resposta_bd);
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
 * Rota que cria uma tecnica
 */
exports.createTecnicasRouter = async (app, bd) => {
    app.post("/api/tecnicas/create", async (req, resp) => {

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
            let dados = [];
            dados.push(req.body);
            let resposta_bd = await tecnicas.createTecnicas(bd, dados);
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
 * Rota que dá update numa tecnica
 */
exports.updateTecnicasRoute = async (app, bd) => {
    app.post("/api/tecnicas/:id/edit", async (req, resp) => {

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
            let dados = [];
            dados.push(req.body);
            let resposta_bd = await tecnicas.updateTecnicas(bd, dados);
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