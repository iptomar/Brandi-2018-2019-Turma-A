exports.getAllExamesEAnalises = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_examesAnalises ");
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
exports.getSingleExamesEAnalises = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select * from tbl_examesAnalises where exameAnaliseID  = ?",
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

exports.createExamesEAnalises = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.identificacaoMateriais &&
    identificacaoIntervencoes &&
    dados.caracterzacaoEstadoConservacao &&
    dados.identificacaoPatologias &&
    dados.dataoObjecto &&
    dados.ensaioProdutos &&
    dados.interpretacaoResultados &&
    dados.conclusoes &&
    dados.fichaTecnicaFK
  ) {
    let resposta_bd = await bd.query(
      " Insert into tbl_examesAnalises (identificacaoMateriais,identificacaoIntervencoes,caracterizacaoEstadoConservacao,identificacaoPatologias,datacaoObjeto,ensaioProdutos,interpretacaoResultados,conclusoes,fichaTecnicaFK) values (?,?,?,?,?,?,?,?,?)",
      [
        dados.identificacaoMateriais,
        dados.identificacaoIntervencoes,
        dados.caracterzacaoEstadoConservacao,
        dados.identificacaoPatologias,
        dados.dataoObjecto,
        dados.ensaioProdutos,
        dados.interpretacaoResultados,
        dados.conclusoes,
        dados.fichaTecnicaFK
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

exports.updateExamesEAnalises = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };

  return resultadofinal;
};

exports.deleteExamesEAnalises = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
