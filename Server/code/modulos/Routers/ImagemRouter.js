const getToken = require("../Auxiliares/Token");

exports.createImagemRoute = async (app, bd) => {
    app.post("/api/imagem/create", async (req, resp) => {
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
                let imagem = {
                    imagemObj: req.body.imagemObj,

                };
                if (imagem) {
                    resposta_servidor.stat = "Imagem chegou";
                    resposta_servidor.resposta = imagem;
                } else {
                    resposta_servidor.stat = "Imagem não chegou";
                    resposta_servidor.resposta = imagem;
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