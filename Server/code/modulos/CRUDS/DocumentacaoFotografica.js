exports.getAllDocumentacaoFotografica = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_documentacaoFotografica");
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

exports.getSingleDocumentacaoFotografica = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select from tbl_documentacaoFotografica where documentacaoFotograficaID = ?",
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

exports.createDocumentacaoFotografica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].nome && dados[i].fichaTecnicaFK) {
      array2.push(dados[i].nome);
      array2.push(dados[i].fichaTecnicaFK);
    } else {
      return resultadofinal;
    }
  }
  let resposta_bd = await bd.query(
    " Insert into tbl_documentacaoFotografica (nome,fichaTecnicaFK) values " +
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

exports.updateDocumentacaoFotografica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  return resultadofinal;
};

exports.deleteDocumentacaoFotografica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
