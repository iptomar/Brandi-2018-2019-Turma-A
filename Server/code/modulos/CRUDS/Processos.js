/**
 * Método para criar processos
 * @param bd - base de dados para fazer querys
 * @param dados - dados para realizar a query
 * @return {object} stat: 1<erro> 0<sucess> resposta: resposta da base de dados
 */
exports.createProcesso = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se os campos estao preenchidos
  if (
    dados.processoLCRM &&
    dados.dataAberturaLCRM &&
    dados.dataEntradaLCRM &&
    dados.processoCEARC &&
    dados.dataAberturaCEARC &&
    dados.direcaoTecnica
  ) {
    let resposta_bd = await bd.query(
      "INSERT INTO tbl_processos (processoLCRM,dataAberturaLCRM,dataEntradaLCRM,processoCEARC,dataAberturaCEARC,dataEntradaCEARC,direcaoTecnica) VALUES(?,?,?,?,?,?,?)",
      [
        dados.processoLCRM,
        dados.dataAberturaLCRM,
        dados.dataEntradaLCRM,
        dados.processoCEARC,
        dados.dataAberturaCEARC,
        dados.dataEntradaCEARC,
        dados.direcaoTecnica
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
 * Metodo que retorna um processo
 * @param id - id do processo
 * @param bd - base de dados para querys
 */
exports.getProcesso = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_processos where processoID = ? limit 1",
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
 * Metodo para alterar um processo
 */
exports.updateProcesso = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };

  //verificar se os campos estao preenchidos
  if (
    dados.processoLCRM &&
    dados.dataAberturaLCRM &&
    dados.dataEntradaLCRM &&
    dados.processoCEARC &&
    dados.dataAberturaCEARC &&
    dados.direcaoTecnica
  ) {
    let resposta_bd = await bd.query(
      "update tbl_processos set processoLCRM = ?, dataAberturaLCRM = ?, dataEntradaLCRM = ?, processoCEARC = ?, dataAberturaCEARC = ?, dataEntradaCEARC = ?, direcaoTecnica = ?  where processoID = ?",
      [
        dados.processoLCRM,
        dados.dataAberturaLCRM,
        dados.dataEntradaLCRM,
        dados.processoCEARC,
        dados.dataAberturaCEARC,
        dados.dataEntradaCEARC,
        dados.direcaoTecnica,
        dados.processoID
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
