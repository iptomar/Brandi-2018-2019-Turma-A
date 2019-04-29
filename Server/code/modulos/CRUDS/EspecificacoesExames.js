exports.getAllEspecificacoesExames = async (bd, limit, pagenumber) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_especificacoesExames limit ?,?",
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
  if (
    dados.tipo &&
    dados.localizacao &&
    dados.objetosEspecificos &&
    dados.data &&
    dados.resultados &&
    dados.entidadeTecnica &&
    dados.data &&
    dados.exameAnaliseFK
  ) {
    let resposta_bd = await bd.query(
      "Insert into tbl_especificacoesExames (tipo  ,localizacao  ,objetosEspecificos ,resultados ,entidadeTecnica ,data ,exameAnaliseFK ) values (?,?,?,?,?,?,?)",
      [
        dados.tipo,
        dados.localizacao,
        dados.objetosEspecificos,
        dados.resultados,
        dados.entidadeTecnica,
        dados.data,
        dados.exameAnaliseFK
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

exports.updateEspecificacoesExames = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.tipo &&
    dados.localizacao &&
    dados.objetosEspecificos &&
    dados.data &&
    dados.resultados &&
    dados.entidadeTecnica &&
    dados.data &&
    dados.exameAnaliseFK &&
    dados.id
  ) {
    let resposta_bd = await bd.query(
      "Update tbl_especificacoesExames  set tipo  =?,localizacao  = ?,objetosEspecificos  =? , resultados =? , entidadeTecnica =? , data =? , exameAnaliseFK = ? where especificacoesExamesID   = ?",
      [
        dados.tipo,
        dados.localizacao,
        dados.objetosEspecificos,
        dados.resultados,
        dados.entidadeTecnica,
        dados.data,
        dados.exameAnaliseFK,
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

exports.deleteEspecificacoesExames = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
