/**
 * Ficheiro que representa o crud da tabela graus de eficaria na sobulizacao
 */

/**
 * get de todos os graus de eficacia
 */
exports.getallGrausEficaciSolubilizacao = async (bd, limit, pagenumber) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_grausEficaciaSolubilizacao limit ?,?",
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
 * get de um grau de eficacia
 */
exports.getSingleGrauEficaciaSolubilizacao = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_grausEficaciaSolubilizacao  where grauID = ?",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.resposta = resposta_bd.resposta[0];
    resultadofinal.stat = 0;
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
/**
 * update de um grau de eficacia
 */
exports.updateGrauEficaciaSolubilizacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos não preenchidos" };

  if (dados.id && dados.numero && dados.nome && dados.solventFK) {
    let resposta_bd = await bd.query(
      "Update tbl_grausEficaciaSolubilizacao set numero = ?, nome = ? , solventFK = ? where grauID = ? ",
      [dados.numero, dados.nome, dados.solventFK, dados.id]
    );
    if (resposta_bd.stat === 0) {
      resultadofinal.resposta = resposta_bd.resposta;
      resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
      resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
      resultadofinal.resposta = resposta_bd.resposta;
    }
  }
  return resultadofinal;
};
/**
 * Create de um grau de eficacia
 */
exports.createGrauEficaciaSolubilizacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos não preenchidos" };
  if (dados.id && dados.numero && dados.nome && dados.solventFK) {
    let resposta_bd = await bd.query(
      "Insert into tbl_grausEficaciaSolubilizacao  (numero,nome,solventFK) values (?,?,?)",
      [dados.numero, dados.nome, dados.solventFK]
    );
    if (resposta_bd.stat === 0) {
      resultadofinal.resposta = resposta_bd.resposta;
      resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
      resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
      resultadofinal.resposta = resposta_bd.resposta;
    }
  }
  return resultadofinal;
};
/**
 *
 */
exports.deleteGrauEficaciaSolubilizacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos não preenchidos" };

  return resultadofinal;
};
