const getToken = require("../Auxiliares/Token");
const objetos = require("../CRUDS/Objetos");
/**
 * Ficheiro que contem todas as rotas para o CRUD dos Objetos
 */
/**
 * Rota que devolve todos os objetos de tbl_objetos
 */
exports.getAllObjetosRoute = async (app, bd) => {
    app.get("/api/objetos", async (req, resp) => {
        let resposta_servidor = { status: 1, resposta: {} };
        let code = 200;
        let limit = 0;
        let numpage = 10;
        if (req.query.pagenumber >= 2) {
            limit = req.query.pagenumber * numpage - 10;
            numpage = req.query.pagenumber - 0;
        }
        //query para saber o numero de paginas que existem
        let totalpagesquery = await bd.query(
            "select count(*) as total from tbl_objetos"
        );
        // numero de paginas que existe na base de dados
        let totalpages = totalpagesquery.resposta[0];
        let token;
        token = await getToken.getToken(req);
        if (token === null) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "NotAuthenticated";
            resposta_servidor.resposta = "Utilizador não autenticado";
        } else if (token.name) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            //pesquisar pelos objetos
            let resposta_bd = await objetos.getAllObjetos(bd, limit, numpage);
            //busca dos dados com sucesso
            if (resposta_bd.stat === 0) {
                resposta_servidor.status = "Authenticated";
                resposta_servidor.resposta = resposta_bd.resposta;
            }
            //erro na pesquisa dos dados do utilizador
            else if (resposta_bd.stat === 1) {
                code = 500;
                resposta_servidor.status = "Authenticated";
                resposta_servidor.resposta = "DBConnectionError";
            }
        }
        //resposta do servidor
        resp
            .status(code).header("totalpages", totalpages.total)
            .json(resposta_servidor);
    });
};

/**
 * Rota que devolve um objeto
 */
exports.getObjetoRoute = async (app, bd) => {
    app.get("/api/objetos/:id", async (req, resp) => {
        let resposta_servidor = { status: 1, resposta: {} };
        let code = 200;
        let token;
        token = await getToken.getToken(req);
        if (token === null) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "NotAuthenticated";
            resposta_servidor.resposta = "Utilizador não autenticado";
        } else if (token.name) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            //pesquisar pelos objetos
            let resposta_bd = await objetos.getObjeto(bd, req.params.id);
            //busca dos dados com sucesso
            if (resposta_bd.stat === 0) {
                resposta_servidor.status = "Authenticated";
                resposta_servidor.resposta = resposta_bd.resposta;
            }
            //erro na pesquisa dos dados do utilizador
            else if (resposta_bd.stat === 1) {
                code = 500;
                resposta_servidor.status = "Authenticated";
                resposta_servidor.resposta = "DBConnectionError";
            }
        }
        //resposta do servidor
        resp
            .status(code)
            .json(resposta_servidor);
    });
};

/**
 * Rota que regista um objeto
 */
exports.createObjetoRoute = async (app, bd) => {
    app.post("/api/objetos/create", async (req, resp) => {
        let resposta_servidor = { status: "NotCreated", resposta: {} };
        let code = 201;
        let token;
        token = await getToken.getToken(req);
        if (token === null) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "NotAuthenticated";
            resposta_servidor.resposta = "Utilizador não autenticado";
        } else if (token.name) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            if (token.roleFK === 1) {
                let newObjeto = {
                    tipologia: req.body.tipologia,
                    dimensoes: req.body.dimensoes,
                    outrasDimensoes: req.body.outrasDimensoes,
                    breveDescricao: req.body.breveDescricao,
                    analogias: req.body.analogias,
                    conclusoes: req.body.conclusoes,
                    oficina: req.body.oficina,
                    datacao: req.body.datacao,
                    localOrigem: req.body.localOrigem,
                    superCategorias: req.body.superCategorias,
                    categorias: req.body.categorias,
                    subCategorias: req.body.subCategorias,
                    fichaDeRegistoFK: req.body.fichaDeRegistoFK
                };
                //pesquisar pelos objetos
                let resposta_bd = await objetos.createObjeto(bd, newObjeto);
                //busca dos dados com sucesso
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
            } else {
                code = 400;
                resposta_servidor.status = "NoPermissions";
            }
        }
        //resposta do servidor
        resp
            .status(code)
            .json(resposta_servidor);
    });
};

/**
 * Rota que atualiza um objeto
 */
exports.updateObjetoRouter = async (app, bd) => {
    app.post("/api/objetos/:id/edit", async (req, resp) => {
        let resposta_servidor = { status: "NotUpdated", resposta: {} };
        let code = 201;
        let token;
        token = await getToken.getToken(req);
        if (token === null) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "NotAuthenticated";
            resposta_servidor.resposta = "Utilizador não autenticado";
        } else if (token.name) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            if (token.roleFK === 1) {
                let newObjeto = {
                    tipologia: req.body.tipologia,
                    dimensoes: req.body.dimensoes,
                    outrasDimensoes: req.body.outrasDimensoes,
                    breveDescricao: req.body.breveDescricao,
                    analogias: req.body.analogias,
                    conclusoes: req.body.conclusoes,
                    oficina: req.body.oficina,
                    datacao: req.body.datacao,
                    localOrigem: req.body.localOrigem,
                    superCategorias: req.body.superCategorias,
                    categorias: req.body.categorias,
                    subCategorias: req.body.subCategorias,
                    fichaDeRegistoFK: req.body.fichaDeRegistoFK,
                    id: req.params.id,
                    visible: true
                };
                //pesquisar pelos objetos
                let resposta_bd = await objetos.updateObjeto(bd, newObjeto);

                //busca dos dados com sucesso
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
                //erro ao atualizar objeto
                else if (resposta_bd.stat >= 2) {
                    code = 400;
                    resposta_servidor.resposta = await bd.tratamentoErros(
                        resposta_bd.stat,
                        resposta_bd.resposta.sqlMessage
                    );
                }
            } else {
                code = 400;
                resposta_servidor.status = "NoPermissions";
            }
        }
        //resposta do servidor
        resp
            .status(code)
            .json(resposta_servidor);
    });
};

/**
 * Rota que apaga um objeto
 */
exports.deleteObjetoRouter = async (app, bd) => {
    app.post("/api/objetos/:id/delete", async (req, resp) => {
        let resposta_servidor = { status: "NotDeleted", resposta: {} };
        let code = 201;
        let token;
        token = await getToken.getToken(req);
        if (token === null) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "NotAuthenticated";
            resposta_servidor.resposta = "Utilizador não autenticado";
        } else if (token.name) {
            //HTTP CODE BAD REQUEST
            code = 400;
            resposta_servidor.status = "InvalidToken";
        } else {
            if (token.roleFK === 1) {

                //pesquisar pelos objetos
                let resposta_bd = await objetos.deleteObjeto(bd, req.params.id);

                //busca dos dados com sucesso
                if (resposta_bd.stat === 0) {
                    resposta_servidor.status = "Deleted";
                    resposta_servidor.resposta = resposta_bd.resposta;
                }
                //database down
                else if (resposta_bd.stat === 1) {
                    code = 500;
                    resposta_servidor.status = "NotDeleted";
                    resposta_servidor.resposta = "DBConnectionError";
                }
                //erro ao apagar objeto
                else if (resposta_bd.stat >= 2) {
                    code = 400;
                    resposta_servidor.resposta = await bd.tratamentoErros(
                        resposta_bd.stat,
                        resposta_bd.resposta.sqlMessage
                    );
                }
            } else {
                code = 400;
                resposta_servidor.status = "NoPermissions";
            }
        }
        //resposta do servidor
        resp
            .status(code)
            .json(resposta_servidor);
    });
};