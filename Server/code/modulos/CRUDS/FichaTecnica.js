/**
 * Ficheiro que faz as querys de uma ficha tecnica
 */

/**
 * Método que devolve todas as fichas tecnicas
 * @param bd - base de dados para fazer query
 */
exports.getAllFichas = async bd => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query("Select * from tbl_fichasRegistos");
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.resposta = resposta_bd.resposta;
    resultadofinal.stat = 0;
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

/**
 * Método para criar fichasTecnicas
 * @param bd - base de dados para fazer querys
 * @param dados - dados para realizar a query
 * @return {object} stat: 1<erro> 0<sucess> resposta: resposta da base de dados
 */
exports.createFichaTecnica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se os campos estao preenchidos
  if (
    dados.designacao &&
    dados.processoLCRM &&
    dados.processoCEARC &&
    dados.dataEntrada &&
    dados.coordenacao &&
    dados.direcaoTecnica &&
    dados.localidade &&
    dados.interessadoFK
  ) {
    let resposta_bd = await bd.query(
      "INSERT INTO tbl_fichasRegistos (visible,designacao,processoLCRM,processoCEARC,dataEntrada,dataConclusao,coordenacao,direcaoTecnica,localidade,interessadoFK,dataSaida) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [
        dados.visible,
        dados.designacao,
        dados.processoLCRM,
        dados.processoCEARC,
        dados.dataEntrada,
        dados.dataConclusao,
        dados.coordenacao,
        dados.direcaoTecnica,
        dados.localidade,
        dados.interessadoFK,
        dados.dataSaida
      ]
    );
    //conseguio inserir na base de dados
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
 * Metodo que retorna uma ficha tecnica
 * @param id - id da ficha tecnica
 * @param bd - base de dados para querys
 */
exports.getFichaTecnica = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_fichasRegistos where fichaRegistoID = ? limit 1",
    [id]
  );
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta[0];
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
/**
 * Metodo para alterar uma ficha tecnica
 */
exports.updateFichaTecnica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };

  //verificar se os campos estao preenchidos
  if (
    dados.designacao &&
    dados.processoLCRM &&
    dados.processoCEARC &&
    dados.dataEntrada &&
    dados.coordenacao &&
    dados.direcaoTecnica &&
    dados.localidade &&
    dados.interessadoFK
  ) {
    let resposta_bd = await bd.query(
      "update tbl_fichasRegistos set visible=?,designacao=?,processoLCRM=?,processoCEARC=?,dataEntrada =?, dataConclusao=?, dataSaida=?, coordenacao =? ,direcaoTecnica=?,localidade=?,interessadoFK =?  where fichaRegistoID = ?",
      [
        dados.visible,
        dados.designacao,
        dados.processoLCRM,
        dados.processoCEARC,
        dados.dataEntrada,
        dados.dataConclusao,
        dados.dataSaida,
        dados.coordenacao,
        dados.direcaoTecnica,
        dados.localidade,
        dados.interessadoFK,
        dados.fichaRegistoID
      ]
    );
    //conseguio inserir na base de dados
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
exports.deleteFichaTenica = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Update tbl_fichasRegistos set visible = false where fichaRegistoID=?",
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
