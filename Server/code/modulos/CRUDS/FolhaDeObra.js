exports.getAllFolhasDeObra = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_folhasDeObra where processoCEARCFK = ? ", id);
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

exports.getSingleFolhaDeObra = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_folhasDeObra where folhaDeObraID = ? ", id);
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

exports.createFolhaDeObra = async (bd, dados, id) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?,?,?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (
      dados[i].designacaoProcesso &&
      dados[i].data &&
      dados[i].designacaoProcedimento &&
      dados[i].duracao &&
      dados[i].observacoes &&
      id
    ) {
      array2.push(dados[i].designacaoProcesso);
      array2.push(dados[i].data);
      array2.push(dados[i].designacaoProcedimento);
      array2.push(dados[i].duracao);
      array2.push(dados[i].observacoes);
      array2.push(id);
    } else {
      return resultadofinal;
    }
  }
  let resposta_bd = await bd.query("Insert into tbl_folhasDeObra (designacaoProcesso, data, designacaoProcedimento, duracao, observacoes, processoCEARCFK) values" + auxiliar, array2);
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

exports.updateFolhaDeObra = async (bd, dados, id) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let resposta_bd = await bd.query("Delete from tbl_folhasDeObra where processoCEARCFK = ?", dados.id);
  if(resposta_bd.stat===1){
    resultadofinal.resposta = resposta_bd.resposta;
    return resultadofinal;
  }
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?,?,?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (
      dados[i].designacaoProcesso &&
      dados[i].data &&
      dados[i].designacaoProcedimento &&
      dados[i].duracao &&
      dados[i].observacoes &&
      id
    ) {
      array2.push(dados[i].designacaoProcesso);
      array2.push(dados[i].data);
      array2.push(dados[i].designacaoProcedimento);
      array2.push(dados[i].duracao);
      array2.push(dados[i].observacoes);
      array2.push(id);
    } else {
      return resultadofinal;
    }
  }
  resposta_bd = await bd.query("Insert into tbl_folhasDeObra (designacaoProcesso, data, designacaoProcedimento, duracao, observacoes, processoCEARCFK) values" + auxiliar, array2);
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