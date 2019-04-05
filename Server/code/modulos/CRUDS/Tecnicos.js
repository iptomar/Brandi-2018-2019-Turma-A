/**
 * Ficheiro que representa o CRUD DA TABELA TBL_TECNICOS
 */

/**
 * Metodo que permite devolver todos os tecnicos da tbl_tecnicos
 */
exports.getAllTecnicos = async bd => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query("select * from tbl_tecnicos");
  resultadofinal.stat = resposta_bd.stat;
  resultadofinal.resposta = resposta_bd.resposta;
  return resultadofinal;
};

/**
 * Metodo que permite devolver 1 tecnico da tbl_tecnicos
 */

exports.getTecnico = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "select * from tbl_tecnicos where tecnicoID = ? limit 1",
    [id]
  );
  resultadofinal.stat = resposta_bd.stat;
  resultadofinal.resposta = resposta_bd.resposta;
  return resultadofinal;
};

/**
 * Metodo que permite criar umm tecnico emm tbl_tecnicos
 */

exports.createTecnico = async (bd, dados) => {
  let resultadofinal = { stat: -1, resposta: "Dados nao preenchidos" };
  if (
    dados.nome &&
    dados.habilitacoes &&
    dados.nivelProfissional &&
    dados.userFK
  ) {
    let resposta_bd = await bd.query(
      "Insert into tbl_tecnicos (nome,habilitacoes,nivelProfissional,userFK) values (?,?,?,?) ",
      [dados.nome, dados.habilitacoes, dados.nivelProfissional, dados.userFK]
    );
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};
/**
 * Metodo que permite alterar dados de um tecnico
 *
 */
exports.updateTecnico = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Dados nao preenchidos" };
  //dados preenchidos
  if (dados.nome && dados.habilitacoes && dados.nivelProfissional) {
    let resposta_bd = await bd.query(
      "Update tbl_tecnicos set nome = ? , habilitacoes = ? , nivelProfissional = ?  where tecnicoID = ?",
      [dados.nome, dados.habilitacoes, dados.nivelProfissional, dados.id]
    );
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
/**
 * Metodo que permite apagar tecnicos
 * Ainda nao concluido
 */
exports.deleteTecnico = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "Tecnico Com fichas" };
  return resultadofinal;
};
