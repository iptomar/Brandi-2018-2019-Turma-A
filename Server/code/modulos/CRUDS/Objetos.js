/**
 * Ficheiro que faz as querys de um objeto
 */

/**
 * Método que devolve todos os objetos
 * @param bd - base de dados para fazer query
 */
exports.getAllObjetos = async (bd, limit, pagenumber) => {
    let resultadofinal = { stat: 1, resposta: {} };

    let resposta_bd = await bd.query(
        "Select * from tbl_objetos where visible = true limit ?,?",
        [limit, pagenumber]
    );
    if (resposta_bd.stat === 0) {
        resultadofinal.resposta = resposta_bd.resposta;
        resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
        resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
        resultadofinal.resposta = resposta_bd.resposta;
    }
    return resultadofinal;
};

/**
 * Método para criar objetos
 * @param bd - base de dados para fazer querys
 * @param dados - dados para realizar a query
 * @return {object} stat: 1<erro> 0<sucess> resposta: resposta da base de dados
 */
exports.createObjeto = async (bd, dados) => {
    let resultadofinal = { stat: 1, resposta: {} };
    let resposta_bd;
    //verificar se os campos estao preenchidos
    if (
        dados.tipologia &&
        dados.dimensoes &&
        dados.outrasDimensoes &&
        dados.breveDescricao &&
        dados.analogias &&
        dados.conclusoes &&
        dados.oficina &&
        dados.datacao &&
        dados.localOrigem &&
        dados.superCategorias &&
        dados.categorias &&
        dados.subCategorias &&
        dados.fichaDeRegistoFK
    ) {
        //insert dos dados na tabela
        resposta_bd = await bd.query(
            "INSERT INTO tbl_objetos (visible,tipologia,dimensoes,outrasDimensoes,breveDescricao,analogias,conclusoes,oficina,datacao,localOrigem,superCategorias,categorias,subCategorias,fichaDeRegistoFK) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                true,
                dados.tipologia,
                dados.dimensoes,
                dados.outrasDimensoes,
                dados.breveDescricao,
                dados.analogias,
                dados.conclusoes,
                dados.oficina,
                dados.datacao,
                dados.localOrigem,
                dados.superCategorias,
                dados.categorias,
                dados.subCategorias,
                dados.fichaDeRegistoFK
            ]
        );

        //inserçao bem sucedida na base de dados
        if (resposta_bd.stat === 0) {
            resultadofinal.stat = 0;
            resultadofinal.resposta = resposta_bd.resposta;
        }
        //ocorreu um erro na inserção
        else {
            resultadofinal.stat = resposta_bd.stat;
            resultadofinal.resposta = resposta_bd.resposta;
        }
    }
    return resultadofinal;
};

/**
 * Metodo que retorna um objeto
 * @param id - id do objeto
 * @param bd - base de dados para querys
 */
exports.getObjeto = async (bd, id) => {
    let resultadofinal = { stat: 1, resposta: {} };
    let resposta_bd = await bd.query(
        "Select tipologia, dimensoes, outrasDimensoes, breveDescricao, analogias, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias from tbl_objetos where fichaDeRegistoFK  = ? and visible = true limit 1",
        [id]
    );
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = resposta_bd.resposta[0];
    } else if (resposta_bd.stat === 0) {
        resultadofinal.stat = resposta_bd.stat;
        resultadofinal.resposta = "ObjetoNaoExistente";
    } else {
        resultadofinal.stat = resposta_bd.stat;
        resultadofinal.resposta = resposta_bd.resposta;
    }
    return resultadofinal;
};

/**
 * Metodo para alterar um objeto
 */
exports.updateObjeto = async (bd, dados) => {
    let resultadofinal = { stat: 1, resposta: "Missing Fields" };
    //verificar se os campos estao preenchidos
    if (
        dados.tipologia &&
        dados.dimensoes &&
        dados.outrasDimensoes &&
        dados.breveDescricao &&
        dados.analogias &&
        dados.conclusoes &&
        dados.oficina &&
        dados.datacao &&
        dados.localOrigem &&
        dados.superCategorias &&
        dados.categorias &&
        dados.subCategorias &&
        dados.fichaDeRegistoFK
    ) {
        let resposta_bd = await bd.query(
            "update tbl_objetos set visible=?,tipologia=?,dimensoes=?,outrasDimensoes =?, breveDescricao=?, analogias =? ,conclusoes=?,oficina=?,datacao =?,localOrigem=?,superCategorias=?,categorias=?,subCategorias=?,fichaDeRegistoFK=?  where objetoID = ?",
            [
                dados.visible,
                dados.tipologia,
                dados.dimensoes,
                dados.outrasDimensoes,
                dados.breveDescricao,
                dados.analogias,
                dados.conclusoes,
                dados.oficina,
                dados.datacao,
                dados.localOrigem,
                dados.superCategorias,
                dados.categorias,
                dados.subCategorias,
                dados.fichaDeRegistoFK,
                dados.id
            ]
        );
        console.log(resposta_bd);
        //inserio na base de dados
        if (resposta_bd.stat === 0) {
            resultadofinal.stat = 0;
            resultadofinal.resposta = resposta_bd.resposta;
        } else {
            resultadofinal.stat = resposta_bd.stat;
            resultadofinal.resposta = resposta_bd.resposta;
        }
    }
    return resultadofinal;
};

/**
 * Metodo para remover um objeto
 */
exports.deleteObjeto = async (bd, id) => {
    let resultadofinal = { stat: 1, resposta: {} };
    let resposta_bd = await bd.query(
        "Update tbl_objetos set visible = false where objetoID=?",
        [id]
    );
    if (resposta_bd.stat === 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = resposta_bd.resposta;

    } else {
        resultadofinal.stat = resposta_bd.stat;
        resultadofinal.resposta = resposta_bd.resposta;
    }
    console.log(resultadofinal);
    return resultadofinal;
};

