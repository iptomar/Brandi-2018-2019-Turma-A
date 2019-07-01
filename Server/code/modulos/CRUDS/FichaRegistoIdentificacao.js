var fs = require("file-system");
/**
 * Ficheiro que faz as querys de uma ficha tecnica
 */

/**
 * Método que devolve todas as fichas RegistoIdentificacao
 * @param bd - base de dados para fazer query
 */
exports.getAllFichasRegistoIdentificacao = async (
  bd,
  limit,
  pagenumber,
  pesquisa
) => {
  let resposta_bd;
  let resultadofinal = { stat: 1, resposta: {} };
  resposta_bd = await bd.query(
    "Select * from tbl_fichaRegistoIdentificacao where visible = true  and designacao LIKE " +
      pesquisa +
      " limit ?,?",
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
 * Método para criar fichas RegistoIdentificacao
 * @param bd - base de dados para fazer querys
 * @param dados - dados para realizar a query
 * @return {object} stat: 1<erro> 0<sucess> resposta: resposta da base de dados
 */
exports.createFichaRegistoIdentificacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd;
  //verificar se os campos estao preenchidos
  if (
    dados.designacao &&
    dados.processoLCRM &&
    dados.processoCEARC &&
    dados.dataEntrada &&
    dados.coordenacao &&
    dados.direcaoTecnica &&
    dados.imagem &&
    dados.tipologia &&
    dados.analogias &&
    dados.dimensoes &&
    dados.outrasDimensoes &&
    dados.breveDescricao &&
    dados.conclusoes &&
    dados.oficina &&
    dados.datacao &&
    dados.localOrigem &&
    dados.superCategorias &&
    dados.categorias &&
    dados.subCategorias &&
    dados.interessadoFK
  ) {
    //datas nao preenchidas
    if (dados.dataEntrega === "" && dados.dataConclusao === "") {
      resposta_bd = await bd.query(
        "INSERT INTO tbl_fichaRegistoIdentificacao (visible,designacao,processoLCRM,processoCEARC,dataEntrada,dataConclusao,coordenacao,direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK, dataEntrega) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dados.visible,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          null,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.imagem,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          null
        ]
      );
    }
    //data de entrega nao preenchida
    else if (dados.dataEntrega === "") {
      resposta_bd = await bd.query(
        "INSERT INTO tbl_fichaRegistoIdentificacao (visible,designacao,processoLCRM,processoCEARC,dataEntrada,dataConclusao,coordenacao,direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK, dataEntrega) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dados.visible,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          dados.dataConclusao,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.imagem,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          null
        ]
      );
    }
    //data de conclusao nao preenchida
    else if (dados.dataConclusao === "") {
      resposta_bd = await bd.query(
        "INSERT INTO tbl_fichaRegistoIdentificacao (visible,designacao,processoLCRM,processoCEARC,dataEntrada,dataConclusao,coordenacao,direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK, dataEntrega) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dados.visible,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          null,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.imagem,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          dados.dataEntrega
        ]
      );
    } else {
      resposta_bd = await bd.query(
        "INSERT INTO tbl_fichaRegistoIdentificacao (visible,designacao,processoLCRM,processoCEARC,dataEntrada,dataConclusao,coordenacao,direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK, dataEntrega) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          dados.visible,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          dados.dataConclusao,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.imagem,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          dados.dataEntrega
        ]
      );
    }

    //procurar id da ficha inserida
    for (i = 0; i < dados.tecnicosFK.length; i++) {
      let resposta_bd2 = await bd.query(
        "INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (?, ?)",
        [resposta_bd.resposta.insertId, dados.tecnicosFK[i]]
      );
    }

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
 * Metodo que retorna uma ficha RegistoIdentificacao
 * @param id - id da ficha RegistoIdentificacao
 * @param bd - base de dados para querys
 */
exports.getFichaRegistoIdentificacao = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_fichaRegistoIdentificacao where fichaRegistoID = ? and visible = true limit 1",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta[0];
    // procurar o nome do proprietario da peça
    let resposta_bd3 = await bd.query(
      "Select * from tbl_interessados where interessadoID = ? limit 1",
      [resposta_bd.resposta[0].interessadoFK]
    );
    //pesquisa bem sucedida
    if (resposta_bd3.stat === 0 && resposta_bd3.resposta.length > 0) {
      resposta_bd.resposta[0].interessado = resposta_bd3.resposta[0].nome;
      resposta_bd.resposta[0].interessadoFK = undefined;
    } else {
      resultadofinal.stat = 1;
      resultadofinal.resposta = "Ocorreu um erro na procura do proprietario";
      return resultadofinal;
    }
    //procurar os tecnicos da ficha RegistoIdentificacao
    let resposta_bd2 = await bd.query(
      "select b.tecnicoID , b.nome from tbl_fichaRegistoIdentificacao a, tbl_tecnicos b, tbl_registoTecnicos c where a.fichaRegistoID = ? and a.fichaRegistoID=c.fichaRegistoFK and b.tecnicoID = c.tecnicoFK GROUP BY TECNICOFK",
      [id]
    );
    //encontrou tecnicos associados a ficha e a ficha e visivel
    if (resposta_bd2.stat == 0 && resposta_bd.resposta[0] !== undefined) {
      resultadofinal.resposta.tecnicos = resposta_bd2.resposta;
    }
    //erro de conecao com a base de dados
    else if (resposta_bd2.stat === 1) {
      resultadofinal.stat = resposta_bd2.stat;
      resultadofinal.resposta = resposta_bd2.resposta;
    }
    //procurar os tecnicos da ficha RegistoIdentificacao
    let resposta_bd4 = await bd.query(
      "select b.fichaTecnicaID from tbl_fichaRegistoIdentificacao a, tbl_fichasTecnicas b, tbl_registoTecnicos c where a.fichaRegistoID = ? and a.fichaRegistoID=c.fichaRegistoFK and b.fichaRegistoFK = ?",
      [id, id]
    );
    //encontrou tecnicos associados a ficha e a ficha e visivel
    if (resposta_bd4.stat == 0 && resposta_bd.resposta[0] !== undefined) {
      resultadofinal.resposta.fichatecnicas = resposta_bd4.resposta;

      //todas as folhas de obra
      let resposta_aux = await bd.query(
        "Select folhaDeObraID from tbl_folhasDeObra where fichaRIFK = ? ",
        id
      );
      resultadofinal.resposta.folhasObra = resposta_aux.resposta;
      //todos os testes de solubilidade
      resposta_aux = await bd.query(
        "Select id from tbl_testessolventes where fichaRIFK = ? ",
        id
      );
      resultadofinal.resposta.testesSolventes = resposta_aux.resposta;
    }
    //erro de conecao com a base de dados
    else if (resposta_bd4.stat === 1) {
      resultadofinal.stat = resposta_bd4.stat;
      resultadofinal.resposta = resposta_bd4.resposta;
    }
  } else if (resposta_bd.stat === 0) {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = "FichaNaoExistente";
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};
/**
 * Metodo para alterar uma ficha RegistoIdentificacao
 */
exports.updateFichaRegistoIdentificacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Missing Fields" };
  let resposta_bd;
  //verificar se os campos estao preenchidos
  if (
    dados.designacao &&
    dados.processoLCRM &&
    dados.processoCEARC &&
    dados.dataEntrada &&
    dados.coordenacao &&
    dados.direcaoTecnica &&
    dados.imagem &&
    dados.tipologia &&
    dados.analogias &&
    dados.dimensoes &&
    dados.outrasDimensoes &&
    dados.breveDescricao &&
    dados.conclusoes &&
    dados.oficina &&
    dados.datacao &&
    dados.localOrigem &&
    dados.superCategorias &&
    dados.categorias &&
    dados.subCategorias &&
    dados.interessadoFK &&
    dados.fichaRegistoID
  ) {
    //verificar se dataConclusao e dataEntrega est#ao preenchidas
    if (dados.dataConclusao == "null" && dados.dataEntrega == "null") {
      dados.dataConclusao = null;
      dados.dataEntrega = null;
    } else if (dados.dataEntrega == "null") {
      dados.dataEntrega = null;
    } else if (dados.dataConclusao == "null") {
      dados.dataConclusao = null;
    }

    if (dados.imagem == "") {
      resposta_bd = await bd.query(
        "update tbl_fichaRegistoIdentificacao set visible=?,designacao=?,processoLCRM=?,processoCEARC=?,dataEntrada =?, dataConclusao=?, dataEntrega=?, coordenacao =?, direcaoTecnica =?, tipologia =?, analogias =?, dimensoes =?, outrasDimensoes =?, breveDescricao =?, conclusoes =?, oficina =?, datacao =?, localOrigem =?, superCategorias =?, categorias =?, subCategorias =?, interessadoFK =? where fichaRegistoID = ? ",
        [
          true,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          dados.dataConclusao,
          dados.dataEntrega,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          dados.fichaRegistoID
        ]
      );
    } else {
      let imagemVelha = await bd.query(
        "Select imagem from tbl_fichaRegistoIdentificacao where fichaRegistoID = ?",
        [dados.fichaRegistoID]
      );
      imagemVelha = imagemVelha.resposta[0].imagem;

      if (fs.existsSync(imagemVelha + "")) {
        fs.unlink(imagemVelha + "", err => {
          if (err) throw err;
        });
      }

      resposta_bd = await bd.query(
        "update tbl_fichaRegistoIdentificacao set visible=?,designacao=?,processoLCRM=?,processoCEARC=?,dataEntrada =?, dataConclusao=?, dataEntrega=?, coordenacao =? , direcaoTecnica =?,imagem=?, tipologia =?, analogias =?, dimensoes =?, outrasDimensoes =?, breveDescricao =?, conclusoes =?, oficina =?, datacao =?, localOrigem =?, superCategorias =?, categorias =?, subCategorias =?, interessadoFK =? where fichaRegistoID = ? ",
        [
          true,
          dados.designacao,
          dados.processoLCRM,
          dados.processoCEARC,
          dados.dataEntrada,
          dados.dataConclusao,
          dados.dataEntrega,
          dados.coordenacao,
          dados.direcaoTecnica,
          dados.imagem,
          dados.tipologia,
          dados.analogias,
          dados.dimensoes,
          dados.outrasDimensoes,
          dados.breveDescricao,
          dados.conclusoes,
          dados.oficina,
          dados.datacao,
          dados.localOrigem,
          dados.superCategorias,
          dados.categorias,
          dados.subCategorias,
          dados.interessadoFK,
          dados.fichaRegistoID
        ]
      );
    }
    let resposta_aux = await bd.query(
      "Select * from tbl_registoTecnicos where fichaRegistoFK = ?",
      [dados.fichaRegistoID]
    );
    //apagar os tecnicos associados a ficha
    for (i = 0; i < resposta_aux.resposta.length; i++) {
      let apagar_tecnicos = await bd.query(
        "Delete from tbl_registoTecnicos where tecnicoFK = ? and fichaRegistoFK = ?",
        [resposta_aux.resposta[i].tecnicoFK, dados.fichaRegistoID]
      );
    }
    //adicionar os novos tecnicos a ficha
    for (i = 0; i < dados.tecnicosFK.length; i++) {
      let resposta_bd2 = await bd.query(
        "INSERT INTO tbl_registoTecnicos (tecnicoFK, fichaRegistoFK) values (?, ?)",
        [dados.tecnicosFK[i], dados.fichaRegistoID]
      );
    }
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
 * Metodo para remover umam ficha tecnica
 */
exports.deleteFichaRegistoIdentificacao = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Update tbl_fichaRegistoIdentificacao set visible = false where fichaRegistoID=?",
    [id]
  );
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

/**
 * Metodo que retorna uma ficha RegistoIdentificacao
 * @param id - id da ficha RegistoIdentificacao
 * @param bd - base de dados para querys
 */
exports.getFichaRegistoIdentificacaoImagem = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select imagem from tbl_fichaRegistoIdentificacao where fichaRegistoID = ? and visible = true limit 1",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta[0];
  } else if (resposta_bd.stat === 0) {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = "FichaNaoExistente";
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};
