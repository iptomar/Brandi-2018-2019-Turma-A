exports.getAllIluminacao = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_iluminacao");
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

exports.getSingleIluminacao = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select * from tbl_iluminacao where IluminacaoID = ?",
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

exports.createIluminacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?,?,?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (
      dados[i].radiacao &&
      dados[i].origem &&
      dados[i].valorIluminacao &&
      dados[i].valorUVmedidos &&
      dados[i].valorRealUV &&
      dados[i].condicoesAmbientaisLocalFK
    ) {
      array2.push(dados[i].radiacao);
      array2.push(dados[i].origem);
      array2.push(dados[i].valorIluminacao);
      array2.push(dados[i].valorUVmedidos);
      array2.push(dados[i].valorRealUV);
      array2.push(dados[i].condicoesAmbientaisLocalFK);
    } else {
      return resultadofinal;
    }
  }
  let resposta_bd = await bd.query(
    " Insert into tbl_iluminacao (radiacao,origem,valorIluminacao,valorUVmedidos,valorRealUV,condicoesAmbientaisLocalFK) values " +
      auxiliar,
    array2
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

exports.updateIluminacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  return resultadofinal;
};

exports.deleteIluminacao = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
