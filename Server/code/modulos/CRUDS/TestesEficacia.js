exports.getAllTestesEficacia = async (bd, limit, pagenumber) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_testesEficacia limit ?,?",
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
exports.getTestesEficacia = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_testesEficacia  where testeEficaciaID  = ?",
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

exports.createTestesEficacia = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.identificacaoExtrato &&
    dados.caracteristicas &&
    dados.tecnicoResponsavel &&
    dados.data &&
    dados.especificacoesExameFK
  ) {
    let resposta_bd = await bd.query(
      "Insert into tbl_testesEficacia (identificacaoExtrato,caracteristicas,tecnicoResponsavel,data,especificacoesExammesFK) values (?,?,?,?,?)",
      [
        dados.identificacaoExtrato,
        dados.caracteristicas,
        dados.tecnicoResponsavel,
        dados.data,
        dados.especificacoesExameFK
      ]
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

exports.updateTestesEficacia = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.identificacaoExtrato &&
    dados.caracteristicas &&
    dados.tecnicoResponsavel &&
    dados.data &&
    dados.especificacoesExameFK
  ) {
    let resposta_bd = await bd.query(
      "Update tbl_testesEficacia  set identificacaoExtrato =?,caracteristicas = ?,tecnicoResponsavel =?,data =?,especificacoesExammesFK=? where testeEficaciaID = ?",
      [
        dados.identificacaoExtrato,
        dados.caracteristicas,
        dados.tecnicoResponsavel,
        dados.data,
        dados.especificacoesExameFK,
        dados.id
      ]
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

exports.deleteTestesEficacia = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};