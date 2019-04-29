exports.getAllSolvente = async (bd, limit, pagenumber) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_solventes limit ?,?", [
    limit,
    pagenumber
  ]);
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
exports.getSingleSolvente = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_solventes  where solventeID  = ?",
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

exports.createSolvente = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?),";
  }

  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].nome && dados[i].observacoes && dados[i].testeEficaciaFK) {
      array2.push(dados[i].nome);
      array2.push(dados[i].observacoes);
      array2.push(dados[i].testeEficaciaFK);
    } else {
      return resultadofinal;
    }
  }

  let resposta_bd = await bd.query(
    "Insert into tbl_solventes (nome ,observacoes ,testeEficaciaFK) values " +
      auxiliar,
    array2
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

exports.updateSolvente = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.solventeID &&
    dados.nome &&
    dados.observacoes &&
    dados.testeEficaciaFK
  ) {
    let resposta_bd = await bd.query(
      "Update tbl_solventes  set nome  =?,observacoes  = ?,testeEficaciaFK  =? where solventeID  = ?",
      [ddados.nome, dados.observacoes, dados.testeEficaciaFK, dados.id]
    );
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
      resultadofinal.resposta = resposta_bd.resposta[0];
      resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
      resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
      resultadofinal.resposta = resposta_bd.resposta;
    }
  }
  return resultadofinal;
};

exports.deleteSolvent = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
