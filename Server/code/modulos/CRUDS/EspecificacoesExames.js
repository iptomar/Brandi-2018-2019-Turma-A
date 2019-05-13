exports.getAllEspecificacoesExames = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_especificacoesExames");
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
exports.getSingleEspecificacoesExames = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_especificacoesExames  where especificacoesExamesID   = ?",
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

exports.createEspecificacoesExames = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?,?,?,?,?),";
  }

  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula

  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (
      dados[i].tipo &&
      dados[i].localizacao &&
      dados[i].objetosEspecificos &&
      dados[i].data &&
      dados[i].resultados &&
      dados[i].entidadeTecnica &&
      dados[i].data &&
      dados[i].exameAnaliseFK
    ) {
      array2.push(dados[i].tipo);
      array2.push(dados[i].localizacao);
      array2.push(dados[i].objetosEspecificos);
      array2.push(dados[i].resultados);
      array2.push(dados[i].entidadeTecnica);
      array2.push(dados[i].data);
      array2.push(dados[i].exameAnaliseFK);
    } else {
      return resultadofinal;
    }
  }
  let resposta_bd = await bd.query(
    "Insert into tbl_especificacoesExames (tipo  ,localizacao  ,objetosEspecificos ,resultados ,entidadeTecnica ,data ,exameAnaliseFK) values " +
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

exports.updateEspecificacoesExames = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  return resultadofinal;
};

exports.deleteEspecificacoesExames = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
